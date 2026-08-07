import { body } from 'express-validator';
import { ANNOUNCEMENT_PRIORITIES } from '../constants/index.js';
import {
  requiredString,
  optionalString,
  enumValidator,
  booleanValidator,
  optionalDateValidator,
  paginationValidators,
} from './common.validators.js';

export const createAnnouncementValidation = [
  requiredString('title', 'Title', { max: 200 }),
  optionalString('titleAm', { max: 200 }),
  requiredString('description', 'Description'),
  optionalString('descriptionAm'),
  enumValidator('priority', ANNOUNCEMENT_PRIORITIES),
  optionalDateValidator('startDate'),
  optionalDateValidator('endDate'),
  booleanValidator('isPublished'),
];

export const updateAnnouncementValidation = [
  optionalString('title', { max: 200 }),
  optionalString('titleAm', { max: 200 }),
  optionalString('description'),
  optionalString('descriptionAm'),
  enumValidator('priority', ANNOUNCEMENT_PRIORITIES),
  optionalDateValidator('startDate'),
  optionalDateValidator('endDate'),
  booleanValidator('isPublished'),
];

export const listAnnouncementsValidation = [
  ...paginationValidators,
  enumValidator('priority', ANNOUNCEMENT_PRIORITIES),
];

export const togglePublishValidation = [
  body('isPublished').isBoolean().withMessage('isPublished must be a boolean'),
];

export default {
  createAnnouncementValidation,
  updateAnnouncementValidation,
  listAnnouncementsValidation,
  togglePublishValidation,
};
