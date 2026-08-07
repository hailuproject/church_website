import Leadership from '../models/Leadership.js';
import BaseRepository from './base.repository.js';

class LeadershipRepository extends BaseRepository {
  constructor() {
    super(Leadership, {
      searchableFields: ['name', 'nameAm', 'title', 'titleAm', 'bio', 'bioAm'],
      filterWhitelist: ['role', 'isActive'],
      defaultSort: { order: 1, createdAt: -1 },
    });
  }
}

export default new LeadershipRepository();
