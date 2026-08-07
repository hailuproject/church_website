import { body } from 'express-validator';
import { requiredString, optionalString, paginationValidators } from './common.validators.js';

export const upsertTranslationValidation = [
  requiredString('key', 'Key', { max: 150 }),
  optionalString('english'),
  optionalString('amharic'),
  optionalString('section', { max: 50 }),
  optionalString('description'),
];

export const bulkUpsertTranslationsValidation = [
  body('items').isArray({ min: 1 }).withMessage('items must be a non-empty array'),
  body('items.*.key').isString().notEmpty().withMessage('Each item must have a key'),
  body('items.*.english').optional().isString().withMessage('english must be a string'),
  body('items.*.amharic').optional().isString().withMessage('amharic must be a string'),
  body('items.*.section').optional().isString().withMessage('section must be a string'),
];

export const listTranslationsValidation = paginationValidators;

export default { upsertTranslationValidation, bulkUpsertTranslationsValidation, listTranslationsValidation };
