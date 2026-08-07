import Translation from '../models/Translation.js';
import BaseRepository from './base.repository.js';

class LanguageRepository extends BaseRepository {
  constructor() {
    super(Translation, {
      searchableFields: ['key', 'english', 'amharic'],
      filterWhitelist: ['section'],
      defaultSort: { section: 1, key: 1 },
    });
  }

  async findByKey(key) {
    return Translation.findOne({ key });
  }

  async bulkUpsert(items, updatedBy) {
    const ops = items
      .filter((item) => item && item.key)
      .map((item) => ({
        updateOne: {
          filter: { key: item.key },
          update: {
            $set: {
              key: item.key,
              english: item.english || '',
              amharic: item.amharic || '',
              section: item.section || 'general',
              description: item.description || '',
              updatedBy,
            },
          },
          upsert: true,
        },
      }));
    if (!ops.length) return { result: { nModified: 0 } };
    return Translation.bulkWrite(ops);
  }

  async publicTranslations(language) {
    const docs = await Translation.find({}).lean();
    return docs.map((doc) => ({
      key: doc.key,
      value: language === 'amharic' ? doc.amharic : doc.english,
    }));
  }
}

export default new LanguageRepository();
