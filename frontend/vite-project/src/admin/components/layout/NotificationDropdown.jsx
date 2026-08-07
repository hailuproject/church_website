import { useQuery } from '@tanstack/react-query';
import { Bell, Inbox, Church, Activity } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Dropdown, DropdownItem, DropdownHeader, DropdownDivider } from '../ui/Dropdown';
import { useAuth } from '../../context/AuthContext';
import { contactService } from '../../services/donation.service';
import { sacramentService } from '../../services/membership.service';
import { Badge } from '../ui/Badge';
import { cn } from '../../utils/helpers';

export const NotificationDropdown = () => {
  const navigate = useNavigate();
  const { hasPermission } = useAuth();

  const canContact = hasPermission('manage:contact');
  const canSacrament = hasPermission('manage:sacraments');

  const { data: messages } = useQuery({
    queryKey: ['inbox', 'unread', 'count'],
    queryFn: async () => {
      const result = await contactService.listMessages({ limit: 1, isRead: false, page: 1 });
      return result.pagination?.total || 0;
    },
    enabled: canContact,
    refetchInterval: 60 * 1000,
  });

  const { data: pendingSacraments } = useQuery({
    queryKey: ['sacraments', 'pending', 'count'],
    queryFn: async () => {
      const result = await sacramentService.list({ limit: 1, status: 'pending', page: 1 });
      return result.pagination?.total || 0;
    },
    enabled: canSacrament,
    refetchInterval: 60 * 1000,
  });

  const total = (messages || 0) + (pendingSacraments || 0);

  return (
    <Dropdown
      width="w-80"
      trigger={
        <button
          type="button"
          className="relative rounded-lg p-2 text-gray-500 transition-colors hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
          aria-label="Notifications"
        >
          <Bell className="h-5 w-5" />
          {total > 0 && (
            <span className="absolute -right-0.5 -top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-red-500 px-1 text-[10px] font-bold text-white">
              {total > 99 ? '99+' : total}
            </span>
          )}
        </button>
      }
    >
      <DropdownHeader>
        <p className="text-sm font-semibold text-gray-900 dark:text-gray-100">Notifications</p>
      </DropdownHeader>
      <div className="max-h-80 overflow-y-auto">
        {canContact && (
          <DropdownItem icon={Inbox} onClick={() => navigate('/admin/contact-inbox')}>
            <div className="flex flex-1 items-center justify-between gap-2">
              <span className="flex items-center gap-1">
                Inbox
                {messages > 0 && <Badge tone="danger">{messages}</Badge>}
              </span>
            </div>
          </DropdownItem>
        )}
        {canSacrament && (
          <DropdownItem icon={Church} onClick={() => navigate('/sacraments?status=pending')}>
            <div className="flex flex-1 items-center justify-between gap-2">
              <span>Pending sacrament requests</span>
              <Badge tone={pendingSacraments > 0 ? 'warning' : 'success'}>{pendingSacraments || 0}</Badge>
            </div>
          </DropdownItem>
        )}
        {canContact && (
          <DropdownItem icon={Activity} onClick={() => navigate('/admin/dashboard')}>
            Dashboard analytics
          </DropdownItem>
        )}
      </div>
      <DropdownDivider />
      <DropdownItem onClick={() => navigate('/admin/dashboard')} className="justify-center text-center font-medium text-primary-600 dark:text-primary-400">
        View dashboard
      </DropdownItem>
    </Dropdown>
  );
};

export default NotificationDropdown;
