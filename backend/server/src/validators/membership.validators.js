import { MEMBERSHIP_STATUSES } from '../constants/index.js';
import {
  requiredString,
  optionalString,
  enumValidator,
  optionalEmailValidator,
  phoneValidator,
  paginationValidators,
  optionalDateValidator,
} from './common.validators.js';

export const registerMemberValidation = [
  requiredString('fullName', 'Full name', { max: 150 }),
  optionalString('amharicName', { max: 150 }),
  optionalString('baptismName', { max: 150 }),
  optionalEmailValidator('email'),
  phoneValidator('phone'),
  optionalString('address.street'),
  optionalString('address.city'),
  optionalString('address.subcity'),
  optionalString('address.woreda'),
  optionalString('address.country'),
  optionalString('notes'),
];

export const updateMemberValidation = [
  optionalString('fullName', { max: 150 }),
  optionalString('amharicName', { max: 150 }),
  optionalString('baptismName', { max: 150 }),
  optionalEmailValidator('email'),
  phoneValidator('phone'),
  optionalString('address.street'),
  optionalString('address.city'),
  optionalString('address.subcity'),
  optionalString('address.woreda'),
  optionalString('address.country'),
  enumValidator('status', MEMBERSHIP_STATUSES),
  optionalString('notes'),
];

export const changeStatusValidation = [
  enumValidator('status', MEMBERSHIP_STATUSES),
];

export const listMembersValidation = [
  ...paginationValidators,
  enumValidator('status', MEMBERSHIP_STATUSES),
];

export default {
  registerMemberValidation,
  updateMemberValidation,
  changeStatusValidation,
  listMembersValidation,
};
