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
  async list() {
    const contents = await ChurchContent.find().sort({ key: 1 });
    const byKey = Object.fromEntries(contents.map((c) => [c.key, sanitizeContent(c)]));
    return CONTENT_KEYS.map((key) => byKey[key] || { key, data: {}, version: 0, lastUpdatedAt: null });
  }

  async getByKey(key) {
    if (!CONTENT_KEYS.includes(key)) throw new AppError('Content not found', 404);
    const content = await ChurchContent.findOne({ key });
    if (!content) {
      return { key, data: {}, version: 0, lastUpdatedAt: null };
    }
    return sanitizeContent(content);
  }

  async update(key, data, actor, reqMeta) {
    if (!CONTENT_KEYS.includes(key)) throw new AppError('Content not found', 404);

    const existing = await ChurchContent.findOne({ key });

    const updated = await ChurchContent.findOneAndUpdate(
      { key },
      {
        $set: { data, updatedBy: actor._id, lastUpdatedAt: new Date() },
        $inc: { version: 1 },
      },
      { upsert: true, setDefaultsOnInsert: true, returnDocument: 'after', runValidators: true }
    );

    await createAuditLog({
      admin: actor,
      action: existing ? 'update' : 'create',
      module: 'content',
      documentId: updated._id,
      oldData: existing ? { key: existing.key, version: existing.version } : null,
      newData: { key, version: updated.version, data },
      ...reqMeta,
    });

    return sanitizeContent(updated);
  }
}

export default new ContentService();