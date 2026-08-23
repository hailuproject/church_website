import Donation from '../models/Donation.js';
import AppError from '../utils/AppError.js';
import { paginateModel } from '../utils/paginateModel.js';
import { parsePagination, buildPaginationMeta } from '../utils/pagination.js';
import { generateReferenceNumber } from '../utils/tokens.js';
import { sendEmail } from '../utils/email.js';
import { createAuditLog } from '../helpers/auditLogger.js';
import { toCSV } from '../utils/csv.js';
import { DONATION_STATUSES, DONATION_PAYMENT_METHODS, DONATION_CURRENCIES } from '../constants/index.js';
import { createPaymentIntent } from './stripe.service.js';
import config from '../config/index.js';

class DonationService {
  async list(queryString) {
    return paginateModel(Donation, queryString, {
      searchableFields: ['donorName', 'email', 'phone', 'campaign', 'transactionId', 'receiptNumber'],
      filterWhitelist: ['status', 'paymentMethod', 'campaign'],
      defaultSort: { createdAt: -1 },
    });
  }

  async getById(id) {
    const donation = await Donation.findById(id);
    if (!donation) throw new AppError('Donation not found', 404);
    return donation;
  }

  async create(data, reqMeta) {
    if (!DONATION_PAYMENT_METHODS.includes(data.paymentMethod)) {
      throw new AppError(`paymentMethod must be one of: ${DONATION_PAYMENT_METHODS.join(', ')}`, 400);
    }

    const receiptNumber = generateReferenceNumber('RCPT');
    const status = data.paymentMethod === 'cash' ? 'completed' : 'pending';

    const donation = await Donation.create({
      ...data,
      receiptNumber,
      status,
    });

    await createAuditLog({
      admin: reqMeta?.actorId || null,
      action: 'create',
      module: 'donations',
      documentId: donation._id,
      newData: { amount: donation.amount, paymentMethod: donation.paymentMethod, receiptNumber },
      ipAddress: reqMeta?.ipAddress,
      userAgent: reqMeta?.userAgent,
    });

    return { donation, paymentIntent: null };
  }

  async createStripeDonation(data) {
    if (!config.stripe.secretKey) {
      throw new AppError('Online payments are not available right now. Please contact the church office.', 503);
    }

    const amount = Number(data.amount);
    if (!amount || amount <= 0) throw new AppError('amount must be greater than 0', 400);

    const currency = (data.currency || 'USD').toUpperCase();
    if (!DONATION_CURRENCIES.includes(currency)) {
      throw new AppError(`currency must be one of: ${DONATION_CURRENCIES.join(', ')}`, 400);
    }

    const donation = await Donation.create({
      donorName: data.donorName || '',
      email: (data.email || '').toLowerCase(),
      phone: data.phone || '',
      amount,
      currency,
      campaign: data.campaign || '',
      paymentMethod: 'card',
      status: 'pending',
      receiptNumber: generateReferenceNumber('RCPT'),
      isAnonymous: Boolean(data.isAnonymous),
    });

    const paymentIntent = await createPaymentIntent({
      amount,
      currency: currency.toLowerCase(),
      receiptEmail: data.email,
      metadata: { donationId: String(donation._id), campaign: donation.campaign || '' },
    });

    await Donation.findByIdAndUpdate(donation._id, { transactionId: paymentIntent.id });

    return {
      clientSecret: paymentIntent.client_secret,
      publishableKey: config.stripe.publishableKey,
      donationId: donation._id,
      amount: donation.amount,
      currency: donation.currency,
    };
  }

  async handleStripeWebhook(event) {
    if (event.type === 'payment_intent.succeeded') {
      await this.completeStripeDonation(event.data.object);
    } else if (event.type === 'payment_intent.payment_failed') {
      await Donation.findOneAndUpdate({ transactionId: event.data.object.id }, { status: 'failed' });
    }
    return true;
  }

  async completeStripeDonation(paymentIntent) {
    const transactionId = paymentIntent.id;
    let donation = await Donation.findOne({ transactionId });

    if (!donation && paymentIntent.metadata?.donationId) {
      await Donation.findByIdAndUpdate(paymentIntent.metadata.donationId, {
        transactionId,
        status: 'completed',
      });
      donation = await Donation.findById(paymentIntent.metadata.donationId);
    }

    if (!donation) return null;
    if (donation.status === 'completed') return donation;

    donation = await Donation.findByIdAndUpdate(donation._id, { status: 'completed' }, { returnDocument: 'after' });
    await this.sendReceipt(donation);
    return donation;
  }

