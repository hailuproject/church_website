import { Router } from 'express';
import {
  getPublicAbout,
  getAdminAbout,
  updateAboutContent,
  updateHistory,
  addTimelineEntry,
  removeTimelineEntry,
} from '../controllers/about.controller.js';
import { authenticate, authorize, hasPermission } from '../middlewares/auth.js';
import validate from '../middlewares/validate.js';
import { upload } from '../middlewares/upload.js';
import { MEDIA_TYPES, ROLES, PERMISSIONS } from '../constants/index.js';
import { updateAboutValidation, updateHistoryValidation, addTimelineValidation } from '../validators/about.validators.js';

const router = Router();

router.get('/', getPublicAbout);
router.get('/admin', authenticate, authorize(ROLES.SUPER_ADMIN, ROLES.ADMIN), getAdminAbout);

router.use(authenticate, authorize(ROLES.SUPER_ADMIN, ROLES.ADMIN));

router.patch(
  '/',
  hasPermission(PERMISSIONS.MANAGE_ABOUT),
  upload([MEDIA_TYPES.IMAGE], { fieldName: 'historyImage' }),
  validate(updateAboutValidation),
  updateAboutContent
);

router.patch(
  '/history',
  hasPermission(PERMISSIONS.MANAGE_ABOUT),
  upload([MEDIA_TYPES.IMAGE], { fieldName: 'image' }),
  validate(updateHistoryValidation),
  updateHistory
);

router.post(
  '/timeline',
  hasPermission(PERMISSIONS.MANAGE_ABOUT),
  validate(addTimelineValidation),
  addTimelineEntry
);

router.delete('/timeline/:index', hasPermission(PERMISSIONS.MANAGE_ABOUT), removeTimelineEntry);

export default router;
