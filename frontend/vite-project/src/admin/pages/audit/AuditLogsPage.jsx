import { useMemo, useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { Activity, Eye, Trash2, ScrollText } from 'lucide-react';
import { PageHeader } from '../../components/ui/PageHeader';
import { DataTable, ActionMenu } from '../../components/ui/DataTable';
import { SearchInput } from '../../components/ui/SearchInput';
import Button from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { FilterSelect, FilterBar } from '../../components/ui/FilterSelect';
import { ConfirmDialog } from '../../components/ui/ConfirmDialog';
import { StatCard } from '../../components/ui/StatCard';
import { AuditLogDetailModal } from './AuditLogDetailModal';
import { auditService } from '../../services/system.service';
import { useListQuery } from '../../hooks/useListQuery';
import { useAuth } from '../../context/AuthContext';
import { getErrorMessage } from '../../utils/api';
import { formatDateTime } from '../../utils/format';
import { AUDIT_ACTIONS, ROLES } from '../../constants/options';
import { usePageMeta } from '../../hooks/usePageMeta';

const ACTION_TONES = {
  login: 'info',
  logout: 'neutral',
  create: 'success',
  update: 'info',
  delete: 'danger',
  register: 'success',
  approve: 'success',
  reject: 'danger',
  'status-change': 'warning',
  upload: 'info',
  download: 'info',
  send: 'info',
};

const MODULES = [
  'auth', 'users', 'media', 'announcements', 'sermons', 'events', 'gallery', 'resources',
  'membership', 'donations', 'contact', 'prayers', 'home', 'about', 'leadership',
  'settings', 'languages', 'sacraments', 'audit-logs',
];

export const AuditLogsPage = () => {
  usePageMeta('Audit Logs');
  const queryClient = useQueryClient();
  const { user } = useAuth();
  const isSuperAdmin = user?.role === ROLES.SUPER_ADMIN;

  const [viewing, setViewing] = useState(null);
  const [clearing, setClearing] = useState(false);

  const list = useListQuery({
    key: 'audit-logs',
    fetcher: (params) => auditService.list(params),
    initialLimit: 15,
  });

  const { data: summary } = useQuery({
    queryKey: ['audit-logs', 'summary'],
    queryFn: () => auditService.getSummary(),
  });

  const clearMutation = useMutation({
    mutationFn: () => auditService.clearOld(),
    onSuccess: () => {
      toast.success('Old audit logs cleared');
      setClearing(false);
      queryClient.invalidateQueries({ queryKey: ['audit-logs'] });
    },
    onError: (error) => toast.error(getErrorMessage(error)),
  });

  const columns = useMemo(
    () => [
      {
        key: 'adminName',
        header: 'Admin',
        render: (row) => (
          <div>
            <p className="font-medium text-gray-900 dark:text-gray-100">{row.adminName || '—'}</p>
            {row.adminRole && <p className="text-xs text-gray-400">{row.adminRole}</p>}
          </div>
        ),
      },
      {
        key: 'action',
        header: 'Action',
        render: (row) => <Badge tone={ACTION_TONES[row.action] || 'neutral'}>{row.action}</Badge>,
      },
      {
        key: 'module',
        header: 'Module',
        render: (row) => (
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{row.module || '—'}</span>
        ),
      },
      {
        key: 'createdAt',
        header: 'Time',
        sortable: true,
        render: (row) => <span className="text-xs text-gray-500 dark:text-gray-400">{formatDateTime(row.createdAt)}</span>,
      },
      {
        key: 'ipAddress',
        header: 'IP',
        render: (row) => <span className="text-xs text-gray-500 dark:text-gray-400">{row.ipAddress || '—'}</span>,
      },
      {
        key: 'actions',
        header: '',
        align: 'right',
        render: (row) => (
          <ActionMenu
            row={row}
            items={[
              {
                label: 'View details',
                icon: Eye,
                onClick: (r) => setViewing(r),
              },
            ]}
          />
        ),
      },
    ],
    []
  );

  return (
    <div>
      <PageHeader
        title="Audit Logs"
        subtitle="A record of every action taken in the dashboard"
        breadcrumbs={[{ label: 'Audit Logs' }]}
        actions={
          isSuperAdmin ? (
            <Button variant="danger" onClick={() => setClearing(true)}>
              <Trash2 className="h-4 w-4" />
              Clear old logs
            </Button>
          ) : null
        }
      />

      {summary && (
        <div className="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard title="Total entries" value={summary.total ?? 0} icon={ScrollText} />
          <StatCard title="Top module" value={summary.byModule?.[0]?._id || '—'} icon={Activity} />
          <StatCard title="Top action" value={summary.byAction?.[0]?._id || '—'} icon={Activity} />
          <StatCard title="Unique modules" value={summary.byModule?.length ?? 0} icon={Activity} />
        </div>
      )}

      <DataTable
        columns={columns}
        data={list.items}
        loading={list.isLoading}
        pagination={list.pagination}
        onPageChange={list.setPage}
        onLimitChange={list.setLimit}
        toolbar={
          <>
            <SearchInput
              value={list.searchInput}
              onChange={list.setSearchInput}
              placeholder="Search logs…"
              className="w-full sm:w-72"
            />
            <FilterBar>
              <FilterSelect
                label="Action"
                value={list.filters.action}
                onChange={(v) => list.setFilter('action', v)}
                options={AUDIT_ACTIONS}
              />
              <FilterSelect
                label="Module"
                value={list.filters.module}
                onChange={(v) => list.setFilter('module', v)}
                options={MODULES}
              />
            </FilterBar>
          </>
        }
        emptyTitle="No audit entries found"
        emptyDescription="Actions performed in the dashboard will be recorded here."
      />

      <AuditLogDetailModal open={Boolean(viewing)} onClose={() => setViewing(null)} log={viewing} />

      <ConfirmDialog
        open={clearing}
        onClose={() => setClearing(false)}
        onConfirm={() => clearMutation.mutate()}
        title="Clear audit logs"
        description="Permanently delete old audit log entries? This action cannot be undone."
        confirmLabel="Clear logs"
        loading={clearMutation.isPending}
      />
    </div>
  );
};

export default AuditLogsPage;
