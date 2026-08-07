import { CONTACT_CATEGORIES, CONTACT_STATUSES } from '../constants/index.js';
import {
  requiredString,
  optionalString,
  enumValidator,
  optionalEmailValidator,
  emailValidator,
  phoneValidator,
  booleanValidator,
  paginationValidators,
} from './common.validators.js';

export const submitContactValidation = [
  requiredString('name', 'Name', { max: 150 }),
  emailValidator('email'),
  phoneValidator('phone'),
  requiredString('subject', 'Subject', { max: 200 }),
  requiredString('message', 'Message'),
  enumValidator('category', CONTACT_CATEGORIES),
];

export const replyValidation = [
  requiredString('reply', 'Reply'),
];

export const listMessagesValidation = [
  ...paginationValidators,
  enumValidator('category', CONTACT_CATEGORIES),
  enumValidator('status', CONTACT_STATUSES),
];

export const createPrayerRequestValidation = [
  requiredString('name', 'Name', { max: 150 }).optional({ nullable: true, checkFalsy: true }),
  optionalEmailValidator('email'),
  phoneValidator('phone'),
  enumValidator('prayerType', CONTACT_CATEGORIES),
  requiredString('request', 'Prayer request', { max: 2000 }),
  booleanValidator('isConfidential'),
];

export const updatePrayerRequestValidation = [
  optionalString('name', { max: 150 }),
  optionalEmailValidator('email'),
  phoneValidator('phone'),
  enumValidator('status', ['new', 'prayed', 'answered', 'closed']),
  optionalString('request', { max: 2000 }),
];

export const listPrayersValidation = [
  ...paginationValidators,
  enumValidator('status', ['new', 'prayed', 'answered', 'closed']),
];

export default {
  submitContactValidation,
  replyValidation,
  listMessagesValidation,
  createPrayerRequestValidation,
  updatePrayerRequestValidation,
  listPrayersValidation,
};
