import { useMemo, useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { Plus, Pencil, Trash2, Users } from 'lucide-react';
import { PageHeader } from '../../components/ui/PageHeader';
import { DataTable, ActionMenu } from '../../components/ui/DataTable';
import { SearchInput } from '../../components/ui/SearchInput';
import Button from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { Avatar } from '../../components/ui/Avatar';
import { ConfirmDialog } from '../../components/ui/ConfirmDialog';
import { LeaderFormModal } from './LeaderFormModal';
import { leadershipService } from '../../services/content.service';
import { useListQuery } from '../../hooks/useListQuery';
import { getErrorMessage } from '../../utils/api';
import { FilterSelect, FilterBar } from '../../components/ui/FilterSelect';
import { LEADERSHIP_ROLES } from '../../constants/options';
import { usePageMeta } from '../../hooks/usePageMeta';

export const LeadershipPage = () => {
  usePageMeta('Leadership');
  const queryClient = useQueryClient();
  const [formOpen, setFormOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [deleting, setDeleting] = useState(null);

  const list = useListQuery({
    key: 'leadership',
    fetcher: (params) => leadershipService.list(params),
    initialLimit: 10,
  });

  const invalidate = () => queryClient.invalidateQueries({ queryKey: ['leadership'] });

  const createMutation = useMutation({
    mutationFn: (payload) => leadershipService.create(payload),
    onSuccess: () => {
      toast.success('Leader added');
      invalidate();
      setFormOpen(false);
    },
    onError: (error) => toast.error(getErrorMessage(error)),
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, payload }) => leadershipService.update(id, payload),
    onSuccess: () => {
      toast.success('Leader updated');
      invalidate();
      setFormOpen(false);
    },
    onError: (error) => toast.error(getErrorMessage(error)),
  });

  const deleteMutation = useMutation({
    mutationFn: (id) => leadershipService.remove(id),
    onSuccess: () => {
      toast.success('Leader removed');
      invalidate();
    },
    onError: (error) => toast.error(getErrorMessage(error)),
  });

  const toggleMutation = useMutation({
    mutationFn: ({ id, isActive }) => leadershipService.update(id, { isActive }),
    onSuccess: (_, vars) => {
      toast.success(vars.isActive ? 'Leader is now visible' : 'Leader hidden');
      invalidate();
    },
    onError: (error) => toast.error(getErrorMessage(error)),
  });

  const columns = useMemo(
    () => [
      {
        key: 'name',
        header: 'Member',
        render: (row) => (
          <div className="flex items-center gap-3">
            <Avatar name={row.name} src={row.photo?.url} size="md" />
            <div>
              <p className="font-medium text-gray-900 dark:text-gray-100">{row.name}</p>
              <p className="text-xs text-gray-400">{row.nameAm || row.title || row.titleAm || '—'}</p>
            </div>
          </div>
        ),
      },
      {
        key: 'role',
        header: 'Role',
        sortable: true,
        render: (row) => <Badge tone="info">{row.role}</Badge>,
      },
      {
        key: 'title',
        header: 'Title',
        render: (row) => <span className="text-sm text-gray-600 dark:text-gray-300">{row.title || '—'}</span>,
      },
      {
        key: 'isActive',
        header: 'Status',
        render: (row) => <Badge tone={row.isActive ? 'success' : 'neutral'}>{row.isActive ? 'Visible' : 'Hidden'}</Badge>,
      },
      {
        key: 'order',
        header: 'Order',
        render: (row) => <span className="text-xs text-gray-500 dark:text-gray-400">{row.order ?? 0}</span>,
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
                label: row.isActive ? 'Hide' : 'Show',
                onClick: (r) => toggleMutation.mutate({ id: r._id, isActive: !r.isActive }),
              },
              {
                label: 'Edit',
                icon: Pencil,
                onClick: (r) => {
                  setEditing(r);
                  setFormOpen(true);
                },
              },
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
    [toggleMutation]
  );

  const handleFormSubmit = (payload) => {
    if (editing?._id) {
      updateMutation.mutate({ id: editing._id, payload });
    } else {
      createMutation.mutate(payload);
    }
  };

  return (
    <div>
      <PageHeader
        title="Leadership"
        subtitle="Manage clergy and church leadership team"
        breadcrumbs={[{ label: 'Leadership' }]}
        actions={
          <Button onClick={() => { setEditing(null); setFormOpen(true); }}>
            <Plus className="h-4 w-4" />
            Add Leader
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
              placeholder="Search leaders…"
              className="w-full sm:w-72"
            />
            <FilterBar>
              <FilterSelect
                label="Role"
                value={list.filters.role}
                onChange={(v) => list.setFilter('role', v)}
                options={LEADERSHIP_ROLES}
              />
              <FilterSelect
                label="Status"
                value={list.filters.isActive}
                onChange={(v) => list.setFilter('isActive', v === 'true' ? 'true' : undefined)}
                options={[{ value: 'true', label: 'Visible' }]}
              />
            </FilterBar>
          </>
        }
        emptyTitle="No leaders found"
        emptyDescription="Add members of the clergy and leadership team."
        emptyAction={
          <Button onClick={() => { setEditing(null); setFormOpen(true); }}>
            <Plus className="h-4 w-4" /> Add leader
          </Button>
        }
      />

      <LeaderFormModal
        open={formOpen}
        onClose={() => setFormOpen(false)}
        leader={editing}
        onSubmit={handleFormSubmit}
        submitting={createMutation.isPending || updateMutation.isPending}
      />

      <ConfirmDialog
        open={Boolean(deleting)}
        onClose={() => setDeleting(null)}
        onConfirm={() => deleting && deleteMutation.mutate(deleting._id)}
        title="Remove leader"
        description={`Remove ${deleting?.name} from the leadership team? This action cannot be undone.`}
        confirmLabel="Remove"
        loading={deleteMutation.isPending}
      />
    </div>
  );
};

export default LeadershipPage;
