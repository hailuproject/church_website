import AuditLog from '../models/AuditLog.js';
import BaseRepository from './base.repository.js';

class AuditRepository extends BaseRepository {
  constructor() {
    super(AuditLog, {
      searchableFields: ['adminName', 'module', 'action'],
      filterWhitelist: ['action', 'module', 'admin', 'adminRole'],
      defaultSort: { createdAt: -1 },
    });
  }

  async recent(limit = 10) {
    return AuditLog.find({})
      .sort({ createdAt: -1 })
      .limit(limit)
      .populate('admin', 'name email role');
  }
}

export default new AuditRepository();
