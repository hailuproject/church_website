import { Router } from 'express';
import {
  listMedia,
  getMedia,
  uploadSingle,
  uploadBulk,
  deleteMedia,
  updateMediaMetadata,
} from '../controllers/media.controller.js';
import { authenticate, authorize } from '../middlewares/auth.js';
import validate from '../middlewares/validate.js';
import { upload, uploadMultiple } from '../middlewares/upload.js';
import { MEDIA_TYPES, ROLES, CLOUDINARY_FOLDERS } from '../constants/index.js';
import { listMediaValidation, uploadMediaValidation, updateMediaValidation } from '../validators/media.validators.js';
import { objectIdValidator } from '../validators/common.validators.js';
import { uploadLimiter } from '../middlewares/rateLimiter.js';

const router = Router();

router.get('/', validate(listMediaValidation), listMedia);
router.get('/:id', validate([objectIdValidator('id')]), getMedia);

router.use(authenticate, authorize(ROLES.SUPER_ADMIN, ROLES.ADMIN, ROLES.DEACON, ROLES.PRIEST, ROLES.SECRETARY));

router.post(
  '/upload',
  uploadLimiter,
  upload([MEDIA_TYPES.IMAGE, MEDIA_TYPES.VIDEO, MEDIA_TYPES.AUDIO, MEDIA_TYPES.PDF], { fieldName: 'file' }),
  validate(uploadMediaValidation),
  uploadSingle
);

router.post(
  '/upload/multiple',
  uploadLimiter,
  uploadMultiple([MEDIA_TYPES.IMAGE, MEDIA_TYPES.VIDEO, MEDIA_TYPES.AUDIO, MEDIA_TYPES.PDF], { fieldName: 'files', maxCount: 10 }),
  validate(uploadMediaValidation),
  uploadBulk
);

router.patch('/:id', validate([objectIdValidator('id'), ...updateMediaValidation]), updateMediaMetadata);
router.delete('/:id', validate([objectIdValidator('id')]), deleteMedia);

export default router;
