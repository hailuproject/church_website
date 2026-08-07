import { Router } from 'express';
import {
  getPublicHome,
  getAdminHome,
  updateHomeContent,
  updateHero,
  deleteHeroSlide,
  addQuickLink,
  removeQuickLink,
  updateQuickLink,
} from '../controllers/home.controller.js';
import { authenticate, authorize, hasPermission } from '../middlewares/auth.js';
import validate from '../middlewares/validate.js';
import { upload, uploadMixed } from '../middlewares/upload.js';
import { MEDIA_TYPES, ROLES, PERMISSIONS } from '../constants/index.js';
import { updateHomeValidation, updateHeroValidation, addQuickLinkValidation } from '../validators/home.validators.js';

const router = Router();

router.get('/', getPublicHome);
router.get('/admin', authenticate, authorize(ROLES.SUPER_ADMIN, ROLES.ADMIN), getAdminHome);

router.use(authenticate, authorize(ROLES.SUPER_ADMIN, ROLES.ADMIN));

router.patch(
  '/',
  hasPermission(PERMISSIONS.MANAGE_HOME),
  uploadMixed(['heroImage', 'welcomeImage', 'priestImage'], [MEDIA_TYPES.IMAGE]),
  validate(updateHomeValidation),
  updateHomeContent
);

router.patch(
  '/hero',
  hasPermission(PERMISSIONS.MANAGE_HOME),
  upload([MEDIA_TYPES.IMAGE], { fieldName: 'image' }),
  validate(updateHeroValidation),
  updateHero
);

router.delete('/hero/:index', hasPermission(PERMISSIONS.MANAGE_HOME), deleteHeroSlide);

router.post(
  '/quick-links',
  hasPermission(PERMISSIONS.MANAGE_HOME),
  validate(addQuickLinkValidation),
  addQuickLink
);

router.delete('/quick-links/:index', hasPermission(PERMISSIONS.MANAGE_HOME), removeQuickLink);

router.patch(
  '/quick-links/:index',
  hasPermission(PERMISSIONS.MANAGE_HOME),
  validate(addQuickLinkValidation),
  updateQuickLink
);

export default router;
