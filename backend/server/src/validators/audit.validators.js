import { paginationValidators, enumValidator } from './common.validators.js';
import { AUDIT_ACTIONS } from '../constants/index.js';

export const listAuditValidation = [
  ...paginationValidators,
  enumValidator('action', AUDIT_ACTIONS),
  enumValidator('module', [
    'auth', 'users', 'content', 'sermons', 'events', 'gallery', 'resources',
    'donations', 'contact', 'settings', 'media', 'audit-logs',
  ]),
];

export default { listAuditValidation };
