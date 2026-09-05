import { Router } from 'express';
import {
  listMessages,
  getMessage,
  submitContactForm,
  markMessageRead,
  markAllMessagesRead,
  replyMessage,
  deleteMessage,
} from '../controllers/contact.controller.js';
import { authenticate, authorize, hasPermission } from '../middlewares/auth.js';
import validate from '../middlewares/validate.js';
import { ROLES, PERMISSIONS } from '../constants/index.js';
import {
  submitContactValidation,
  replyValidation,
  listMessagesValidation,
} from '../validators/contact.validators.js';
import { objectIdValidator } from '../validators/common.validators.js';
import { contactLimiter } from '../middlewares/rateLimiter.js';

const router = Router();

router.post('/', contactLimiter, validate(submitContactValidation), submitContactForm);

router.use(authenticate);

router.get(
  '/inbox',
  authorize(ROLES.SUPER_ADMIN, ROLES.ADMIN, ROLES.SECRETARY),
  hasPermission(PERMISSIONS.MANAGE_CONTACT),
  validate(listMessagesValidation),
  listMessages
);

router.patch(
  '/inbox/read-all',
  authorize(ROLES.SUPER_ADMIN, ROLES.ADMIN, ROLES.SECRETARY),
  hasPermission(PERMISSIONS.MANAGE_CONTACT),
  markAllMessagesRead
);

router.get(
  '/inbox/:id',
  authorize(ROLES.SUPER_ADMIN, ROLES.ADMIN, ROLES.SECRETARY),
  hasPermission(PERMISSIONS.MANAGE_CONTACT),
  validate([objectIdValidator('id')]),
  getMessage
);

router.patch(
  '/inbox/:id/read',
  authorize(ROLES.SUPER_ADMIN, ROLES.ADMIN, ROLES.SECRETARY),
  hasPermission(PERMISSIONS.MANAGE_CONTACT),
  validate([objectIdValidator('id')]),
  markMessageRead
);

router.post(
  '/inbox/:id/reply',
  authorize(ROLES.SUPER_ADMIN, ROLES.ADMIN, ROLES.SECRETARY),
  hasPermission(PERMISSIONS.MANAGE_CONTACT),
  validate([objectIdValidator('id'), ...replyValidation]),
  replyMessage
);

router.delete(
  '/inbox/:id',
  authorize(ROLES.SUPER_ADMIN, ROLES.ADMIN, ROLES.SECRETARY),
  hasPermission(PERMISSIONS.MANAGE_CONTACT),
  validate([objectIdValidator('id')]),
  deleteMessage
);

export default router;
