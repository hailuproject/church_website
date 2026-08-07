import auditRepository from '../repositories/audit.repository.js';
import AppError from '../utils/AppError.js';

class AuditService {
  async list(queryString) {
    return auditRepository.paginate(queryString);
  }

  async getById(id) {
    return auditRepository.findById(id);
  }

  async recent(limit = 10) {
    return auditRepository.recent(Math.min(limit, 100));
  }

  async summary() {
    const [total, byModule, byAction] = await Promise.all([
      auditRepository.count({}),
      auditRepository.aggregate([
        { $group: { _id: '$module', count: { $sum: 1 } } },
        { $sort: { count: -1 } },
        { $limit: 10 },
      ]),
      auditRepository.aggregate([
        { $group: { _id: '$action', count: { $sum: 1 } } },
        { $sort: { count: -1 } },
      ]),
    ]);

    return {
      total,
      byModule: byModule.map((item) => ({ module: item._id, count: item.count })),
      byAction: byAction.map((item) => ({ action: item._id, count: item.count })),
    };
  }

  async clearOlderThan(days, actor, reqMeta) {
    const cutoff = new Date();
    cutoff.setDate(cutoff.getDate() - days);
    const result = await auditRepository.model.deleteMany({ createdAt: { $lt: cutoff } });
    await auditRepository.create({
      admin: actor?._id || null,
      action: 'delete',
      module: 'audit-logs',
      newData: { event: 'cleared_logs', days, removed: result.deletedCount },
      ipAddress: reqMeta?.ipAddress,
      userAgent: reqMeta?.userAgent,
    });
    return result.deletedCount;
  }
}

export default new AuditService();
