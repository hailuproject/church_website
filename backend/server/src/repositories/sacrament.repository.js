import SacramentRequest from '../models/SacramentRequest.js';
import BaseRepository from './base.repository.js';

class SacramentRepository extends BaseRepository {
  constructor() {
    super(SacramentRequest, {
      searchableFields: ['memberName', 'phone', 'email', 'notes'],
      filterWhitelist: ['type', 'status', 'assignedPriest'],
      defaultSort: { createdAt: -1 },
    });
  }

  async paginate(queryString = {}, extraFilter = {}) {
    const result = await super.paginate(queryString, extraFilter);
    const populated = await SacramentRequest.populate(result.data, [
      { path: 'assignedPriest', select: 'name role' },
      { path: 'member', select: 'fullName amharicName phone' },
    ]);
    return { ...result, data: populated.map((doc) => (doc.toObject ? doc.toObject() : doc)) };
  }

  async findById(id, options = {}) {
    const doc = await super.findById(id, {
      ...options,
      populate: [
        { path: 'assignedPriest', select: 'name role' },
        { path: 'member', select: 'fullName amharicName phone' },
      ],
    });
    return doc;
  }

  async summaryCounts() {
    const [total, pending] = await Promise.all([
      SacramentRequest.countDocuments({}),
      SacramentRequest.countDocuments({ status: 'pending' }),
    ]);
    return { total, pending };
  }
}

export default new SacramentRepository();
