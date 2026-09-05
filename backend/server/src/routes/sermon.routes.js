import { Router } from 'express';
import {
  listSermons,
  listPublishedSermons,
  getSermon,
  createSermon,
  updateSermon,
  deleteSermon,
  uploadAudio,
  uploadVideo,
  uploadThumbnail,
  toggleSermonPublish,
  toggleSermonFeatured,
  incrementSermonDownload,
  getFeaturedSermons,
  getRecentSermons,
  getSermonCategories,
} from '../controllers/sermon.controller.js';
import { authenticate, authorize, hasPermission, optionalAuthenticate } from '../middlewares/auth.js';
import validate from '../middlewares/validate.js';
import { upload } from '../middlewares/upload.js';
import { MEDIA_TYPES, ROLES, PERMISSIONS } from '../constants/index.js';
import {
  createSermonValidation,
  updateSermonValidation,
  listSermonsValidation,
} from '../validators/sermon.validators.js';
import { objectIdValidator } from '../validators/common.validators.js';
import { uploadLimiter, downloadLimiter } from '../middlewares/rateLimiter.js';

const router = Router();

router.get('/', optionalAuthenticate, validate(listSermonsValidation), listSermons);
router.get('/public', validate(listSermonsValidation), listPublishedSermons);
router.get('/featured', getFeaturedSermons);
router.get('/recent', getRecentSermons);
router.get('/categories', getSermonCategories);
router.get('/:id', optionalAuthenticate, validate([objectIdValidator('id')]), getSermon);
router.post('/:id/download', downloadLimiter, validate([objectIdValidator('id')]), incrementSermonDownload);

router.use(authenticate);

router.post(
  '/',
  authorize(ROLES.SUPER_ADMIN, ROLES.ADMIN, ROLES.PRIEST),
  hasPermission(PERMISSIONS.MANAGE_SERMONS),
  upload([MEDIA_TYPES.IMAGE], { fieldName: 'thumbnail' }),
  validate(createSermonValidation),
  createSermon
);

router.patch(
  '/:id',
  authorize(ROLES.SUPER_ADMIN, ROLES.ADMIN, ROLES.PRIEST),
  hasPermission(PERMISSIONS.MANAGE_SERMONS),
  upload([MEDIA_TYPES.IMAGE], { fieldName: 'thumbnail' }),
  validate([objectIdValidator('id'), ...updateSermonValidation]),
  updateSermon
);

router.post(
  '/:id/audio',
  uploadLimiter,
  authorize(ROLES.SUPER_ADMIN, ROLES.ADMIN, ROLES.PRIEST),
  hasPermission(PERMISSIONS.MANAGE_SERMONS),
  upload([MEDIA_TYPES.AUDIO], { fieldName: 'audio' }),
  validate([objectIdValidator('id')]),
  uploadAudio
);

router.post(
  '/:id/video',
  uploadLimiter,
  authorize(ROLES.SUPER_ADMIN, ROLES.ADMIN, ROLES.PRIEST),
  hasPermission(PERMISSIONS.MANAGE_SERMONS),
  upload([MEDIA_TYPES.VIDEO], { fieldName: 'video' }),
  validate([objectIdValidator('id')]),
  uploadVideo
);

router.post(
  '/:id/thumbnail',
  uploadLimiter,
  authorize(ROLES.SUPER_ADMIN, ROLES.ADMIN, ROLES.PRIEST),
  hasPermission(PERMISSIONS.MANAGE_SERMONS),
  upload([MEDIA_TYPES.IMAGE], { fieldName: 'thumbnail' }),
  validate([objectIdValidator('id')]),
  uploadThumbnail
);

router.patch(
  '/:id/publish',
  authorize(ROLES.SUPER_ADMIN, ROLES.ADMIN, ROLES.PRIEST),
  hasPermission(PERMISSIONS.MANAGE_SERMONS),
  validate([objectIdValidator('id')]),
  toggleSermonPublish
);

router.patch(
  '/:id/feature',
  authorize(ROLES.SUPER_ADMIN, ROLES.ADMIN, ROLES.PRIEST),
  hasPermission(PERMISSIONS.MANAGE_SERMONS),
  validate([objectIdValidator('id')]),
  toggleSermonFeatured
);

router.delete(
  '/:id',
  authorize(ROLES.SUPER_ADMIN, ROLES.ADMIN, ROLES.PRIEST),
  hasPermission(PERMISSIONS.MANAGE_SERMONS),
  validate([objectIdValidator('id')]),
  deleteSermon
);

export default router;
