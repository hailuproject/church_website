import { body } from 'express-validator';
import { ROLE_VALUES } from '../constants/index.js';
import { enumValidator, paginationValidators } from './common.validators.js';
import { createAdminValidation, updateAdminValidation } from './auth.validators.js';

export const listAdminsValidation = paginationValidators;
export { createAdminValidation, updateAdminValidation };

export const changeRoleValidation = [enumValidator('role', ROLE_VALUES)];

export const toggleStatusValidation = [
  body('isActive').isBoolean().withMessage('isActive must be a boolean'),
];

export default {
  listAdminsValidation,
  changeRoleValidation,
  toggleStatusValidation,
  createAdminValidation,
  updateAdminValidation,
};
