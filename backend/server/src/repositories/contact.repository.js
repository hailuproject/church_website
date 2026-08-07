import ContactMessage from '../models/ContactMessage.js';
import PrayerRequest from '../models/PrayerRequest.js';
import BaseRepository from './base.repository.js';

class ContactRepository extends BaseRepository {
  constructor() {
    super(ContactMessage, {
      searchableFields: ['name', 'email', 'subject', 'message'],
      filterWhitelist: ['category', 'status', 'isRead'],
      defaultSort: { createdAt: -1 },
    });
  }

  async markRead(id) {
    return ContactMessage.findByIdAndUpdate(id, { isRead: true }, { returnDocument: 'after' });
  }

  async markAllRead() {
    return ContactMessage.updateMany({ isRead: false }, { isRead: true });
  }

  async reply(id, replyBody, email, repliedAt = new Date()) {
    return ContactMessage.findByIdAndUpdate(
      id,
      { reply: replyBody, replied: true, repliedAt, status: 'replied', isRead: true, email },
      { returnDocument: 'after' }
    );
  }

  async createPrayerRequest(data) {
    return PrayerRequest.create(data);
  }
}

class PrayerRequestRepository extends BaseRepository {
  constructor() {
    super(PrayerRequest, {
      searchableFields: ['name', 'email', 'phone', 'request'],
      filterWhitelist: ['status', 'prayerType'],
      defaultSort: { createdAt: -1 },
    });
  }
}

export const prayerRequestRepository = new PrayerRequestRepository();
export default new ContactRepository();
