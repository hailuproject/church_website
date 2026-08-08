import { Router } from 'express';
import {
  uploadAsset,
  deleteAsset,
} from '../controllers/media.controller.js';
import { authenticate, authorize } from '../middlewares/auth.js';
import { upload } from '../middlewares/upload.js';
import { MEDIA_TYPES, ROLES } from '../constants/index.js';
import { uploadLimiter } from '../middlewares/rateLimiter.js';

const router = Router();

router.use(authenticate, authorize(ROLES.SUPER_ADMIN, ROLES.ADMIN, ROLES.DEACON, ROLES.PRIEST, ROLES.SECRETARY));

router.post(
  '/upload',
  uploadLimiter,
  upload([MEDIA_TYPES.IMAGE, MEDIA_TYPES.VIDEO, MEDIA_TYPES.AUDIO, MEDIA_TYPES.PDF], { fieldName: 'file' }),
  uploadAsset
);

router.delete('/:publicId', deleteAsset);

export default router;
