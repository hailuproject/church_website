import languageRepository from '../repositories/language.repository.js';
import AppError from '../utils/AppError.js';
import { createAuditLog } from '../helpers/auditLogger.js';

class LanguageService {
  async list(queryString) {
    return languageRepository.paginate(queryString);
  }

  async getById(id) {
    return languageRepository.findById(id);
  }

  async getByKey(key) {
    const translation = await languageRepository.findByKey(key);
    if (!translation) throw new AppError('Translation not found', 404);
    return translation;
  }

  async upsert(data, actor, reqMeta) {
    const existing = await languageRepository.findByKey(data.key);
    const payload = {
      key: data.key,
      english: data.english || '',
      amharic: data.amharic || '',
      section: data.section || 'general',
      description: data.description || '',
    };

    let translation;
    if (existing) {
      translation = await languageRepository.findByIdAndUpdate(existing._id, payload);
    } else {
      translation = await languageRepository.create(payload);
    }

    await createAuditLog({
      admin: actor,
      action: 'update',
      module: 'languages',
      documentId: translation._id,
      oldData: existing ? { key: existing.key } : null,
      newData: { key: translation.key },
      ...reqMeta,
    });

    return translation;
  }

  async bulkUpsert(items, actor, reqMeta) {
    if (!items || !Array.isArray(items) || !items.length) {
      throw new AppError('items must be a non-empty array', 400);
    }
    const result = await languageRepository.bulkUpsert(items, actor._id);

    await createAuditLog({
      admin: actor,
      action: 'update',
      module: 'languages',
      newData: { event: 'bulk_upsert', modified: result.result?.nModified || 0 },
      ...reqMeta,
    });

    return result;
  }

  async remove(id, actor, reqMeta) {
    const existing = await languageRepository.findByIdOrNull(id);
    if (!existing) throw new AppError('Translation not found', 404);

    await languageRepository.deleteById(id);

    await createAuditLog({
      admin: actor,
      action: 'delete',
      module: 'languages',
      documentId: id,
      oldData: { key: existing.key },
      ...reqMeta,
    });

    return true;
  }

  async publicTranslations(language = 'english') {
    return languageRepository.publicTranslations(language);
  }

  async sections() {
    const sections = await languageRepository.aggregate([
      { $group: { _id: '$section', count: { $sum: 1 } } },
      { $sort: { _id: 1 } },
    ]);
    return sections.map((s) => ({ section: s._id, count: s.count }));
  }
}

export default new LanguageService();
