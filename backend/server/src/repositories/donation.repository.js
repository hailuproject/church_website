import Donation from '../models/Donation.js';
import BaseRepository from './base.repository.js';
import { parsePagination, buildPaginationMeta } from '../utils/pagination.js';

class DonationRepository extends BaseRepository {
  constructor() {
    super(Donation, {
      searchableFields: ['donorName', 'email', 'phone', 'campaign', 'transactionId', 'receiptNumber'],
      filterWhitelist: ['status', 'paymentMethod', 'campaign'],
      defaultSort: { createdAt: -1 },
    });
  }

  async summaryCounts() {
    const [count, completed, totalAmount, monthAmount, yearAmount] = await Promise.all([
      Donation.countDocuments({}),
      Donation.countDocuments({ status: 'completed' }),
      Donation.aggregate([
        { $match: { status: 'completed' } },
        { $group: { _id: null, total: { $sum: '$amount' } } },
      ]),
      Donation.aggregate([
        {
          $match: {
            status: 'completed',
            createdAt: { $gte: new Date(new Date().getFullYear(), new Date().getMonth(), 1) },
          },
        },
        { $group: { _id: null, total: { $sum: '$amount' } } },
      ]),
      Donation.aggregate([
        {
          $match: {
            status: 'completed',
            createdAt: { $gte: new Date(new Date().getFullYear(), 0, 1) },
          },
        },
        { $group: { _id: null, total: { $sum: '$amount' } } },
      ]),
    ]);

    return {
      count,
      completed,
      totalAmount: totalAmount[0]?.total || 0,
      monthlyDonations: monthAmount[0]?.total || 0,
      annualDonations: yearAmount[0]?.total || 0,
    };
  }

  async monthlySeries(year) {
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

  async findByReceiptNumber(receiptNumber) {
    return Donation.findOne({ receiptNumber });
  }

  async paymentHistory(email, queryString = {}) {
    const { page, limit, skip } = parsePagination(queryString);
    const filter = { email: email.toLowerCase() };
    const data = await Donation.find(filter).sort({ createdAt: -1 }).skip(skip).limit(limit);
    const total = await Donation.countDocuments(filter);
    return { data, pagination: buildPaginationMeta({ total, page, limit }) };
  }
}

export default new DonationRepository();
