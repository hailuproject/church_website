import AuditLog from '../models/AuditLog.js';
import { logger } from '../utils/logger.js';

export const createAuditLog = async ({
  admin,
  action,
  module,
  documentId = null,
  oldData = null,
  newData = null,
  ipAddress = null,
  userAgent = null,
}) => {
  try {
    await AuditLog.create({
      admin: admin?._id || admin || null,
      adminName: admin?.name || '',
      adminRole: admin?.role || '',
      action,
      module,
      documentId,
      oldData,
      newData,
      ipAddress,
      userAgent,
    });
  } catch (error) {
    logger.error(`Audit log creation failed: ${error.message}`);
  }
};

export const audit = (module, action) => {
  return async (req, res, next) => {
    req.audit = {
      module,
      action: action || null,
      admin: req.admin,
      ipAddress: req.ip,
      userAgent: req.get('user-agent'),
    };
    res.on('finish', () => {
      const logEntry = req.audit;
      if (logEntry.action) {
        createAuditLog({
          admin: logEntry.admin,
          action: logEntry.action,
          module: logEntry.module,
          documentId: logEntry.documentId,
          oldData: logEntry.oldData,
          newData: logEntry.newData,
          ipAddress: logEntry.ipAddress,
          userAgent: logEntry.userAgent,
        });
      }
    });
    next();
  };
};

export default { createAuditLog, audit };
