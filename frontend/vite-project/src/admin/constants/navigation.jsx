import {
  LayoutDashboard,
  Mic,
  CalendarDays,
  BookOpen,
  Inbox,
  HeartHandshake,
  Settings,
  ShieldCheck,
  ScrollText,
  LogOut,
} from 'lucide-react';
import { ROLES } from './options';

export const NAV_SECTIONS = [
  {
    label: '',
    items: [
      {
        label: 'Dashboard',
        path: '/admin/dashboard',
        icon: LayoutDashboard,
        roles: Object.values(ROLES),
      },
    ],
  },
  {
    label: 'Content',
    items: [
      {
        label: 'Sermons',
        path: '/admin/sermons',
        icon: Mic,
        roles: [ROLES.SUPER_ADMIN, ROLES.ADMIN, ROLES.PRIEST],
      },
      {
        label: 'Events',
        path: '/admin/events',
        icon: CalendarDays,
        roles: [ROLES.SUPER_ADMIN, ROLES.ADMIN, ROLES.PRIEST, ROLES.DEACON],
      },
      {
        label: 'Resources',
        path: '/admin/resources',
        icon: BookOpen,
        roles: [ROLES.SUPER_ADMIN, ROLES.ADMIN, ROLES.DEACON],
      },
    ],
  },
  {
    label: 'Communication',
    items: [
      {
        label: 'Messages',
        path: '/admin/messages',
        icon: Inbox,
        roles: [ROLES.SUPER_ADMIN, ROLES.ADMIN, ROLES.SECRETARY],
      },
      {
        label: 'Donations',
        path: '/admin/donations',
        icon: HeartHandshake,
        roles: [ROLES.SUPER_ADMIN, ROLES.ADMIN, ROLES.SECRETARY],
      },
    ],
  },
  {
    label: 'System',
    items: [
      {
        label: 'Settings',
        path: '/admin/settings',
        icon: Settings,
        roles: [ROLES.SUPER_ADMIN, ROLES.ADMIN],
      },
      {
        label: 'Users',
        path: '/admin/users',
        icon: ShieldCheck,
        roles: [ROLES.SUPER_ADMIN, ROLES.ADMIN],
      },
      {
        label: 'Audit Logs',
        path: '/admin/audit-logs',
        icon: ScrollText,
        roles: [ROLES.SUPER_ADMIN, ROLES.ADMIN],
      },
    ],
  },
];

export const LOGOUT_ITEM = {
  label: 'Logout',
  path: '/admin/logout',
  icon: LogOut,
};

export const getNavItemsForRole = (role) => {
  return NAV_SECTIONS.map((section) => ({
    ...section,
    items: section.items.filter((item) => item.roles.includes(role)),
  })).filter((section) => section.items.length > 0);
};

export const PAGE_TITLES = {
  '/admin/dashboard': 'Dashboard',
  '/admin/sermons': 'Sermons',
  '/admin/events': 'Events',
  '/admin/resources': 'Resources',
  '/admin/messages': 'Messages',
  '/admin/donations': 'Donations',
  '/admin/settings': 'Settings',
  '/admin/users': 'Users',
  '/admin/audit-logs': 'Audit Logs',
  '/admin/profile': 'Profile',
};
