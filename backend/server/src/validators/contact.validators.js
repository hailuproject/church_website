import { CONTACT_CATEGORIES, CONTACT_STATUSES } from '../constants/index.js';
import {
  requiredString,
  enumValidator,
  emailValidator,
  phoneValidator,
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

export default {
  submitContactValidation,
  replyValidation,
  listMessagesValidation,
};
