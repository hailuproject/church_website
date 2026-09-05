import { useMemo, useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { Plus, Pencil, Trash2, BookOpen, Eye, EyeOff, UploadCloud, Download } from 'lucide-react';
import { PageHeader } from '../../components/ui/PageHeader';
import { DataTable, ActionMenu } from '../../components/ui/DataTable';
import { SearchInput } from '../../components/ui/SearchInput';
import Button from '../../components/ui/Button';
import { Badge, StatusBadge } from '../../components/ui/Badge';
import { ConfirmDialog } from '../../components/ui/ConfirmDialog';
import { ResourceFormModal } from './ResourceFormModal';
import { ResourceMediaModal } from './ResourceMediaModal';
import { resourceService } from '../../services/resource.service';
import { useListQuery } from '../../hooks/useListQuery';
import { getErrorMessage } from '../../utils/api';
import { formatDate, formatNumber, stripHtml } from '../../utils/format';
import { FilterSelect, FilterBar } from '../../components/ui/FilterSelect';
import { RESOURCE_CATEGORIES, RESOURCE_LANGUAGES } from '../../constants/options';
import { usePageMeta } from '../../hooks/usePageMeta';

export const ResourcesPage = () => {
  usePageMeta('Resources');
  const queryClient = useQueryClient();
  const [formOpen, setFormOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [deleting, setDeleting] = useState(null);
  const [mediaResource, setMediaResource] = useState(null);

  const list = useListQuery({
    key: 'resources',
    fetcher: (params) => resourceService.list(params),
    initialLimit: 10,
  });

  const invalidate = () => {
    queryClient.invalidateQueries({ queryKey: ['resources'] });
    queryClient.invalidateQueries({ queryKey: ['dashboard', 'overview'] });
  };

  const createMutation = useMutation({
    mutationFn: (payload) => resourceService.create(payload),
    onSuccess: () => {
      toast.success('Resource created');
      invalidate();
      setFormOpen(false);
    },
    onError: (error) => toast.error(getErrorMessage(error)),
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, payload }) => resourceService.update(id, payload),
    onSuccess: () => {
      toast.success('Resource updated');
      invalidate();
      setFormOpen(false);
    },
    onError: (error) => toast.error(getErrorMessage(error)),
  });

  const deleteMutation = useMutation({
    mutationFn: (id) => resourceService.remove(id),
    onSuccess: () => {
      toast.success('Resource deleted');
      invalidate();
    },
    onError: (error) => toast.error(getErrorMessage(error)),
  });

  const mediaMutation = useMutation({
    mutationFn: async ({ id, pdf, thumbnail }) => {
      if (pdf) await resourceService.uploadPdf(id, pdf);
      if (thumbnail) await resourceService.uploadThumbnail(id, thumbnail);
    },
    onSuccess: () => {
      toast.success('Files uploaded');
      invalidate();
      setMediaResource(null);
    },
    onError: (error) => toast.error(getErrorMessage(error)),
  });

  const columns = useMemo(
    () => [
      {
        key: 'title',
        header: 'Resource',
        render: (row) => (
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-primary-50 text-primary-500 dark:bg-primary-500/10">
              {row.thumbnail?.url ? (
                <img src={row.thumbnail.url} alt="" className="h-full w-full rounded-lg object-cover" loading="lazy" />
              ) : (
                <BookOpen className="h-5 w-5" />
              )}
            </div>
            <div className="min-w-0">
              <p className="font-medium text-gray-900 dark:text-gray-100">{row.title}</p>
              <p className="mt-0.5 line-clamp-1 max-w-md text-xs text-gray-400">{stripHtml(row.description)}</p>
            </div>
          </div>
        ),
      },
      {
        key: 'category',
        header: 'Category',
        sortable: true,
        render: (row) => <span className="text-sm text-gray-600 dark:text-gray-300">{row.category}</span>,
      },
      {
        key: 'language',
        header: 'Language',
        render: (row) => <Badge tone="neutral">{row.language}</Badge>,
      },
      {
        key: 'downloads',
        header: 'Downloads',
        render: (row) => (
          <span className="inline-flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
            <Download className="h-3.5 w-3.5" />
            {formatNumber(row.downloads)}
          </span>
        ),
      },
      {
        key: 'isPublished',
        header: 'Status',
        render: (row) => <StatusBadge status={row.isPublished ? 'Published' : 'Draft'} />,
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
                label: 'Upload files',
                icon: UploadCloud,
                onClick: (r) => setMediaResource(r),
              },
              {
                label: row.isPublished ? 'Unpublish' : 'Publish',
                icon: row.isPublished ? EyeOff : Eye,
                onClick: (r) => updateMutation.mutate({ id: r._id, payload: { isPublished: !r.isPublished } }),
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
    [updateMutation]
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
        title="Resources"
        subtitle="Manage downloadable books, prayers, and documents"
        breadcrumbs={[{ label: 'Resources' }]}
        actions={
          <Button onClick={() => { setEditing(null); setFormOpen(true); }}>
            <Plus className="h-4 w-4" />
            New Resource
          </Button>
        }
      />

      <DataTable
        columns={columns}
        data={list.items}
        loading={list.isLoading}
        error={list.error}
        onRetry={list.refetch}
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
              placeholder="Search resources…"
              className="w-full sm:w-72"
            />
            <FilterBar>
              <FilterSelect
                label="Category"
                value={list.filters.category}
                onChange={(v) => list.setFilter('category', v)}
                options={RESOURCE_CATEGORIES}
              />
              <FilterSelect
                label="Language"
                value={list.filters.language}
                onChange={(v) => list.setFilter('language', v)}
                options={RESOURCE_LANGUAGES}
              />
              <FilterSelect
                label="Status"
                value={list.filters.isPublished}
                onChange={(v) =>
                  list.setFilter(
                    'isPublished',
                    v === 'true' ? 'true' : v === 'false' ? 'false' : undefined
                  )
                }
                options={[
                  { value: 'true', label: 'Published' },
                  { value: 'false', label: 'Draft' },
                ]}
              />
            </FilterBar>
          </>
        }
        emptyTitle="No resources found"
        emptyDescription="Add books and documents to share with the community."
        emptyAction={
          <Button onClick={() => { setEditing(null); setFormOpen(true); }}>
            <Plus className="h-4 w-4" /> Create resource
          </Button>
        }
      />

      <ResourceFormModal
        open={formOpen}
        onClose={() => setFormOpen(false)}
        resource={editing}
        onSubmit={handleFormSubmit}
        submitting={createMutation.isPending || updateMutation.isPending}
      />

      <ResourceMediaModal
        open={Boolean(mediaResource)}
        onClose={() => setMediaResource(null)}
        resource={mediaResource}
        submitting={mediaMutation.isPending}
        onUpload={(files) => mediaMutation.mutate({ id: mediaResource._id, ...files })}
      />

      <ConfirmDialog
        open={Boolean(deleting)}
        onClose={() => setDeleting(null)}
        onConfirm={() => deleting && deleteMutation.mutate(deleting._id)}
        title="Delete resource"
        description={`Delete "${deleting?.title}" and its uploaded file? This action cannot be undone.`}
        confirmLabel="Delete"
        loading={deleteMutation.isPending}
      />
    </div>
  );
};

export default ResourcesPage;
