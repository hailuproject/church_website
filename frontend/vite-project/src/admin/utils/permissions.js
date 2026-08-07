import { ROLES } from '../constants/options';

export const ROLE_PERMISSIONS = {
  [ROLES.SUPER_ADMIN]: ['*'],
  [ROLES.ADMIN]: ['*'],
  [ROLES.PRIEST]: [
    'manage:announcements',
    'manage:sermons',
    'manage:sacraments',
    'manage:events',
    'view:analytics',
  ],
  [ROLES.SECRETARY]: [
    'manage:membership',
    'manage:donations',
    'manage:contact',
    'view:analytics',
  ],
  [ROLES.DEACON]: [
    'manage:gallery',
    'manage:resources',
    'manage:events',
  ],
};

const ROUTE_PERMISSIONS = {
  '/dashboard': 'view:analytics',
  '/announcements': 'manage:announcements',
  '/home-content': 'manage:home',
  '/about': 'manage:about',
  '/leadership': 'manage:leadership',
  '/sermons': 'manage:sermons',
  '/events': 'manage:events',
  '/sacraments': 'manage:sacraments',
  '/gallery': 'manage:gallery',
  '/resources': 'manage:resources',
  '/membership': 'manage:membership',
  '/donations': 'manage:donations',
  '/contact-inbox': 'manage:contact',
  '/users': 'manage:users',
  '/settings': 'manage:settings',
  '/audit-logs': 'view:audit-logs',
  '/profile': '*',
};

export const canAccessRoute = (role, pathname) => {
  if (!role) return false;
  const permission = ROUTE_PERMISSIONS[pathname] ?? '*';
  if (permission === '*') return true;
  const allowed = ROLE_PERMISSIONS[role] || [];
  return allowed.includes('*') || allowed.includes(permission);
};

export const hasPermission = (role, permission) => {
  if (!role) return false;
  const allowed = ROLE_PERMISSIONS[role] || [];
  return allowed.includes('*') || allowed.includes(permission);
};
