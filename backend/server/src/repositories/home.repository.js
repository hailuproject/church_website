import HomeContent from '../models/HomeContent.js';
import BaseRepository from './base.repository.js';

class HomeRepository extends BaseRepository {
  constructor() {
    super(HomeContent, {
      searchableFields: [],
      filterWhitelist: [],
      defaultSort: { createdAt: -1 },
    });
  }

  async getSingleton() {
    let content = await HomeContent.findOne().sort({ createdAt: -1 });
    if (!content) {
      content = await HomeContent.create({});
    }
    return content;
  }

  async updateSingleton(data) {
    let content = await HomeContent.findOne().sort({ createdAt: -1 });
    if (!content) {
      content = await HomeContent.create(data);
    } else {
      content.set(data);
      await content.save();
    }
    return content;
  }
}

export default new HomeRepository();
