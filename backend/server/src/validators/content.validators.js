import { body, param } from 'express-validator';
import { CONTENT_KEYS } from '../constants/index.js';

export const keyValidator = (field = 'key') =>
  param(field)
    .trim()
    .toLowerCase()
    .isIn(CONTENT_KEYS)
    .withMessage(`key must be one of: ${CONTENT_KEYS.join(', ')}`);

export const updateContentValidation = [
  body('data')
    .isObject()
    .withMessage('data must be an object'),
];

export default {
  keyValidator,
  updateContentValidation,
};
