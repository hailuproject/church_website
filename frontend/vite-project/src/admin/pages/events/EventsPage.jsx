import { useMemo, useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { Plus, Pencil, Trash2, Star, CalendarDays } from 'lucide-react';
import { PageHeader } from '../../components/ui/PageHeader';
import { DataTable, ActionMenu } from '../../components/ui/DataTable';
import { SearchInput } from '../../components/ui/SearchInput';
import Button from '../../components/ui/Button';
import { StatusBadge } from '../../components/ui/Badge';
import { ConfirmDialog } from '../../components/ui/ConfirmDialog';
import { EventFormModal } from './EventFormModal';
import { eventService } from '../../services/event.service';
import { useListQuery } from '../../hooks/useListQuery';
import { getErrorMessage } from '../../utils/api';
import { formatDate } from '../../utils/format';
import { FilterSelect, FilterBar } from '../../components/ui/FilterSelect';
import { EVENT_CATEGORIES, EVENT_STATUSES } from '../../constants/options';
import { usePageMeta } from '../../hooks/usePageMeta';

export const EventsPage = () => {
  usePageMeta('Events');
  const queryClient = useQueryClient();
  const [formOpen, setFormOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [deleting, setDeleting] = useState(null);

  const list = useListQuery({
    key: 'events',
    fetcher: (params) => eventService.list(params),
    initialLimit: 10,
  });

  const invalidate = () => {
    queryClient.invalidateQueries({ queryKey: ['events'] });
    queryClient.invalidateQueries({ queryKey: ['dashboard', 'full'] });
  };

  const createMutation = useMutation({
    mutationFn: (payload) => eventService.create(payload),
    onSuccess: () => {
      toast.success('Event created');
      invalidate();
      setFormOpen(false);
    },
    onError: (error) => toast.error(getErrorMessage(error)),
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, payload }) => eventService.update(id, payload),
    onSuccess: () => {
      toast.success('Event updated');
      invalidate();
      setFormOpen(false);
    },
    onError: (error) => toast.error(getErrorMessage(error)),
  });

  const deleteMutation = useMutation({
    mutationFn: (id) => eventService.remove(id),
    onSuccess: () => {
      toast.success('Event deleted');
      invalidate();
    },
    onError: (error) => toast.error(getErrorMessage(error)),
  });

  const featureMutation = useMutation({
    mutationFn: ({ id, isFeatured }) => eventService.toggleFeatured(id, isFeatured),
    onSuccess: (_, vars) => {
      toast.success(vars.isFeatured ? 'Event featured' : 'Event unfeatured');
      invalidate();
    },
    onError: (error) => toast.error(getErrorMessage(error)),
  });

  const statusMutation = useMutation({
    mutationFn: ({ id, status }) => eventService.changeStatus(id, status),
    onSuccess: () => {
      toast.success('Event status updated');
      invalidate();
    },
    onError: (error) => toast.error(getErrorMessage(error)),
  });

  const columns = useMemo(
    () => [
      {
        key: 'title',
        header: 'Event',
        render: (row) => (
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-primary-50 text-primary-500 dark:bg-primary-500/10">
              <CalendarDays className="h-5 w-5" />
            </div>
            <div>
              <p className="font-medium text-gray-900 dark:text-gray-100">{row.title}</p>
              <p className="text-xs text-gray-400">{row.titleAm || row.location || '—'}</p>
            </div>
          </div>
        ),
      },
      {
        key: 'date',
        header: 'Date & time',
        sortable: true,
        render: (row) => (
          <div className="text-xs text-gray-500 dark:text-gray-400">
            <p>{formatDate(row.date, 'MMM d, yyyy')}</p>
            {(row.startTime || row.endTime) && (
              <p className="text-gray-400">{row.startTime || '—'}{row.endTime ? ` – ${row.endTime}` : ''}</p>
            )}
          </div>
        ),
      },
      {
        key: 'category',
        header: 'Category',
        render: (row) => <span className="text-sm text-gray-600 dark:text-gray-300">{row.category}</span>,
      },
      {
        key: 'status',
        header: 'Status',
        render: (row) => <StatusBadge status={row.status} />,
      },
      {
        key: 'isFeatured',
        header: 'Featured',
        render: (row) =>
          row.isFeatured ? (
            <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
          ) : (
            <Star className="h-4 w-4 text-gray-300 dark:text-gray-600" />
          ),
      },
      {
        key: 'actions',
        header: '',
        align: 'right',
        render: (row) => (
          <ActionMenu
            row={row}
            items={[
              ...EVENT_STATUSES.filter((s) => s !== row.status).map((s) => ({
                label: `Mark ${s}`,
                onClick: (r) => statusMutation.mutate({ id: r._id, status: s }),
              })),
              {
                label: row.isFeatured ? 'Remove featured' : 'Feature',
                icon: Star,
                onClick: (r) => featureMutation.mutate({ id: r._id, isFeatured: !r.isFeatured }),
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
    [statusMutation, featureMutation]
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
        title="Events"
        subtitle="Manage church events, services, and RSVPs"
        breadcrumbs={[{ label: 'Events' }]}
        actions={
          <Button onClick={() => { setEditing(null); setFormOpen(true); }}>
            <Plus className="h-4 w-4" />
            New Event
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
              placeholder="Search events…"
              className="w-full sm:w-72"
            />
            <FilterBar>
              <FilterSelect
                label="Category"
                value={list.filters.category}
                onChange={(v) => list.setFilter('category', v)}
                options={EVENT_CATEGORIES}
              />
              <FilterSelect
                label="Status"
                value={list.filters.status}
                onChange={(v) => list.setFilter('status', v)}
                options={EVENT_STATUSES}
              />
            </FilterBar>
          </>
        }
        emptyTitle="No events found"
        emptyDescription="Create your first event to share it with the community."
        emptyAction={
          <Button onClick={() => { setEditing(null); setFormOpen(true); }}>
            <Plus className="h-4 w-4" /> Create event
          </Button>
        }
      />

      <EventFormModal
        open={formOpen}
        onClose={() => setFormOpen(false)}
        event={editing}
        onSubmit={handleFormSubmit}
        submitting={createMutation.isPending || updateMutation.isPending}
      />

      <ConfirmDialog
        open={Boolean(deleting)}
        onClose={() => setDeleting(null)}
        onConfirm={() => deleting && deleteMutation.mutate(deleting._id)}
        title="Delete event"
        description={`Delete "${deleting?.title}" and its RSVPs? This action cannot be undone.`}
        confirmLabel="Delete"
        loading={deleteMutation.isPending}
      />
    </div>
  );
};

export default EventsPage;
