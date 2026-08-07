import { Router } from 'express';
import {
  listAnnouncements,
  getAnnouncement,
  getActiveAnnouncements,
  createAnnouncement,
  updateAnnouncement,
  deleteAnnouncement,
  toggleAnnouncementPublish,
} from '../controllers/announcement.controller.js';
import { authenticate, authorize, hasPermission } from '../middlewares/auth.js';
import validate from '../middlewares/validate.js';
import { ROLES, PERMISSIONS } from '../constants/index.js';
import {
  createAnnouncementValidation,
  updateAnnouncementValidation,
  listAnnouncementsValidation,
  togglePublishValidation,
} from '../validators/announcement.validators.js';
import { objectIdValidator } from '../validators/common.validators.js';

const router = Router();

router.get('/', validate(listAnnouncementsValidation), listAnnouncements);
router.get('/active', getActiveAnnouncements);
router.get('/:id', validate([objectIdValidator('id')]), getAnnouncement);

router.use(authenticate);

router.post(
  '/',
  authorize(ROLES.SUPER_ADMIN, ROLES.ADMIN, ROLES.PRIEST),
  hasPermission(PERMISSIONS.MANAGE_ANNOUNCEMENTS),
  validate(createAnnouncementValidation),
  createAnnouncement
);

router.patch(
  '/:id',
  authorize(ROLES.SUPER_ADMIN, ROLES.ADMIN, ROLES.PRIEST),
  hasPermission(PERMISSIONS.MANAGE_ANNOUNCEMENTS),
  validate([objectIdValidator('id'), ...updateAnnouncementValidation]),
  updateAnnouncement
);

router.patch(
  '/:id/publish',
  authorize(ROLES.SUPER_ADMIN, ROLES.ADMIN, ROLES.PRIEST),
  hasPermission(PERMISSIONS.MANAGE_ANNOUNCEMENTS),
  validate([objectIdValidator('id'), ...togglePublishValidation]),
  toggleAnnouncementPublish
);

router.delete(
  '/:id',
  authorize(ROLES.SUPER_ADMIN, ROLES.ADMIN, ROLES.PRIEST),
  hasPermission(PERMISSIONS.MANAGE_ANNOUNCEMENTS),
  validate([objectIdValidator('id')]),
  deleteAnnouncement
);

export default router;
