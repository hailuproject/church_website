import donationRepository from '../repositories/donation.repository.js';
import AppError from '../utils/AppError.js';
import { generateReferenceNumber } from '../utils/tokens.js';
import { sendEmail } from '../utils/email.js';
import { createAuditLog } from '../helpers/auditLogger.js';
import { toCSV } from '../utils/csv.js';
import config from '../config/index.js';
import { DONATION_STATUSES, DONATION_PAYMENT_METHODS } from '../constants/index.js';
import Stripe from 'stripe';

let stripe = null;
const getStripe = () => {
  if (!stripe && config.stripe.secretKey) {
    stripe = new Stripe(config.stripe.secretKey);
  }
  return stripe;
};

const isStripeMethod = (method) => method === 'stripe';

class DonationService {
  async list(queryString) {
    return donationRepository.paginate(queryString);
  }

  async getById(id) {
    return donationRepository.findById(id);
  }

  async create(data, reqMeta) {
    if (!DONATION_PAYMENT_METHODS.includes(data.paymentMethod)) {
      throw new AppError(`paymentMethod must be one of: ${DONATION_PAYMENT_METHODS.join(', ')}`, 400);
    }

    const receiptNumber = generateReferenceNumber('RCPT');
    let status = data.paymentMethod === 'cash' ? 'completed' : 'pending';

    let donation = await donationRepository.create({
      ...data,
      receiptNumber,
      status,
    });

    let paymentIntent = null;
    if (isStripeMethod(data.paymentMethod)) {
      const stripeClient = getStripe();
      if (!stripeClient) throw new AppError('Stripe is not configured', 503);
      try {
        paymentIntent = await stripeClient.paymentIntents.create({
          amount: Math.round(data.amount * 100),
          currency: data.currency?.toLowerCase() || 'etb',
          metadata: { donationId: donation._id.toString(), receiptNumber },
          automatic_payment_methods: { enabled: true },
        });
        donation = await donationRepository.findByIdAndUpdate(donation._id, {
          transactionId: paymentIntent.id,
        });
      } catch (error) {
        throw new AppError(`Stripe payment setup failed: ${error.message}`, 502);
      }
    }

    await createAuditLog({
      admin: reqMeta?.actorId || null,
      action: 'create',
      module: 'donations',
      documentId: donation._id,
      newData: { amount: donation.amount, paymentMethod: donation.paymentMethod, receiptNumber },
      ipAddress: reqMeta?.ipAddress,
      userAgent: reqMeta?.userAgent,
    });

    return {
      donation,
      paymentIntent: paymentIntent ? { clientSecret: paymentIntent.client_secret } : null,
    };
  }

  async update(id, data, actor, reqMeta) {
    const existing = await donationRepository.findByIdOrNull(id);
    if (!existing) throw new AppError('Donation not found', 404);

    const updated = await donationRepository.findByIdAndUpdate(id, data);

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
    const existing = await donationRepository.findByIdOrNull(id);
    if (!existing) throw new AppError('Donation not found', 404);

    const updated = await donationRepository.findByIdAndUpdate(id, { status: 'completed' });
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
    const existing = await donationRepository.findByIdOrNull(id);
    if (!existing) throw new AppError('Donation not found', 404);

    const updated = await donationRepository.findByIdAndUpdate(id, { status });
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

  async sendReceipt(donation) {
    if (!donation.email || donation.receiptSent) return null;
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
      await donationRepository.findByIdAndUpdate(donation._id, { receiptSent: true });
    }
    return sent;
  }

  async getReceipt(id) {
    const donation = await donationRepository.findById(id);
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
    return donationRepository.paymentHistory(email, queryString);
  }

  async monthlyDonations(year) {
    return donationRepository.monthlySeries(year || new Date().getFullYear());
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

  async handleStripeWebhook(payload, signature) {
    const stripeClient = getStripe();
    if (!stripeClient) throw new AppError('Stripe is not configured', 503);

    let event;
    try {
      event = stripeClient.webhooks.constructEvent(payload, signature, config.stripe.webhookSecret);
    } catch (error) {
      throw new AppError(`Webhook signature verification failed: ${error.message}`, 400);
    }

    if (event.type === 'payment_intent.succeeded') {
      const intent = event.data.object;
      const donationId = intent.metadata?.donationId;
      if (donationId) {
        const updated = await donationRepository.findByIdAndUpdate(donationId, { status: 'completed' });
        await this.sendReceipt(updated);
      }
    }
    return event.type;
  }
}

export default new DonationService();
