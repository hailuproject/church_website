import AboutContent from '../models/AboutContent.js';
import BaseRepository from './base.repository.js';

class AboutRepository extends BaseRepository {
  constructor() {
    super(AboutContent, {
      searchableFields: [],
      filterWhitelist: [],
      defaultSort: { createdAt: -1 },
    });
  }

  async getSingleton() {
    let content = await AboutContent.findOne().sort({ createdAt: -1 });
    if (!content) {
      content = await AboutContent.create({});
    }
    return content;
  }

  async updateSingleton(data) {
    let content = await AboutContent.findOne().sort({ createdAt: -1 });
    if (!content) {
      content = await AboutContent.create(data);
    } else {
      content.set(data);
      await content.save();
    }
    return content;
  }
}

export default new AboutRepository();
