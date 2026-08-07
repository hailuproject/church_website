import { Router } from 'express';
import {
  listTranslations,
  getTranslation,
  getTranslationByKey,
  upsertTranslation,
  bulkUpsertTranslations,
  deleteTranslation,
  getPublicTranslations,
  getSections,
} from '../controllers/language.controller.js';
import { authenticate, authorize, hasPermission } from '../middlewares/auth.js';
import validate from '../middlewares/validate.js';
import { ROLES, PERMISSIONS } from '../constants/index.js';
import {
  upsertTranslationValidation,
  bulkUpsertTranslationsValidation,
  listTranslationsValidation,
} from '../validators/language.validators.js';
import { objectIdValidator } from '../validators/common.validators.js';

const router = Router();

router.get('/public', getPublicTranslations);
router.get('/sections', authenticate, authorize(ROLES.SUPER_ADMIN, ROLES.ADMIN), getSections);
router.get('/key/:key', getTranslationByKey);
router.get('/:id', validate([objectIdValidator('id')]), getTranslation);

router.use(authenticate, authorize(ROLES.SUPER_ADMIN, ROLES.ADMIN));

router.get('/', hasPermission(PERMISSIONS.MANAGE_LANGUAGES), validate(listTranslationsValidation), listTranslations);

router.post(
  '/',
  hasPermission(PERMISSIONS.MANAGE_LANGUAGES),
  validate(upsertTranslationValidation),
  upsertTranslation
);

router.post(
  '/bulk',
  hasPermission(PERMISSIONS.MANAGE_LANGUAGES),
  validate(bulkUpsertTranslationsValidation),
  bulkUpsertTranslations
);

router.delete(
  '/:id',
  hasPermission(PERMISSIONS.MANAGE_LANGUAGES),
  validate([objectIdValidator('id')]),
  deleteTranslation
);

export default router;
