import { body } from 'express-validator';
import { EVENT_CATEGORIES, EVENT_STATUSES } from '../constants/index.js';
import {
  requiredString,
  optionalString,
  enumValidator,
  booleanValidator,
  numberValidator,
  optionalDateValidator,
  requiredDateValidator,
  paginationValidators,
  optionalEmailValidator,
} from './common.validators.js';

export const createEventValidation = [
  requiredString('title', 'Title', { max: 250 }),
  optionalString('titleAm', { max: 250 }),
  optionalString('description'),
  optionalString('descriptionAm'),
  requiredDateValidator('date'),
  optionalString('startTime', { max: 20 }),
  optionalString('endTime', { max: 20 }),
  optionalString('location', { max: 200 }),
  enumValidator('category', EVENT_CATEGORIES),
  numberValidator('capacity', { min: 0 }),
  booleanValidator('isFeatured'),
  enumValidator('status', EVENT_STATUSES),
];

export const updateEventValidation = [
  optionalString('title', { max: 250 }),
  optionalString('titleAm', { max: 250 }),
  optionalString('description'),
  optionalString('descriptionAm'),
  optionalDateValidator('date'),
  optionalString('startTime', { max: 20 }),
  optionalString('endTime', { max: 20 }),
  optionalString('location', { max: 200 }),
  enumValidator('category', EVENT_CATEGORIES),
  numberValidator('capacity', { min: 0 }),
  booleanValidator('isFeatured'),
  enumValidator('status', EVENT_STATUSES),
];

export const rsvpValidation = [
  requiredString('name', 'Name', { max: 150 }),
  optionalEmailValidator('email'),
  optionalString('phone', { max: 20 }),
  numberValidator('guests', { min: 0, max: 10 }),
  enumValidator('status', ['confirmed', 'pending', 'cancelled']),
];

export const listEventsValidation = [
  ...paginationValidators,
  enumValidator('category', EVENT_CATEGORIES),
  enumValidator('status', EVENT_STATUSES),
];

export const changeStatusValidation = [
  body('status').isIn(EVENT_STATUSES).withMessage(`status must be one of: ${EVENT_STATUSES.join(', ')}`),
];

export default {
  createEventValidation,
  updateEventValidation,
  rsvpValidation,
  listEventsValidation,
  changeStatusValidation,
};
