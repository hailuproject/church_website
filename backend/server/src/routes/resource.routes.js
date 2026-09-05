import { Router } from 'express';
import {
  listResources,
  getResource,
  createResource,
  updateResource,
  deleteResource,
  incrementResourceDownload,
  getResourceCategories,
  uploadResourcePdf,
  uploadResourceThumbnail,
} from '../controllers/resource.controller.js';
import { authenticate, authorize, hasPermission, optionalAuthenticate } from '../middlewares/auth.js';
import validate from '../middlewares/validate.js';
import { upload } from '../middlewares/upload.js';
import { MEDIA_TYPES, ROLES, PERMISSIONS } from '../constants/index.js';
import {
  createResourceValidation,
  updateResourceValidation,
  listResourcesValidation,
} from '../validators/resource.validators.js';
import { objectIdValidator } from '../validators/common.validators.js';
import { uploadLimiter, downloadLimiter } from '../middlewares/rateLimiter.js';

const router = Router();

router.get('/', optionalAuthenticate, validate(listResourcesValidation), listResources);
router.get('/categories', getResourceCategories);
router.get('/:id', optionalAuthenticate, validate([objectIdValidator('id')]), getResource);
router.post('/:id/download', downloadLimiter, validate([objectIdValidator('id')]), incrementResourceDownload);

router.use(authenticate);

router.post(
  '/',
  authorize(ROLES.SUPER_ADMIN, ROLES.ADMIN, ROLES.DEACON),
  hasPermission(PERMISSIONS.MANAGE_RESOURCES),
  upload([MEDIA_TYPES.IMAGE], { fieldName: 'thumbnail' }),
  validate(createResourceValidation),
  createResource
);

router.patch(
  '/:id',
  authorize(ROLES.SUPER_ADMIN, ROLES.ADMIN, ROLES.DEACON),
  hasPermission(PERMISSIONS.MANAGE_RESOURCES),
  upload([MEDIA_TYPES.IMAGE], { fieldName: 'thumbnail' }),
  validate([objectIdValidator('id'), ...updateResourceValidation]),
  updateResource
);

router.post(
  '/:id/pdf',
  uploadLimiter,
  authorize(ROLES.SUPER_ADMIN, ROLES.ADMIN, ROLES.DEACON),
  hasPermission(PERMISSIONS.MANAGE_RESOURCES),
  upload([MEDIA_TYPES.PDF], { fieldName: 'pdf' }),
  validate([objectIdValidator('id')]),
  uploadResourcePdf
);

router.post(
  '/:id/thumbnail',
  uploadLimiter,
  authorize(ROLES.SUPER_ADMIN, ROLES.ADMIN, ROLES.DEACON),
  hasPermission(PERMISSIONS.MANAGE_RESOURCES),
  upload([MEDIA_TYPES.IMAGE], { fieldName: 'thumbnail' }),
  validate([objectIdValidator('id')]),
  uploadResourceThumbnail
);

router.delete(
  '/:id',
  authorize(ROLES.SUPER_ADMIN, ROLES.ADMIN, ROLES.DEACON),
  hasPermission(PERMISSIONS.MANAGE_RESOURCES),
  validate([objectIdValidator('id')]),
  deleteResource
);

export default router;
