import { Router } from 'express';
import {
  listSacraments,
  getSacrament,
  createSacrament,
  updateSacrament,
  changeSacramentStatus,
  assignSacramentPriest,
  deleteSacrament,
} from '../controllers/sacrament.controller.js';
import { authenticate, authorize, hasPermission } from '../middlewares/auth.js';
import validate from '../middlewares/validate.js';
import { ROLES, PERMISSIONS } from '../constants/index.js';
import {
  createSacramentValidation,
  updateSacramentValidation,
  changeStatusValidation,
  listSacramentsValidation,
} from '../validators/sacrament.validators.js';
import { objectIdValidator } from '../validators/common.validators.js';

const router = Router();

router.get('/', validate(listSacramentsValidation), listSacraments);
router.get('/:id', validate([objectIdValidator('id')]), getSacrament);

router.post('/', validate(createSacramentValidation), createSacrament);

router.use(authenticate);

router.patch(
  '/:id',
  authorize(ROLES.SUPER_ADMIN, ROLES.ADMIN, ROLES.PRIEST, ROLES.SECRETARY),
  hasPermission(PERMISSIONS.MANAGE_SACRAMENTS),
  validate([objectIdValidator('id'), ...updateSacramentValidation]),
  updateSacrament
);

router.patch(
  '/:id/status',
  authorize(ROLES.SUPER_ADMIN, ROLES.ADMIN, ROLES.PRIEST, ROLES.SECRETARY),
  hasPermission(PERMISSIONS.MANAGE_SACRAMENTS),
  validate([objectIdValidator('id'), ...changeStatusValidation]),
  changeSacramentStatus
);

router.patch(
  '/:id/assign-priest',
  authorize(ROLES.SUPER_ADMIN, ROLES.ADMIN, ROLES.PRIEST),
  hasPermission(PERMISSIONS.MANAGE_SACRAMENTS),
  validate([objectIdValidator('id'), ...changeStatusValidation]),
  assignSacramentPriest
);

router.delete(
  '/:id',
  authorize(ROLES.SUPER_ADMIN, ROLES.ADMIN, ROLES.PRIEST),
  hasPermission(PERMISSIONS.MANAGE_SACRAMENTS),
  validate([objectIdValidator('id')]),
  deleteSacrament
);

export default router;
