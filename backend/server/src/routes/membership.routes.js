import { Router } from 'express';
import {
  listMembers,
  getMember,
  registerMember,
  updateMember,
  approveMember,
  rejectMember,
  changeMemberStatus,
  deleteMember,
} from '../controllers/membership.controller.js';
import { authenticate, authorize, hasPermission } from '../middlewares/auth.js';
import validate from '../middlewares/validate.js';
import { uploadMultiple } from '../middlewares/upload.js';
import { MEDIA_TYPES, ROLES, PERMISSIONS } from '../constants/index.js';
import {
  registerMemberValidation,
  updateMemberValidation,
  changeStatusValidation,
  listMembersValidation,
} from '../validators/membership.validators.js';
import { objectIdValidator } from '../validators/common.validators.js';
import { uploadLimiter } from '../middlewares/rateLimiter.js';

const router = Router();

router.get('/', validate(listMembersValidation), listMembers);
router.get('/:id', validate([objectIdValidator('id')]), getMember);

router.post(
  '/',
  uploadMultiple([MEDIA_TYPES.PDF, MEDIA_TYPES.IMAGE], { fieldName: 'documents', maxCount: 5 }),
  validate(registerMemberValidation),
  registerMember
);

router.use(authenticate);

router.patch(
  '/:id',
  authorize(ROLES.SUPER_ADMIN, ROLES.ADMIN, ROLES.SECRETARY),
  hasPermission(PERMISSIONS.MANAGE_MEMBERSHIP),
  uploadMultiple([MEDIA_TYPES.PDF, MEDIA_TYPES.IMAGE], { fieldName: 'documents', maxCount: 5 }),
  validate([objectIdValidator('id'), ...updateMemberValidation]),
  updateMember
);

router.patch(
  '/:id/approve',
  authorize(ROLES.SUPER_ADMIN, ROLES.ADMIN, ROLES.SECRETARY),
  hasPermission(PERMISSIONS.MANAGE_MEMBERSHIP),
  validate([objectIdValidator('id')]),
  approveMember
);

router.patch(
  '/:id/reject',
  authorize(ROLES.SUPER_ADMIN, ROLES.ADMIN, ROLES.SECRETARY),
  hasPermission(PERMISSIONS.MANAGE_MEMBERSHIP),
  validate([objectIdValidator('id')]),
  rejectMember
);

router.patch(
  '/:id/status',
  authorize(ROLES.SUPER_ADMIN, ROLES.ADMIN, ROLES.SECRETARY),
  hasPermission(PERMISSIONS.MANAGE_MEMBERSHIP),
  validate([objectIdValidator('id'), ...changeStatusValidation]),
  changeMemberStatus
);

router.delete(
  '/:id',
  authorize(ROLES.SUPER_ADMIN, ROLES.ADMIN, ROLES.SECRETARY),
  hasPermission(PERMISSIONS.MANAGE_MEMBERSHIP),
  validate([objectIdValidator('id')]),
  deleteMember
);

export default router;
