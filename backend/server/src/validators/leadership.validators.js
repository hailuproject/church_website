import { requiredString, optionalString, enumValidator, booleanValidator, paginationValidators, optionalEmailValidator, phoneValidator } from './common.validators.js';

const LEADERSHIP_ROLES = ['Priest', 'Head Priest', 'Deacon', 'Evangelist', 'Teacher', 'Elder', 'Secretary', 'Committee'];

export const createLeaderValidation = [
  requiredString('name', 'Name', { max: 150 }),
  optionalString('nameAm', { max: 150 }),
  optionalString('title', { max: 150 }),
  optionalString('titleAm', { max: 150 }),
  enumValidator('role', LEADERSHIP_ROLES),
  optionalString('bio'),
  optionalString('bioAm'),
  optionalEmailValidator('email'),
  phoneValidator('phone'),
  booleanValidator('isActive'),
];

export const updateLeaderValidation = [
  optionalString('name', { max: 150 }),
  optionalString('nameAm', { max: 150 }),
  optionalString('title', { max: 150 }),
  optionalString('titleAm', { max: 150 }),
  enumValidator('role', LEADERSHIP_ROLES),
  optionalString('bio'),
  optionalString('bioAm'),
  optionalEmailValidator('email'),
  phoneValidator('phone'),
  booleanValidator('isActive'),
];

export const listLeadershipValidation = [
  ...paginationValidators,
  enumValidator('role', LEADERSHIP_ROLES),
];

export default { createLeaderValidation, updateLeaderValidation, listLeadershipValidation };
