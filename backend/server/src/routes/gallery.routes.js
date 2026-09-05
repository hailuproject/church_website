import { Router } from 'express';
import {
  listAlbums,
  getAlbum,
  createAlbum,
  updateAlbum,
  addAlbumImages,
  addAlbumVideos,
  removeAlbumMedia,
  deleteAlbum,
} from '../controllers/gallery.controller.js';
import validate from '../middlewares/validate.js';
import { authenticate, hasPermission } from '../middlewares/auth.js';
import { upload, uploadMany } from '../middlewares/upload.js';
import { PERMISSIONS, MEDIA_TYPES } from '../constants/index.js';
import {
  listAlbumsValidation,
  createAlbumValidation,
  updateAlbumValidation,
  albumIdValidation,
} from '../validators/gallery.validators.js';
import { objectIdValidator } from '../validators/common.validators.js';

const router = Router();

router.get('/', validate(listAlbumsValidation), listAlbums);
router.get('/:id', validate(albumIdValidation), getAlbum);

router.use(authenticate);

router.post(
  '/',
  hasPermission(PERMISSIONS.MANAGE_GALLERY),
  upload([MEDIA_TYPES.IMAGE], { fieldName: 'coverImage' }),
  validate(createAlbumValidation),
  createAlbum
);

router.patch(
  '/:id',
  hasPermission(PERMISSIONS.MANAGE_GALLERY),
  upload([MEDIA_TYPES.IMAGE], { fieldName: 'coverImage' }),
  validate([...albumIdValidation, ...updateAlbumValidation]),
  updateAlbum
);

router.post(
  '/:id/images',
  hasPermission(PERMISSIONS.MANAGE_GALLERY),
  uploadMany([MEDIA_TYPES.IMAGE], { fieldName: 'images', maxCount: 20 }),
  validate(albumIdValidation),
  addAlbumImages
);

router.post(
  '/:id/videos',
  hasPermission(PERMISSIONS.MANAGE_GALLERY),
  uploadMany([MEDIA_TYPES.VIDEO], { fieldName: 'videos', maxCount: 5 }),
  validate(albumIdValidation),
  addAlbumVideos
);

router.delete(
  '/:id/media/:mediaId',
  hasPermission(PERMISSIONS.MANAGE_GALLERY),
  validate([...albumIdValidation, objectIdValidator('mediaId')]),
  removeAlbumMedia
);

router.delete('/:id', hasPermission(PERMISSIONS.MANAGE_GALLERY), validate(albumIdValidation), deleteAlbum);

export default router;