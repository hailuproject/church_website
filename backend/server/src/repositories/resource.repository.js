import Resource from '../models/Resource.js';
import BaseRepository from './base.repository.js';

class ResourceRepository extends BaseRepository {
  constructor() {
    super(Resource, {
      searchableFields: ['title', 'titleAm', 'description', 'descriptionAm'],
      filterWhitelist: ['category', 'language', 'isPublished', 'createdBy'],
      defaultSort: { createdAt: -1 },
    });
  }

  async incrementDownloads(id) {
    return Resource.findByIdAndUpdate(id, { $inc: { downloads: 1 } }, { returnDocument: 'after' });
  }

  async categories() {
    return Resource.aggregate([
      { $group: { _id: '$category', count: { $sum: 1 } } },
      { $sort: { count: -1 } },
    ]);
  }

  async totalDownloads() {
    const result = await Resource.aggregate([
      { $group: { _id: null, downloads: { $sum: '$downloads' } } },
    ]);
    return result[0]?.downloads || 0;
  }
}

export default new ResourceRepository();
