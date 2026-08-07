import Announcement from '../models/Announcement.js';
import BaseRepository from './base.repository.js';

class AnnouncementRepository extends BaseRepository {
  constructor() {
    super(Announcement, {
      searchableFields: ['title', 'titleAm', 'description', 'descriptionAm'],
      filterWhitelist: ['priority', 'isPublished', 'createdBy'],
      defaultSort: { createdAt: -1 },
    });
  }

  async findActive() {
    const now = new Date();
    return Announcement.find({
      isPublished: true,
      startDate: { $lte: now },
      $or: [{ endDate: null }, { endDate: { $gte: now } }],
    })
      .sort({ priority: -1, createdAt: -1 })
      .limit(10);
  }
}

export default new AnnouncementRepository();
