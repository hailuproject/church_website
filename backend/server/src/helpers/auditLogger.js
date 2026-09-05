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

export default { createAuditLog };