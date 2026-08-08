import { param } from 'express-validator';
import { CONTENT_KEYS } from '../constants/index.js';

export const keyValidator = (field = 'key') =>
  param(field)
    .trim()
    .toLowerCase()
    .isIn(CONTENT_KEYS)
    .withMessage(`key must be one of: ${CONTENT_KEYS.join(', ')}`);

export default {
  keyValidator,
};
