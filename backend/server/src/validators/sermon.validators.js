import { body } from 'express-validator';
import { SERMON_CATEGORIES, SERMON_LANGUAGES } from '../constants/index.js';
import {
  requiredString,
  optionalString,
  enumValidator,
  booleanValidator,
  numberValidator,
  paginationValidators,
} from './common.validators.js';

export const createSermonValidation = [
  requiredString('title', 'Title', { max: 250 }),
  optionalString('titleAm', { max: 250 }),
  optionalString('titleTi', { max: 250 }),
  optionalString('description'),
  optionalString('descriptionAm'),
  optionalString('descriptionTi'),
  optionalString('speaker', { max: 150 }),
  optionalString('scripture', { max: 200 }),
  enumValidator('category', SERMON_CATEGORIES),
  enumValidator('language', SERMON_LANGUAGES),
  numberValidator('duration', { min: 0 }),
  booleanValidator('isPublished'),
  booleanValidator('isFeatured'),
];

export const updateSermonValidation = [
  optionalString('title', { max: 250 }),
  optionalString('titleAm', { max: 250 }),
  optionalString('titleTi', { max: 250 }),
  optionalString('description'),
  optionalString('descriptionAm'),
  optionalString('descriptionTi'),
  optionalString('speaker', { max: 150 }),
  optionalString('scripture', { max: 200 }),
  enumValidator('category', SERMON_CATEGORIES),
  enumValidator('language', SERMON_LANGUAGES),
  numberValidator('duration', { min: 0 }),
  booleanValidator('isPublished'),
  booleanValidator('isFeatured'),
];

export const listSermonsValidation = [
  ...paginationValidators,
  enumValidator('category', SERMON_CATEGORIES),
  enumValidator('language', SERMON_LANGUAGES),
];

export const toggleBooleanValidation = [
  body('isPublished').optional({ nullable: true }).isBoolean().withMessage('isPublished must be a boolean'),
  body('isFeatured').optional({ nullable: true }).isBoolean().withMessage('isFeatured must be a boolean'),
];

export default {
  createSermonValidation,
  updateSermonValidation,
  listSermonsValidation,
  toggleBooleanValidation,
};
