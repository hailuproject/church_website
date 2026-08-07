import { Router } from 'express';
import {
  listAlbums,
  getAlbum,
  createAlbum,
  updateAlbum,
  deleteAlbum,
  addImageToAlbum,
  addVideoToAlbum,
  addImagesToAlbum,
  removeImageFromAlbum,
  removeVideoFromAlbum,
} from '../controllers/gallery.controller.js';
import { authenticate, authorize, hasPermission } from '../middlewares/auth.js';
import validate from '../middlewares/validate.js';
import { upload, uploadMultiple } from '../middlewares/upload.js';
import { MEDIA_TYPES, ROLES, PERMISSIONS } from '../constants/index.js';
import { createAlbumValidation, updateAlbumValidation, listAlbumsValidation } from '../validators/gallery.validators.js';
import { objectIdValidator } from '../validators/common.validators.js';
import { uploadLimiter } from '../middlewares/rateLimiter.js';

const router = Router();

router.get('/', validate(listAlbumsValidation), listAlbums);
router.get('/:id', validate([objectIdValidator('id')]), getAlbum);

router.use(authenticate);

router.post(
  '/',
  authorize(ROLES.SUPER_ADMIN, ROLES.ADMIN, ROLES.DEACON),
  hasPermission(PERMISSIONS.MANAGE_GALLERY),
  upload([MEDIA_TYPES.IMAGE], { fieldName: 'coverImage' }),
  validate(createAlbumValidation),
  createAlbum
);

router.patch(
  '/:id',
  authorize(ROLES.SUPER_ADMIN, ROLES.ADMIN, ROLES.DEACON),
  hasPermission(PERMISSIONS.MANAGE_GALLERY),
  upload([MEDIA_TYPES.IMAGE], { fieldName: 'coverImage' }),
  validate([objectIdValidator('id'), ...updateAlbumValidation]),
  updateAlbum
);

router.delete(
  '/:id',
  authorize(ROLES.SUPER_ADMIN, ROLES.ADMIN, ROLES.DEACON),
  hasPermission(PERMISSIONS.MANAGE_GALLERY),
  validate([objectIdValidator('id')]),
  deleteAlbum
);

router.post(
  '/:id/images',
  uploadLimiter,
  authorize(ROLES.SUPER_ADMIN, ROLES.ADMIN, ROLES.DEACON),
  hasPermission(PERMISSIONS.MANAGE_GALLERY),
  uploadMultiple([MEDIA_TYPES.IMAGE], { fieldName: 'images', maxCount: 10 }),
  validate([objectIdValidator('id')]),
  addImagesToAlbum
);

router.post(
  '/:id/images/single',
  uploadLimiter,
  authorize(ROLES.SUPER_ADMIN, ROLES.ADMIN, ROLES.DEACON),
  hasPermission(PERMISSIONS.MANAGE_GALLERY),
  upload([MEDIA_TYPES.IMAGE], { fieldName: 'image' }),
  validate([objectIdValidator('id')]),
  addImageToAlbum
);

router.post(
  '/:id/videos',
  uploadLimiter,
  authorize(ROLES.SUPER_ADMIN, ROLES.ADMIN, ROLES.DEACON),
  hasPermission(PERMISSIONS.MANAGE_GALLERY),
  upload([MEDIA_TYPES.VIDEO], { fieldName: 'video' }),
  validate([objectIdValidator('id')]),
  addVideoToAlbum
);

router.delete(
  '/:id/images/:mediaId',
  authorize(ROLES.SUPER_ADMIN, ROLES.ADMIN, ROLES.DEACON),
  hasPermission(PERMISSIONS.MANAGE_GALLERY),
  validate([objectIdValidator('id'), objectIdValidator('mediaId')]),
  removeImageFromAlbum
);

router.delete(
  '/:id/videos/:mediaId',
  authorize(ROLES.SUPER_ADMIN, ROLES.ADMIN, ROLES.DEACON),
  hasPermission(PERMISSIONS.MANAGE_GALLERY),
  validate([objectIdValidator('id'), objectIdValidator('mediaId')]),
  removeVideoFromAlbum
);

export default router;
