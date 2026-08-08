import ChurchContent from '../models/ChurchContent.js';
import AppError from '../utils/AppError.js';
import { CONTENT_KEYS } from '../constants/index.js';
import { createAuditLog } from '../helpers/auditLogger.js';

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

  async getAll() {
    const contents = await ChurchContent.find({ key: { $in: CONTENT_KEYS } }).sort({ key: 1 });
    const byKey = new Map(contents.map((c) => [c.key, c]));
    return CONTENT_KEYS.map((key) => {
      const content = byKey.get(key);
      return content ? sanitizeContent(content) : { key, data: {}, version: 0, lastUpdatedAt: null };
    });
  }

  async update(key, data, actor, reqMeta) {
    if (!CONTENT_KEYS.includes(key)) throw new AppError('Invalid content key', 400);

    let content = await ChurchContent.findOne({ key });
    if (!content) {
      content = new ChurchContent({ key, data: {}, version: 0 });
    }

    content.data = data;
    content.version = content.version + 1;
    content.updatedBy = actor._id;
    content.lastUpdatedAt = new Date();
    await content.save();

    await createAuditLog({
      admin: actor,
      action: 'update',
      module: 'content',
      documentId: content._id,
      oldData: { key },
      newData: { key, version: content.version },
      ...reqMeta,
    });

    return sanitizeContent(content);
  }
}

export default new ContentService();
