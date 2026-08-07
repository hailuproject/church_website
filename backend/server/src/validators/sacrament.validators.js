import { body } from 'express-validator';
import { SACRAMENT_TYPES, SACRAMENT_STATUSES } from '../constants/index.js';
import {
  requiredString,
  optionalString,
  enumValidator,
  optionalDateValidator,
  optionalEmailValidator,
  phoneValidator,
  optionalObjectIdValidator,
  paginationValidators,
} from './common.validators.js';

export const createSacramentValidation = [
  body('type').isIn(SACRAMENT_TYPES).withMessage(`type must be one of: ${SACRAMENT_TYPES.join(', ')}`),
  optionalObjectIdValidator('member'),
  requiredString('memberName', 'Member name', { max: 150 }),
  phoneValidator('phone'),
  optionalEmailValidator('email'),
  optionalDateValidator('preferredDate'),
  optionalString('notes'),
];

export const updateSacramentValidation = [
  enumValidator('type', SACRAMENT_TYPES),
  optionalObjectIdValidator('member'),
  optionalString('memberName', { max: 150 }),
  phoneValidator('phone'),
  optionalEmailValidator('email'),
  optionalDateValidator('preferredDate'),
  optionalObjectIdValidator('assignedPriest'),
  enumValidator('status', SACRAMENT_STATUSES),
  optionalString('notes'),
];

export const changeStatusValidation = [
  body('status').isIn(SACRAMENT_STATUSES).withMessage(`status must be one of: ${SACRAMENT_STATUSES.join(', ')}`),
  optionalObjectIdValidator('assignedPriest'),
];

export const listSacramentsValidation = [
  ...paginationValidators,
  enumValidator('type', SACRAMENT_TYPES),
  enumValidator('status', SACRAMENT_STATUSES),
];

export default {
  createSacramentValidation,
  updateSacramentValidation,
  changeStatusValidation,
  listSacramentsValidation,
};
