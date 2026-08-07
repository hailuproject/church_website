import { Router } from 'express';
import {
  listMessages,
  getMessage,
  submitContactForm,
  markMessageRead,
  markAllMessagesRead,
  replyMessage,
  deleteMessage,
  createPrayerRequest,
  listPrayerRequests,
  getPrayerRequest,
  updatePrayerRequest,
  deletePrayerRequest,
} from '../controllers/contact.controller.js';
import { authenticate, authorize, hasPermission } from '../middlewares/auth.js';
import validate from '../middlewares/validate.js';
import { ROLES, PERMISSIONS } from '../constants/index.js';
import {
  submitContactValidation,
  replyValidation,
  listMessagesValidation,
  createPrayerRequestValidation,
  updatePrayerRequestValidation,
  listPrayersValidation,
} from '../validators/contact.validators.js';
import { objectIdValidator } from '../validators/common.validators.js';

const router = Router();

router.post('/', validate(submitContactValidation), submitContactForm);
router.post('/prayer-request', validate(createPrayerRequestValidation), createPrayerRequest);

router.use(authenticate);

router.get(
  '/inbox',
  authorize(ROLES.SUPER_ADMIN, ROLES.ADMIN, ROLES.SECRETARY),
  hasPermission(PERMISSIONS.MANAGE_CONTACT),
  validate(listMessagesValidation),
  listMessages
);

router.get(
  '/prayers',
  authorize(ROLES.SUPER_ADMIN, ROLES.ADMIN, ROLES.SECRETARY, ROLES.PRIEST),
  hasPermission(PERMISSIONS.MANAGE_CONTACT),
  validate(listPrayersValidation),
  listPrayerRequests
);

router.get(
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

router.get(
  '/prayers/:id',
  authorize(ROLES.SUPER_ADMIN, ROLES.ADMIN, ROLES.SECRETARY, ROLES.PRIEST),
  hasPermission(PERMISSIONS.MANAGE_CONTACT),
  validate([objectIdValidator('id')]),
  getPrayerRequest
);

router.patch(
  '/prayers/:id',
  authorize(ROLES.SUPER_ADMIN, ROLES.ADMIN, ROLES.SECRETARY, ROLES.PRIEST),
  hasPermission(PERMISSIONS.MANAGE_CONTACT),
  validate([objectIdValidator('id'), ...updatePrayerRequestValidation]),
  updatePrayerRequest
);

router.delete(
  '/prayers/:id',
  authorize(ROLES.SUPER_ADMIN, ROLES.ADMIN, ROLES.SECRETARY),
  hasPermission(PERMISSIONS.MANAGE_CONTACT),
  validate([objectIdValidator('id')]),
  deletePrayerRequest
);

export default router;
