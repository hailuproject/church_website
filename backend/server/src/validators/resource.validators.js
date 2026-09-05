import { RESOURCE_CATEGORIES, RESOURCE_LANGUAGES } from '../constants/index.js';
import {
  requiredString,
  optionalString,
  enumValidator,
  booleanValidator,
  paginationValidators,
} from './common.validators.js';

export const createResourceValidation = [
  requiredString('title', 'Title', { max: 250 }),
  optionalString('titleAm', { max: 250 }),
  optionalString('titleTi', { max: 250 }),
  optionalString('description'),
  optionalString('descriptionAm'),
  optionalString('descriptionTi'),
  enumValidator('category', RESOURCE_CATEGORIES),
  enumValidator('language', RESOURCE_LANGUAGES),
  booleanValidator('isPublished'),
];

export const updateResourceValidation = [
  optionalString('title', { max: 250 }),
  optionalString('titleAm', { max: 250 }),
  optionalString('titleTi', { max: 250 }),
  optionalString('description'),
  optionalString('descriptionAm'),
  optionalString('descriptionTi'),
  enumValidator('category', RESOURCE_CATEGORIES),
  enumValidator('language', RESOURCE_LANGUAGES),
  booleanValidator('isPublished'),
];

export const listResourcesValidation = [
  ...paginationValidators,
  enumValidator('category', RESOURCE_CATEGORIES),
  enumValidator('language', RESOURCE_LANGUAGES),
];

export default { createResourceValidation, updateResourceValidation, listResourcesValidation };
