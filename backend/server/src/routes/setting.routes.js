import { Router } from 'express';
import {
  getPublicSettings,
  getAdminSettings,
  updateSettings,
  updateSocialLinks,
  updateHomepageSettings,
  updateFooterSettings,
  updateLanguageSettings,
  updateLiveStreamSettings,
  updateThemeSettings,
} from '../controllers/setting.controller.js';
import { authenticate, authorize, hasPermission } from '../middlewares/auth.js';
import validate from '../middlewares/validate.js';
import { uploadMixed } from '../middlewares/upload.js';
import { MEDIA_TYPES, ROLES, PERMISSIONS } from '../constants/index.js';
import {
  updateSettingsValidation,
  updateSocialLinksValidation,
  updateHomepageSettingsValidation,
  updateFooterValidation,
  updateLanguageSettingsValidation,
  updateLiveStreamValidation,
  updateThemeValidation,
} from '../validators/setting.validators.js';

const router = Router();

router.get('/public', getPublicSettings);
router.get('/', getPublicSettings);

router.use(authenticate, authorize(ROLES.SUPER_ADMIN, ROLES.ADMIN));

router.get('/admin', getAdminSettings);

router.patch(
  '/',
  hasPermission(PERMISSIONS.MANAGE_SETTINGS),
  uploadMixed(['logo', 'heroImage', 'favicon'], [MEDIA_TYPES.IMAGE]),
  validate(updateSettingsValidation),
  updateSettings
);

router.patch('/social', hasPermission(PERMISSIONS.MANAGE_SETTINGS), validate(updateSocialLinksValidation), updateSocialLinks);
router.patch('/homepage', hasPermission(PERMISSIONS.MANAGE_SETTINGS), validate(updateHomepageSettingsValidation), updateHomepageSettings);
router.patch('/footer', hasPermission(PERMISSIONS.MANAGE_SETTINGS), validate(updateFooterValidation), updateFooterSettings);
router.patch('/language', hasPermission(PERMISSIONS.MANAGE_SETTINGS), validate(updateLanguageSettingsValidation), updateLanguageSettings);
router.patch('/live-stream', hasPermission(PERMISSIONS.MANAGE_SETTINGS), validate(updateLiveStreamValidation), updateLiveStreamSettings);
router.patch('/theme', hasPermission(PERMISSIONS.MANAGE_SETTINGS), validate(updateThemeValidation), updateThemeSettings);

export default router;
