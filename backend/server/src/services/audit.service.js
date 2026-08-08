import AuditLog from '../models/AuditLog.js';
import AppError from '../utils/AppError.js';
import { paginateModel } from '../utils/paginateModel.js';

class AuditService {
  async list(queryString) {
    return paginateModel(AuditLog, queryString, {
      searchableFields: ['adminName', 'module', 'action'],
      filterWhitelist: ['action', 'module', 'admin', 'adminRole'],
      defaultSort: { createdAt: -1 },
    });
  }

  async getById(id) {
    const log = await AuditLog.findById(id);
    if (!log) throw new AppError('Audit log not found', 404);
    return log;
  }

  async recent(limit = 10) {
    return AuditLog.find({})
      .sort({ createdAt: -1 })
      .limit(Math.min(limit, 100))
      .populate('admin', 'name email role');
  }

  async summary() {
    const [total, byModule, byAction] = await Promise.all([
      AuditLog.countDocuments({}),
      AuditLog.aggregate([
        { $group: { _id: '$module', count: { $sum: 1 } } },
        { $sort: { count: -1 } },
        { $limit: 10 },
      ]),
      AuditLog.aggregate([
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
    const result = await AuditLog.deleteMany({ createdAt: { $lt: cutoff } });
    await AuditLog.create({
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
