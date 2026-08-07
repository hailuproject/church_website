import { body } from 'express-validator';
import { CLOUDINARY_FOLDERS } from '../constants/index.js';
import { paginationValidators, optionalString } from './common.validators.js';

const isFolder = (value) => !value || Object.values(CLOUDINARY_FOLDERS).includes(value);

export const listMediaValidation = paginationValidators;

export const uploadMediaValidation = [
  optionalString('folder'),
  body('folder').custom(isFolder).withMessage('Invalid media folder'),
  optionalString('usage', { max: 100 }),
  body('tags').optional().isArray().withMessage('tags must be an array of strings'),
  body('tags.*').optional().isString().withMessage('Each tag must be a string'),
];

export const updateMediaValidation = [
  body('tags').optional().isArray().withMessage('tags must be an array of strings'),
  body('tags.*').optional().isString().withMessage('Each tag must be a string'),
  optionalString('usage', { max: 100 }),
  optionalString('folder'),
  body('folder').custom(isFolder).withMessage('Invalid media folder'),
];

export default { listMediaValidation, uploadMediaValidation, updateMediaValidation };