  async update(id, data, actor, reqMeta) {
    const existing = await Donation.findById(id);
    if (!existing) throw new AppError('Donation not found', 404);

    const updated = await Donation.findByIdAndUpdate(id, data, {
      returnDocument: 'after',
      runValidators: true,
    });

    await createAuditLog({
      admin: actor,
      action: 'update',
      module: 'donations',
      documentId: id,
      oldData: { status: existing.status, amount: existing.amount },
      newData: { status: updated.status, amount: updated.amount },
      ...reqMeta,
    });

    return updated;
  }

  async confirmPayment(id, actor, reqMeta) {
    const existing = await Donation.findById(id);
    if (!existing) throw new AppError('Donation not found', 404);

    const updated = await Donation.findByIdAndUpdate(id, { status: 'completed' }, { returnDocument: 'after' });
    await this.sendReceipt(updated);

    await createAuditLog({
      admin: actor,
      action: 'update',
      module: 'donations',
      documentId: id,
      oldData: { status: 'pending' },
      newData: { status: 'completed' },
      ...reqMeta,
    });

    return updated;
  }

  async changeStatus(id, status, actor, reqMeta) {
    if (!DONATION_STATUSES.includes(status)) throw new AppError(`status must be one of: ${DONATION_STATUSES.join(', ')}`, 400);
    const existing = await Donation.findById(id);
    if (!existing) throw new AppError('Donation not found', 404);

    const updated = await Donation.findByIdAndUpdate(id, { status }, { returnDocument: 'after' });
    if (status === 'completed') await this.sendReceipt(updated);

    await createAuditLog({
      admin: actor,
      action: 'status-change',
      module: 'donations',
      documentId: id,
      oldData: { status: existing.status },
      newData: { status },
      ...reqMeta,
    });

    return updated;
  }

  async sendReceipt(donation, { force = false } = {}) {
    if (!donation.email || (!force && donation.receiptSent)) return null;
    const sent = await sendEmail({
      to: donation.email,
      subject: `Donation receipt ${donation.receiptNumber}`,
      template: 'donationReceipt',
      data: {
        name: donation.donorName || 'Beloved',
        amount: donation.amount,
        currency: donation.currency,
        reference: donation.receiptNumber,
        date: new Date(donation.updatedAt || Date.now()).toLocaleDateString(),
      },
    });
    if (sent) {
      await Donation.findByIdAndUpdate(donation._id, { receiptSent: true });
    }
    return sent;
  }

  async getReceipt(id) {
    const donation = await this.getById(id);
    return {
      receiptNumber: donation.receiptNumber,
      donorName: donation.donorName,
      email: donation.email,
      amount: donation.amount,
      currency: donation.currency,
      campaign: donation.campaign,
      paymentMethod: donation.paymentMethod,
      status: donation.status,
      date: donation.createdAt,
    };
  }

  async paymentHistory(email, queryString) {
    const { page, limit, skip } = parsePagination(queryString);
    const filter = { email: email.toLowerCase() };
    const data = await Donation.find(filter).sort({ createdAt: -1 }).skip(skip).limit(limit);
    const total = await Donation.countDocuments(filter);
    return { data, pagination: buildPaginationMeta({ total, page, limit }) };
  }

  async monthlyDonations(year) {
    return Donation.aggregate([
      {
        $match: {
          status: 'completed',
          createdAt: { $gte: new Date(year, 0, 1), $lt: new Date(year + 1, 0, 1) },
        },
      },
      {
        $group: {
          _id: { $month: '$createdAt' },
          total: { $sum: '$amount' },
          count: { $sum: 1 },
        },
      },
      { $sort: { _id: 1 } },
    ]);
  }

  async exportCSV(queryString) {
    const { data } = await this.list({ ...queryString, limit: 1000 });
    const rows = data.map((d) => ({
      receiptNumber: d.receiptNumber,
      donorName: d.donorName,
      email: d.email,
      phone: d.phone,
      amount: d.amount,
      currency: d.currency,
      campaign: d.campaign,
      paymentMethod: d.paymentMethod,
      status: d.status,
      createdAt: d.createdAt?.toISOString(),
    }));
    return toCSV(rows);
  }
}

export default new DonationService();
