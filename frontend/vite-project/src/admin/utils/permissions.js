import { ROLES } from '../constants/options';

export const ROLE_PERMISSIONS = {
  [ROLES.SUPER_ADMIN]: ['*'],
  [ROLES.ADMIN]: ['*'],
  [ROLES.PRIEST]: [
    'view:analytics',
    'manage:sermons',
    'manage:events',
    'manage:content',
  ],
  [ROLES.SECRETARY]: [
    'view:analytics',
    'manage:donations',
    'manage:contact',
    'manage:content',
  ],
  [ROLES.DEACON]: [
    'view:analytics',
    'manage:resources',
    'manage:events',
    'manage:content',
    'manage:gallery',
  ],
};

const ROUTE_PERMISSIONS = {
  '/dashboard': 'view:analytics',
  '/pages': 'manage:content',
  '/gallery': 'manage:gallery',
  '/sermons': 'manage:sermons',
  '/events': 'manage:events',
  '/resources': 'manage:resources',
  '/donations': 'manage:donations',
  '/messages': 'manage:contact',
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

const HOME_ROUTES = [
  '/dashboard',
  '/pages',
  '/gallery',
  '/events',
  '/sermons',
  '/resources',
  '/donations',
  '/messages',
];

export const getHomePath = (role) => {
  const accessible = HOME_ROUTES.find((route) => canAccessRoute(role, route));
  return accessible ? `/admin${accessible}` : '/admin/profile';
};
