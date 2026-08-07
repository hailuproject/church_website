import { Router } from 'express';
import {
  listAdmins,
  getAdmin,
  createAdmin,
  updateAdmin,
  deleteAdmin,
  changeRole,
  toggleStatus,
  uploadAdminAvatar,
} from '../controllers/admin.controller.js';
import { authenticate, authorize, hasPermission } from '../middlewares/auth.js';
import validate from '../middlewares/validate.js';
import { upload } from '../middlewares/upload.js';
import { MEDIA_TYPES, ROLES, PERMISSIONS } from '../constants/index.js';
import {
  createAdminValidation,
  updateAdminValidation,
  changeRoleValidation,
  toggleStatusValidation,
  listAdminsValidation,
} from '../validators/admin.validators.js';
import { objectIdValidator } from '../validators/common.validators.js';

const router = Router();

router.use(authenticate);

router.get(
  '/',
  authorize(ROLES.SUPER_ADMIN, ROLES.ADMIN),
  validate(listAdminsValidation),
  listAdmins
);

router.get(
  '/:id',
  authorize(ROLES.SUPER_ADMIN, ROLES.ADMIN),
  validate([objectIdValidator('id')]),
  getAdmin
);

router.post(
  '/',
  authorize(ROLES.SUPER_ADMIN, ROLES.ADMIN),
  hasPermission(PERMISSIONS.MANAGE_USERS),
  validate(createAdminValidation),
  createAdmin
);

router.patch(
  '/:id',
  authorize(ROLES.SUPER_ADMIN, ROLES.ADMIN),
  hasPermission(PERMISSIONS.MANAGE_USERS),
  validate([objectIdValidator('id'), ...updateAdminValidation]),
  updateAdmin
);

router.delete(
  '/:id',
  authorize(ROLES.SUPER_ADMIN),
  hasPermission(PERMISSIONS.MANAGE_USERS),
  validate([objectIdValidator('id')]),
  deleteAdmin
);

router.patch(
  '/:id/role',
  authorize(ROLES.SUPER_ADMIN),
  validate([objectIdValidator('id'), ...changeRoleValidation]),
  changeRole
);

router.patch(
  '/:id/status',
  authorize(ROLES.SUPER_ADMIN, ROLES.ADMIN),
  validate([objectIdValidator('id'), ...toggleStatusValidation]),
  toggleStatus
);

router.post(
  '/:id/avatar',
  authorize(ROLES.SUPER_ADMIN, ROLES.ADMIN),
  upload([MEDIA_TYPES.IMAGE], { fieldName: 'avatar' }),
  uploadAdminAvatar
);

export default router;
