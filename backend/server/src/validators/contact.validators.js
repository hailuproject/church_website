import { CONTACT_CATEGORIES, CONTACT_STATUSES } from '../constants/index.js';
import {
  requiredString,
  enumValidator,
  optionalEmailValidator,
  phoneValidator,
  noCrLfValidator,
  paginationValidators,
} from './common.validators.js';

export const submitContactValidation = [
  noCrLfValidator('name'),
  requiredString('name', 'Name', { max: 150 }),
  optionalEmailValidator('email'),
  noCrLfValidator('phone'),
  phoneValidator('phone'),
  noCrLfValidator('subject'),
  requiredString('subject', 'Subject', { max: 200 }),
  requiredString('message', 'Message', { max: 5000 })
    .bail()
    .custom((value) => !value.includes('\r'))
    .withMessage('Message must not contain carriage returns'),
  enumValidator('category', CONTACT_CATEGORIES),
];

export const replyValidation = [
  requiredString('reply', 'Reply', { max: 5000 }),
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
