import {
  LayoutDashboard,
  Megaphone,
  Home,
  Info,
  Users,
  Mic,
  CalendarDays,
  Church,
  Images,
  BookOpen,
  UserPlus,
  HeartHandshake,
  Inbox,
  ShieldCheck,
  Settings,
  ScrollText,
  LogOut,
} from 'lucide-react';
import { ROLES } from './options';

export const NAV_SECTIONS = [
  {
    label: 'Main',
    items: [
      {
        label: 'Dashboard',
        path: '/admin/dashboard',
        icon: LayoutDashboard,
        roles: Object.values(ROLES),
      },
      {
        label: 'Announcements',
        path: '/admin/announcements',
        icon: Megaphone,
        roles: [ROLES.SUPER_ADMIN, ROLES.ADMIN, ROLES.PRIEST],
      },
      {
        label: 'Home Content',
        path: '/admin/home-content',
        icon: Home,
        roles: [ROLES.SUPER_ADMIN, ROLES.ADMIN],
      },
      {
        label: 'About',
        path: '/admin/about',
        icon: Info,
        roles: [ROLES.SUPER_ADMIN, ROLES.ADMIN],
      },
      {
        label: 'Leadership',
        path: '/admin/leadership',
        icon: Users,
        roles: [ROLES.SUPER_ADMIN, ROLES.ADMIN],
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
        label: 'Sacraments',
        path: '/admin/sacraments',
        icon: Church,
        roles: [ROLES.SUPER_ADMIN, ROLES.ADMIN, ROLES.PRIEST, ROLES.SECRETARY],
      },
      {
        label: 'Gallery',
        path: '/admin/gallery',
        icon: Images,
        roles: [ROLES.SUPER_ADMIN, ROLES.ADMIN, ROLES.DEACON],
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
    label: 'Community',
    items: [
      {
        label: 'Membership',
        path: '/admin/membership',
        icon: UserPlus,
        roles: [ROLES.SUPER_ADMIN, ROLES.ADMIN, ROLES.SECRETARY],
      },
      {
        label: 'Donations',
        path: '/admin/donations',
        icon: HeartHandshake,
        roles: [ROLES.SUPER_ADMIN, ROLES.ADMIN, ROLES.SECRETARY],
      },
      {
        label: 'Contact Inbox',
        path: '/admin/contact-inbox',
        icon: Inbox,
        roles: [ROLES.SUPER_ADMIN, ROLES.ADMIN, ROLES.SECRETARY],
      },
    ],
  },
  {
    label: 'System',
    items: [
      {
        label: 'Users',
        path: '/admin/users',
        icon: ShieldCheck,
        roles: [ROLES.SUPER_ADMIN, ROLES.ADMIN],
      },
      {
        label: 'Settings',
        path: '/admin/settings',
        icon: Settings,
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
  '/admin/announcements': 'Announcements',
  '/admin/home-content': 'Home Content',
  '/admin/about': 'About',
  '/admin/leadership': 'Leadership',
  '/admin/sermons': 'Sermons',
  '/admin/events': 'Events',
  '/admin/sacraments': 'Sacraments',
  '/admin/gallery': 'Gallery',
  '/admin/resources': 'Resources',
  '/admin/membership': 'Membership',
  '/admin/donations': 'Donations',
  '/admin/contact-inbox': 'Contact Inbox',
  '/admin/users': 'Users',
  '/admin/settings': 'Settings',
  '/admin/audit-logs': 'Audit Logs',
  '/admin/profile': 'Profile',
};
