import ChurchContent from '../models/ChurchContent.js';
import AppError from '../utils/AppError.js';
import { CONTENT_KEYS } from '../constants/index.js';

const sanitizeContent = (content) => {
  const doc = content.toObject ? content.toObject() : content;
  return {
    key: doc.key,
    data: doc.data || {},
    version: doc.version,
    lastUpdatedAt: doc.lastUpdatedAt,
  };
};

class ContentService {
  async getByKey(key) {
    if (!CONTENT_KEYS.includes(key)) throw new AppError('Content not found', 404);
    const content = await ChurchContent.findOne({ key });
    if (!content) {
      return { key, data: {}, version: 0, lastUpdatedAt: null };
    }
    return sanitizeContent(content);
  }
}

export default new ContentService();
