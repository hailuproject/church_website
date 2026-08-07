import { useNavigate } from 'react-router-dom';
import { ExternalLink, User, Settings, LogOut, ShieldCheck } from 'lucide-react';
import { Dropdown, DropdownItem, DropdownHeader, DropdownDivider } from '../ui/Dropdown';
import { Avatar } from '../ui/Avatar';
import { useAuth } from '../../context/AuthContext';

export const ProfileDropdown = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <Dropdown
      width="w-60"
      trigger={
        <button type="button" className="flex items-center gap-2 rounded-lg p-1.5 transition-colors hover:bg-gray-100 dark:hover:bg-gray-700" aria-label="Profile menu">
          <Avatar name={user?.name} src={user?.avatar} size="sm" />
        </button>
      }
    >
      <DropdownHeader>
        <p className="truncate text-sm font-semibold text-gray-900 dark:text-gray-100">{user?.name}</p>
        <p className="truncate text-xs text-gray-500 dark:text-gray-400">{user?.email}</p>
        <span className="mt-1.5 inline-flex items-center gap-1 rounded-full bg-primary-50 px-2 py-0.5 text-[11px] font-medium text-primary-700 dark:bg-primary-500/10 dark:text-primary-300">
          <ShieldCheck className="h-3 w-3" />
          {user?.role}
        </span>
      </DropdownHeader>
      <DropdownItem icon={User} onClick={() => navigate('/admin/profile')}>
        My Profile
      </DropdownItem>
      <DropdownItem icon={Settings} onClick={() => navigate('/admin/settings')}>
        Settings
      </DropdownItem>
      <DropdownItem icon={ExternalLink} onClick={() => navigate('/')}>
        View Website
      </DropdownItem>
      <DropdownDivider />
      <DropdownItem icon={LogOut} danger onClick={logout}>
        Logout
      </DropdownItem>
    </Dropdown>
  );
};

export default ProfileDropdown;
