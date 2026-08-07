import { Router } from 'express';
import {
  listLeadership,
  getActiveLeadership,
  getLeader,
  createLeader,
  updateLeader,
  deleteLeader,
} from '../controllers/leadership.controller.js';
import { authenticate, authorize, hasPermission } from '../middlewares/auth.js';
import validate from '../middlewares/validate.js';
import { upload } from '../middlewares/upload.js';
import { MEDIA_TYPES, ROLES, PERMISSIONS } from '../constants/index.js';
import { createLeaderValidation, updateLeaderValidation, listLeadershipValidation } from '../validators/leadership.validators.js';
import { objectIdValidator } from '../validators/common.validators.js';

const router = Router();

router.get('/', validate(listLeadershipValidation), listLeadership);
router.get('/active', getActiveLeadership);
router.get('/:id', validate([objectIdValidator('id')]), getLeader);

router.use(authenticate);

router.post(
  '/',
  authorize(ROLES.SUPER_ADMIN, ROLES.ADMIN),
  hasPermission(PERMISSIONS.MANAGE_LEADERSHIP),
  upload([MEDIA_TYPES.IMAGE], { fieldName: 'photo' }),
  validate(createLeaderValidation),
  createLeader
);

router.patch(
  '/:id',
  authorize(ROLES.SUPER_ADMIN, ROLES.ADMIN),
  hasPermission(PERMISSIONS.MANAGE_LEADERSHIP),
  upload([MEDIA_TYPES.IMAGE], { fieldName: 'photo' }),
  validate([objectIdValidator('id'), ...updateLeaderValidation]),
  updateLeader
);

router.delete(
  '/:id',
  authorize(ROLES.SUPER_ADMIN, ROLES.ADMIN),
  hasPermission(PERMISSIONS.MANAGE_LEADERSHIP),
  validate([objectIdValidator('id')]),
  deleteLeader
);

export default router;
