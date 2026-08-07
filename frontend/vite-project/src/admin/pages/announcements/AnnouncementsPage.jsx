import { useMemo, useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { Plus, Pencil, Trash2, Megaphone, Eye, EyeOff, Star } from 'lucide-react';
import { PageHeader } from '../../components/ui/PageHeader';
import { DataTable, ActionMenu } from '../../components/ui/DataTable';
import { SearchInput } from '../../components/ui/SearchInput';
import Button from '../../components/ui/Button';
import { ConfirmDialog } from '../../components/ui/ConfirmDialog';
import { PriorityBadge, Badge } from '../../components/ui/Badge';
import { AnnouncementFormModal } from './AnnouncementFormModal';
import { announcementService } from '../../services/announcement.service';
import { useListQuery } from '../../hooks/useListQuery';
import { getErrorMessage } from '../../utils/api';
import { formatDate, stripHtml } from '../../utils/format';
import { FilterSelect, FilterBar } from '../../components/ui/FilterSelect';
import { ANNOUNCEMENT_PRIORITIES } from '../../constants/options';
import { usePageMeta } from '../../hooks/usePageMeta';

export const AnnouncementsPage = () => {
  usePageMeta('Announcements');
  const queryClient = useQueryClient();
  const [formOpen, setFormOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [deleting, setDeleting] = useState(null);

  const list = useListQuery({
    key: 'announcements',
    fetcher: (params) => announcementService.list(params),
    initialLimit: 10,
  });

  const invalidate = () => {
    queryClient.invalidateQueries({ queryKey: ['announcements'] });
    queryClient.invalidateQueries({ queryKey: ['dashboard', 'full'] });
  };

  const createMutation = useMutation({
    mutationFn: (payload) => announcementService.create(payload),
    onSuccess: () => {
      toast.success('Announcement created');
      invalidate();
      setFormOpen(false);
    },
    onError: (error) => toast.error(getErrorMessage(error)),
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, payload }) => announcementService.update(id, payload),
    onSuccess: () => {
      toast.success('Announcement updated');
      invalidate();
      setFormOpen(false);
    },
    onError: (error) => toast.error(getErrorMessage(error)),
  });

  const deleteMutation = useMutation({
    mutationFn: (id) => announcementService.remove(id),
    onSuccess: () => {
      toast.success('Announcement deleted');
      invalidate();
    },
    onError: (error) => toast.error(getErrorMessage(error)),
  });

  const publishMutation = useMutation({
    mutationFn: ({ id, isPublished }) => announcementService.togglePublish(id, isPublished),
    onSuccess: (_, vars) => {
      toast.success(vars.isPublished ? 'Announcement published' : 'Announcement unpublished');
      invalidate();
    },
    onError: (error) => toast.error(getErrorMessage(error)),
  });

  const columns = useMemo(
    () => [
      {
        key: 'title',
        header: 'Announcement',
        sortable: true,
        render: (row) => (
          <div>
            <p className="font-medium text-gray-900 dark:text-gray-100">{row.title}</p>
            <p className="mt-0.5 line-clamp-1 max-w-md text-xs text-gray-400">{stripHtml(row.description)}</p>
          </div>
        ),
      },
      {
        key: 'priority',
        header: 'Priority',
        render: (row) => <PriorityBadge priority={row.priority} />,
      },
      {
        key: 'startDate',
        header: 'Schedule',
        render: (row) => (
          <div className="text-xs text-gray-500 dark:text-gray-400">
            <p>{formatDate(row.startDate)}</p>
            {row.endDate && <p className="text-gray-400">until {formatDate(row.endDate)}</p>}
          </div>
        ),
      },
      {
        key: 'isPublished',
        header: 'Status',
        render: (row) => (
          <Badge tone={row.isPublished ? 'success' : 'neutral'}>
            {row.isPublished ? 'Published' : 'Draft'}
          </Badge>
        ),
      },
      {
        key: 'createdAt',
        header: 'Created',
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
                label: row.isPublished ? 'Unpublish' : 'Publish',
                icon: row.isPublished ? EyeOff : Eye,
                onClick: (r) => publishMutation.mutate({ id: r._id, isPublished: !r.isPublished }),
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
    [publishMutation]
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
        title="Announcements"
        subtitle="Create and manage church announcements"
        breadcrumbs={[{ label: 'Announcements' }]}
        actions={
          <Button onClick={() => { setEditing(null); setFormOpen(true); }}>
            <Plus className="h-4 w-4" />
            New Announcement
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
        sortBy={list.filters.sortBy}
        order={list.filters.order}
        onSort={(sortBy, order) => {
          list.setFilter('sortBy', sortBy);
          list.setFilter('order', order);
        }}
        toolbar={
          <>
            <SearchInput
              value={list.searchInput}
              onChange={list.setSearchInput}
              placeholder="Search announcements…"
              className="w-full sm:w-72"
            />
            <FilterBar>
              <FilterSelect
                label="Priority"
                value={list.filters.priority}
                onChange={(v) => list.setFilter('priority', v)}
                options={ANNOUNCEMENT_PRIORITIES}
              />
              <FilterSelect
                label="Status"
                value={list.filters.isPublished}
                onChange={(v) => list.setFilter('isPublished', v === 'true' ? 'true' : undefined)}
                options={[{ value: 'true', label: 'Published' }]}
              />
            </FilterBar>
          </>
        }
        emptyTitle="No announcements found"
        emptyDescription="Create your first announcement to get started."
        emptyAction={
          <Button onClick={() => { setEditing(null); setFormOpen(true); }}>
            <Plus className="h-4 w-4" /> Create announcement
          </Button>
        }
      />

      <AnnouncementFormModal
        open={formOpen}
        onClose={() => setFormOpen(false)}
        announcement={editing}
        onSubmit={handleFormSubmit}
        submitting={createMutation.isPending || updateMutation.isPending}
      />

      <ConfirmDialog
        open={Boolean(deleting)}
        onClose={() => setDeleting(null)}
        onConfirm={() => deleting && deleteMutation.mutate(deleting._id)}
        title="Delete announcement"
        description={`Are you sure you want to delete "${deleting?.title}"? This action cannot be undone.`}
        confirmLabel="Delete"
        loading={deleteMutation.isPending}
      />
    </div>
  );
};

export default AnnouncementsPage;
