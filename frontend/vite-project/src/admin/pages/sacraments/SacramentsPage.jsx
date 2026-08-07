import { useMemo, useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { Trash2, UserRound, Cross, Eye } from 'lucide-react';
import { PageHeader } from '../../components/ui/PageHeader';
import { DataTable, ActionMenu } from '../../components/ui/DataTable';
import { SearchInput } from '../../components/ui/SearchInput';
import Button from '../../components/ui/Button';
import { StatusBadge } from '../../components/ui/Badge';
import { ConfirmDialog } from '../../components/ui/ConfirmDialog';
import { AssignPriestModal } from './AssignPriestModal';
import { SacramentDetailModal } from './SacramentDetailModal';
import { sacramentService } from '../../services/membership.service';
import { useListQuery } from '../../hooks/useListQuery';
import { getErrorMessage } from '../../utils/api';
import { formatDate } from '../../utils/format';
import { FilterSelect, FilterBar } from '../../components/ui/FilterSelect';
import { SACRAMENT_TYPES, SACRAMENT_STATUSES } from '../../constants/options';
import { usePageMeta } from '../../hooks/usePageMeta';

export const SacramentsPage = () => {
  usePageMeta('Sacraments');
  const queryClient = useQueryClient();
  const [deleting, setDeleting] = useState(null);
  const [assigning, setAssigning] = useState(null);
  const [viewing, setViewing] = useState(null);

  const list = useListQuery({
    key: 'sacraments',
    fetcher: (params) => sacramentService.list(params),
    initialLimit: 10,
  });

  const invalidate = () => {
    queryClient.invalidateQueries({ queryKey: ['sacraments'] });
    queryClient.invalidateQueries({ queryKey: ['dashboard', 'full'] });
  };

  const deleteMutation = useMutation({
    mutationFn: (id) => sacramentService.remove(id),
    onSuccess: () => {
      toast.success('Request deleted');
      invalidate();
    },
    onError: (error) => toast.error(getErrorMessage(error)),
  });

  const statusMutation = useMutation({
    mutationFn: ({ id, status }) => sacramentService.changeStatus(id, status),
    onSuccess: (_, vars) => {
      toast.success(`Request marked ${vars.status}`);
      invalidate();
    },
    onError: (error) => toast.error(getErrorMessage(error)),
  });

  const assignMutation = useMutation({
    mutationFn: ({ id, priestId }) => sacramentService.assignPriest(id, priestId),
    onSuccess: () => {
      toast.success('Priest assigned and request scheduled');
      invalidate();
      setAssigning(null);
    },
    onError: (error) => toast.error(getErrorMessage(error)),
  });

  const priestName = (row) => {
    const priest = row.assignedPriest;
    if (!priest) return null;
    if (typeof priest === 'string') return priest.slice(0, 8);
    return priest.name || priest.role || 'Assigned';
  };

  const columns = useMemo(
    () => [
      {
        key: 'type',
        header: 'Sacrament',
        render: (row) => (
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary-50 text-primary-500 dark:bg-primary-500/10">
              <Cross className="h-5 w-5" />
            </div>
            <div>
              <p className="font-medium text-gray-900 dark:text-gray-100">{row.type}</p>
              <p className="text-xs text-gray-400">{row.memberName}</p>
            </div>
          </div>
        ),
      },
      {
        key: 'preferredDate',
        header: 'Preferred date',
        render: (row) => (
          <span className="text-sm text-gray-600 dark:text-gray-300">{formatDate(row.preferredDate)}</span>
        ),
      },
      {
        key: 'contact',
        header: 'Contact',
        render: (row) => (
          <div className="text-xs text-gray-500 dark:text-gray-400">
            <p>{row.phone || '—'}</p>
            <p className="text-gray-400">{row.email || ''}</p>
          </div>
        ),
      },
      {
        key: 'assignedPriest',
        header: 'Priest',
        render: (row) =>
          priestName(row) ? (
            <span className="inline-flex items-center gap-1.5 text-sm text-gray-600 dark:text-gray-300">
              <UserRound className="h-3.5 w-3.5 text-gray-400" />
              {priestName(row)}
            </span>
          ) : (
            <span className="text-xs text-gray-400">Unassigned</span>
          ),
      },
      {
        key: 'status',
        header: 'Status',
        render: (row) => <StatusBadge status={row.status} />,
      },
      {
        key: 'createdAt',
        header: 'Received',
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
              {
                label: 'Assign priest',
                icon: UserRound,
                onClick: (r) => setAssigning(r),
              },
              ...SACRAMENT_STATUSES.filter((s) => s !== row.status && s !== 'scheduled').map((s) => ({
                label: `Mark ${s}`,
                onClick: (r) => statusMutation.mutate({ id: r._id, status: s }),
              })),
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
    [statusMutation]
  );

  return (
    <div>
      <PageHeader
        title="Sacrament Requests"
        subtitle="Manage baptism, matrimony, confession, and other requests"
        breadcrumbs={[{ label: 'Sacraments' }]}
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
              placeholder="Search requests…"
              className="w-full sm:w-72"
            />
            <FilterBar>
              <FilterSelect
                label="Type"
                value={list.filters.type}
                onChange={(v) => list.setFilter('type', v)}
                options={SACRAMENT_TYPES}
              />
              <FilterSelect
                label="Status"
                value={list.filters.status}
                onChange={(v) => list.setFilter('status', v)}
                options={SACRAMENT_STATUSES}
              />
            </FilterBar>
          </>
        }
        emptyTitle="No sacrament requests"
        emptyDescription="Requests submitted through the website will appear here."
      />

      <SacramentDetailModal open={Boolean(viewing)} onClose={() => setViewing(null)} request={viewing} />
      <AssignPriestModal
        open={Boolean(assigning)}
        onClose={() => setAssigning(null)}
        request={assigning}
        onAssign={(priestId) => assignMutation.mutate({ id: assigning._id, priestId })}
        submitting={assignMutation.isPending}
      />

      <ConfirmDialog
        open={Boolean(deleting)}
        onClose={() => setDeleting(null)}
        onConfirm={() => deleting && deleteMutation.mutate(deleting._id)}
        title="Delete request"
        description={`Delete the ${deleting?.type} request for ${deleting?.memberName}? This action cannot be undone.`}
        confirmLabel="Delete"
        loading={deleteMutation.isPending}
      />
    </div>
  );
};

export default SacramentsPage;
