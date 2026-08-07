import { paginationValidators, enumValidator } from './common.validators.js';
import { AUDIT_ACTIONS } from '../constants/index.js';

export const listAuditValidation = [
  ...paginationValidators,
  enumValidator('action', AUDIT_ACTIONS),
  enumValidator('module', [
    'auth', 'users', 'media', 'announcements', 'sermons', 'events', 'gallery', 'resources',
    'membership', 'donations', 'contact', 'prayers', 'home', 'about', 'leadership',
    'settings', 'languages', 'sacraments', 'audit-logs',
  ]),
];

export default { listAuditValidation };
