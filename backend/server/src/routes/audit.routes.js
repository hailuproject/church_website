import { Router } from 'express';
import {
  listAuditLogs,
  getAuditLog,
  getRecentAuditLogs,
  getAuditSummary,
  clearOldAuditLogs,
} from '../controllers/audit.controller.js';
import { authenticate, authorize, hasPermission } from '../middlewares/auth.js';
import validate from '../middlewares/validate.js';
import { ROLES, PERMISSIONS } from '../constants/index.js';
import { listAuditValidation } from '../validators/audit.validators.js';
import { objectIdValidator } from '../validators/common.validators.js';

const router = Router();

router.use(authenticate, authorize(ROLES.SUPER_ADMIN, ROLES.ADMIN));

router.get(
  '/',
  hasPermission(PERMISSIONS.VIEW_AUDIT_LOGS),
  validate(listAuditValidation),
  listAuditLogs
);
router.get(
  '/recent',
  hasPermission(PERMISSIONS.VIEW_AUDIT_LOGS),
  getRecentAuditLogs
);
router.get(
  '/summary',
  hasPermission(PERMISSIONS.VIEW_AUDIT_LOGS),
  getAuditSummary
);
router.get(
  '/:id',
  hasPermission(PERMISSIONS.VIEW_AUDIT_LOGS),
  validate([objectIdValidator('id')]),
  getAuditLog
);
router.delete(
  '/clear',
  authorize(ROLES.SUPER_ADMIN),
  clearOldAuditLogs
);

export default router;
