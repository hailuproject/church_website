import Sermon from '../models/Sermon.js';
import BaseRepository from './base.repository.js';
import { parsePagination, buildPaginationMeta } from '../utils/pagination.js';

class SermonRepository extends BaseRepository {
  constructor() {
    super(Sermon, {
      searchableFields: ['title', 'titleAm', 'description', 'descriptionAm', 'speaker'],
      filterWhitelist: ['category', 'language', 'isPublished', 'isFeatured', 'speaker'],
      defaultSort: { publishedAt: -1 },
    });
  }

  async paginateWithFeatures(queryString, extraFilter = {}) {
    return super.paginate(queryString, extraFilter);
  }

  async incrementDownloadCount(id) {
    return Sermon.findByIdAndUpdate(id, { $inc: { downloadCount: 1 } }, { returnDocument: 'after' });
  }

  async featured(limit = 4) {
    return Sermon.find({ isPublished: true, isFeatured: true })
      .sort({ publishedAt: -1 })
      .limit(limit);
  }

  async recent(limit = 4) {
    return Sermon.find({ isPublished: true })
      .sort({ publishedAt: -1 })
      .limit(limit);
  }

  async categories() {
    return Sermon.aggregate([
      { $group: { _id: '$category', count: { $sum: 1 } } },
      { $sort: { count: -1 } },
    ]);
  }

  async summaryCounts() {
    const [total, published] = await Promise.all([
      Sermon.countDocuments({}),
      Sermon.countDocuments({ isPublished: true }),
    ]);
    return { total, published };
  }

  async listPublished(queryString) {
    const { page, limit, skip } = parsePagination(queryString);
    const filter = { isPublished: true };
    const data = await Sermon.find(filter)
      .sort({ publishedAt: -1 })
      .skip(skip)
      .limit(limit);
    const total = await Sermon.countDocuments(filter);
    return { data, pagination: buildPaginationMeta({ total, page, limit }) };
  }
}

export default new SermonRepository();
