import { NavLink, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronDown, X } from 'lucide-react';
import { useState } from 'react';
import { getNavItemsForRole, LOGOUT_ITEM } from '../../constants/navigation';
import { useAuth } from '../../context/AuthContext';
import { cn } from '../../utils/helpers';

const SidebarLink = ({ item, collapsed }) => {
  const location = useLocation();
  const isActive = location.pathname === item.path || location.pathname.startsWith(`${item.path}/`);
  const Icon = item.icon;

  return (
    <NavLink
      to={item.path}
      className={cn(
        'group flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors',
        isActive
          ? 'bg-primary-500/10 text-primary-700 dark:bg-primary-500/15 dark:text-primary-300'
          : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-gray-100'
      )}
      title={item.label}
    >
      <Icon className={cn('h-5 w-5 shrink-0', isActive ? 'text-primary-500' : 'text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-300')} />
      {!collapsed && <span className="truncate">{item.label}</span>}
    </NavLink>
  );
};

export const SidebarContent = ({ collapsed, onNavigate }) => {
  const { user, logout } = useAuth();
  const sections = getNavItemsForRole(user?.role);

  return (
    <div className="flex h-full flex-col">
      <div className={cn('flex h-16 shrink-0 items-center gap-3 border-b border-gray-200 px-4 dark:border-gray-700', collapsed && 'justify-center px-2')}>
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary-500 text-sm font-bold text-white">
          EOTC
        </div>
        {!collapsed && (
          <div className="min-w-0">
            <p className="truncate text-sm font-bold text-gray-900 dark:text-gray-50">Church CMS</p>
            <p className="truncate text-xs text-gray-400">Admin Dashboard</p>
          </div>
        )}
      </div>

      <nav className="flex-1 space-y-5 overflow-y-auto px-3 py-4">
        {sections.map((section) => (
          <div key={section.label}>
            {!collapsed && (
              <p className="mb-1.5 px-3 text-[11px] font-semibold uppercase tracking-wider text-gray-400 dark:text-gray-500">
                {section.label}
              </p>
            )}
            <div className="space-y-0.5">
              {section.items.map((item) => (
                <SidebarLink key={item.path} item={item} collapsed={collapsed} />
              ))}
            </div>
          </div>
        ))}
      </nav>

      <div className="shrink-0 border-t border-gray-200 p-3 dark:border-gray-700">
        <button
          type="button"
          onClick={logout}
          className={cn(
            'flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-red-600 transition-colors hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-500/10',
            collapsed && 'justify-center px-0'
          )}
          title="Logout"
        >
          <LOGOUT_ITEM.icon className="h-5 w-5 shrink-0" />
          {!collapsed && <span>Logout</span>}
        </button>
      </div>
    </div>
  );
};

export const Sidebar = ({ collapsed, onToggleCollapsed }) => (
  <aside
    className={cn(
      'hidden h-screen shrink-0 flex-col border-r border-gray-200 bg-white transition-all duration-300 dark:border-gray-700 dark:bg-gray-800 lg:flex',
      collapsed ? 'w-[76px]' : 'w-64'
    )}
  >
    <SidebarContent collapsed={collapsed} />
  </aside>
);

export const MobileDrawer = ({ open, onClose }) => (
  <AnimatePresence>
    {open && (
      <div className="fixed inset-0 z-40 lg:hidden">
        <motion.div
          className="fixed inset-0 bg-gray-900/50 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        />
        <motion.div
          className="fixed inset-y-0 left-0 z-10 w-72 bg-white shadow-xl dark:bg-gray-800"
          initial={{ x: -288 }}
          animate={{ x: 0 }}
          exit={{ x: -288 }}
          transition={{ type: 'spring', damping: 30, stiffness: 300 }}
        >
          <button
            type="button"
            onClick={onClose}
            className="absolute right-3 top-4 rounded-lg p-1 text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700"
            aria-label="Close menu"
          >
            <X className="h-5 w-5" />
          </button>
          <SidebarContent onNavigate={onClose} />
        </motion.div>
      </div>
    )}
  </AnimatePresence>
);

export default Sidebar;
