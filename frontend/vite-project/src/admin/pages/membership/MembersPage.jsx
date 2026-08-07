import { useMemo, useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { Trash2, Eye, CheckCircle2, XCircle, Download } from 'lucide-react';
import { PageHeader } from '../../components/ui/PageHeader';
import { DataTable, ActionMenu } from '../../components/ui/DataTable';
import { SearchInput } from '../../components/ui/SearchInput';
import Button from '../../components/ui/Button';
import { StatusBadge } from '../../components/ui/Badge';
import { Avatar } from '../../components/ui/Avatar';
import { ConfirmDialog } from '../../components/ui/ConfirmDialog';
import { MemberDetailModal } from './MemberDetailModal';
import { membershipService } from '../../services/membership.service';
import { useListQuery } from '../../hooks/useListQuery';
import { getErrorMessage } from '../../utils/api';
import { downloadTextFile } from '../../utils/helpers';
import { formatDate } from '../../utils/format';
import { FilterSelect, FilterBar } from '../../components/ui/FilterSelect';
import { MEMBERSHIP_STATUSES } from '../../constants/options';
import { usePageMeta } from '../../hooks/usePageMeta';

const escapeCsv = (value) => {
  const text = String(value ?? '');
  if (/[",\n]/.test(text)) return `"${text.replace(/"/g, '""')}"`;
  return text;
};

export const MembersPage = () => {
  usePageMeta('Membership');
  const queryClient = useQueryClient();
  const [deleting, setDeleting] = useState(null);
  const [viewing, setViewing] = useState(null);
  const [exporting, setExporting] = useState(false);

  const list = useListQuery({
    key: 'members',
    fetcher: (params) => membershipService.list(params),
    initialLimit: 10,
  });

  const invalidate = () => {
    queryClient.invalidateQueries({ queryKey: ['members'] });
    queryClient.invalidateQueries({ queryKey: ['dashboard', 'full'] });
  };

  const deleteMutation = useMutation({
    mutationFn: (id) => membershipService.remove(id),
    onSuccess: () => {
      toast.success('Member removed');
      invalidate();
    },
    onError: (error) => toast.error(getErrorMessage(error)),
  });

  const approveMutation = useMutation({
    mutationFn: (id) => membershipService.approve(id),
    onSuccess: () => {
      toast.success('Member approved');
      invalidate();
    },
    onError: (error) => toast.error(getErrorMessage(error)),
  });

  const rejectMutation = useMutation({
    mutationFn: (id) => membershipService.reject(id),
    onSuccess: () => {
      toast.success('Member rejected');
      invalidate();
    },
    onError: (error) => toast.error(getErrorMessage(error)),
  });

  const statusMutation = useMutation({
    mutationFn: ({ id, status }) => membershipService.changeStatus(id, status),
    onSuccess: (_, vars) => {
      toast.success(`Member marked ${vars.status}`);
      invalidate();
    },
    onError: (error) => toast.error(getErrorMessage(error)),
  });

  const { refetch: refetchAll } = useQuery({
    queryKey: ['members', 'export'],
    queryFn: () => membershipService.list({ limit: 1000 }),
    enabled: false,
  });

  const handleExport = async () => {
    setExporting(true);
    try {
      const { items } = await refetchAll();
      const rows = items || [];
      const header = ['fullName', 'amharicName', 'baptismName', 'email', 'phone', 'city', 'status', 'createdAt'];
      const lines = [
        header.join(','),
        ...rows.map((m) =>
          [
            escapeCsv(m.fullName),
            escapeCsv(m.amharicName),
            escapeCsv(m.baptismName),
            escapeCsv(m.email),
            escapeCsv(m.phone),
            escapeCsv(m.address?.city),
            escapeCsv(m.status),
            escapeCsv(formatDate(m.createdAt)),
          ].join(',')
        ),
      ];
      downloadTextFile(lines.join('\n'), `members-${new Date().toISOString().slice(0, 10)}.csv`);
      toast.success(`Exported ${rows.length} members`);
    } catch (error) {
      toast.error(getErrorMessage(error));
    } finally {
      setExporting(false);
    }
  };

  const columns = useMemo(
    () => [
      {
        key: 'fullName',
        header: 'Member',
        render: (row) => (
          <div className="flex items-center gap-3">
            <Avatar name={row.fullName} size="md" />
            <div>
              <p className="font-medium text-gray-900 dark:text-gray-100">{row.fullName}</p>
              <p className="text-xs text-gray-400">{row.baptismName || row.amharicName || row.email || '—'}</p>
            </div>
          </div>
        ),
      },
      {
        key: 'phone',
        header: 'Contact',
        render: (row) => (
          <div className="text-xs text-gray-500 dark:text-gray-400">
            <p>{row.phone || '—'}</p>
            <p className="text-gray-400">{row.email || ''}</p>
          </div>
        ),
      },
      {
        key: 'city',
        header: 'City',
        render: (row) => <span className="text-sm text-gray-600 dark:text-gray-300">{row.address?.city || '—'}</span>,
      },
      {
        key: 'status',
        header: 'Status',
        render: (row) => <StatusBadge status={row.status} />,
      },
      {
        key: 'createdAt',
        header: 'Registered',
        sortable: true,
        render: (row) => <span className="text-xs text-gray-500 dark:text-gray-400">{formatDate(row.createdAt)}</span>,
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
              ...(row.status === 'pending'
                ? [
                    {
                      label: 'Approve',
                      icon: CheckCircle2,
                      onClick: (r) => approveMutation.mutate(r._id),
                    },
                    {
                      label: 'Reject',
                      icon: XCircle,
                      danger: true,
                      onClick: (r) => rejectMutation.mutate(r._id),
                    },
                  ]
                : MEMBERSHIP_STATUSES.filter((s) => s !== row.status).map((s) => ({
                    label: `Mark ${s}`,
                    onClick: (r) => statusMutation.mutate({ id: r._id, status: s }),
                  }))),
              {
                label: 'Delete',
                icon: Trash2,
                danger: true,
                onClick: (r) => setDeleting(r),
              },
            ]}
          />
        ),
      },
    ],
    [approveMutation, rejectMutation, statusMutation]
  );

  return (
    <div>
      <PageHeader
        title="Membership"
        subtitle="Review applications and manage church members"
        breadcrumbs={[{ label: 'Membership' }]}
        actions={
          <Button variant="secondary" onClick={handleExport} loading={exporting}>
            <Download className="h-4 w-4" />
            Export CSV
          </Button>
        }
      />

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
              placeholder="Search members…"
              className="w-full sm:w-72"
            />
            <FilterBar>
              <FilterSelect
                label="Status"
                value={list.filters.status}
                onChange={(v) => list.setFilter('status', v)}
                options={MEMBERSHIP_STATUSES}
              />
            </FilterBar>
          </>
        }
        emptyTitle="No members found"
        emptyDescription="Membership applications submitted through the website will appear here."
      />

      <MemberDetailModal open={Boolean(viewing)} onClose={() => setViewing(null)} member={viewing} />

      <ConfirmDialog
        open={Boolean(deleting)}
        onClose={() => setDeleting(null)}
        onConfirm={() => deleting && deleteMutation.mutate(deleting._id)}
        title="Remove member"
        description={`Remove ${deleting?.fullName} from the membership records? This action cannot be undone.`}
        confirmLabel="Remove"
        loading={deleteMutation.isPending}
      />
    </div>
  );
};

export default MembersPage;
