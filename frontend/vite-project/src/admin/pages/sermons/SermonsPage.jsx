import { useMemo, useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { Plus, Pencil, Trash2, Mic2, Star, Eye, EyeOff, UploadCloud } from 'lucide-react';
import { PageHeader } from '../../components/ui/PageHeader';
import { DataTable, ActionMenu } from '../../components/ui/DataTable';
import { SearchInput } from '../../components/ui/SearchInput';
import Button from '../../components/ui/Button';
import { Badge, StatusBadge } from '../../components/ui/Badge';
import { ConfirmDialog } from '../../components/ui/ConfirmDialog';
import { SermonFormModal } from './SermonFormModal';
import { SermonMediaModal } from './SermonMediaModal';
import { sermonService } from '../../services/sermon.service';
import { useListQuery } from '../../hooks/useListQuery';
import { getErrorMessage } from '../../utils/api';
import { formatDate, stripHtml, formatDuration } from '../../utils/format';
import { FilterSelect, FilterBar } from '../../components/ui/FilterSelect';
import { SERMON_CATEGORIES, SERMON_LANGUAGES } from '../../constants/options';
import { usePageMeta } from '../../hooks/usePageMeta';

export const SermonsPage = () => {
  usePageMeta('Sermons');
  const queryClient = useQueryClient();
  const [formOpen, setFormOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [deleting, setDeleting] = useState(null);
  const [mediaSermon, setMediaSermon] = useState(null);

  const list = useListQuery({
    key: 'sermons',
    fetcher: (params) => sermonService.list(params),
    initialLimit: 10,
  });

  const invalidate = () => {
    queryClient.invalidateQueries({ queryKey: ['sermons'] });
    queryClient.invalidateQueries({ queryKey: ['dashboard', 'full'] });
  };

  const createMutation = useMutation({
    mutationFn: (payload) => sermonService.create(payload),
    onSuccess: () => {
      toast.success('Sermon created');
      invalidate();
      setFormOpen(false);
    },
    onError: (error) => toast.error(getErrorMessage(error)),
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, payload }) => sermonService.update(id, payload),
    onSuccess: () => {
      toast.success('Sermon updated');
      invalidate();
      setFormOpen(false);
    },
    onError: (error) => toast.error(getErrorMessage(error)),
  });

  const deleteMutation = useMutation({
    mutationFn: (id) => sermonService.remove(id),
    onSuccess: () => {
      toast.success('Sermon deleted');
      invalidate();
    },
    onError: (error) => toast.error(getErrorMessage(error)),
  });

  const publishMutation = useMutation({
    mutationFn: ({ id, isPublished }) => sermonService.togglePublish(id, isPublished),
    onSuccess: (_, vars) => {
      toast.success(vars.isPublished ? 'Sermon published' : 'Sermon unpublished');
      invalidate();
    },
    onError: (error) => toast.error(getErrorMessage(error)),
  });

  const featureMutation = useMutation({
    mutationFn: ({ id, isFeatured }) => sermonService.toggleFeatured(id, isFeatured),
    onSuccess: (_, vars) => {
      toast.success(vars.isFeatured ? 'Sermon featured' : 'Sermon unfeatured');
      invalidate();
    },
    onError: (error) => toast.error(getErrorMessage(error)),
  });

  const mediaMutation = useMutation({
    mutationFn: async ({ id, audio, video, thumbnail }) => {
      if (audio) await sermonService.uploadAudio(id, audio);
      if (video) await sermonService.uploadVideo(id, video);
      if (thumbnail) await sermonService.uploadThumbnail(id, thumbnail);
    },
    onSuccess: () => {
      toast.success('Media uploaded');
      invalidate();
      setMediaSermon(null);
    },
    onError: (error) => toast.error(getErrorMessage(error)),
  });

  const columns = useMemo(
    () => [
      {
        key: 'title',
        header: 'Sermon',
        render: (row) => (
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-16 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-gray-100 dark:bg-gray-700">
              {row.thumbnail?.url ? (
                <img src={row.thumbnail.url} alt="" className="h-full w-full object-cover" loading="lazy" />
              ) : (
                <Mic2 className="h-5 w-5 text-gray-400" />
              )}
            </div>
            <div className="min-w-0">
              <p className="font-medium text-gray-900 dark:text-gray-100">{row.title}</p>
              <p className="mt-0.5 line-clamp-1 max-w-md text-xs text-gray-400">
                {row.speaker ? `${row.speaker} · ` : ''}{stripHtml(row.description)}
              </p>
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
        key: 'duration',
        header: 'Duration',
        render: (row) => <span className="text-xs text-gray-500 dark:text-gray-400">{formatDuration(row.duration)}</span>,
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
        key: 'isPublished',
        header: 'Status',
        render: (row) => (
          <StatusBadge status={row.isPublished ? 'Published' : 'Draft'} />
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
                label: 'Upload media',
                icon: UploadCloud,
                onClick: (r) => setMediaSermon(r),
              },
              {
                label: row.isPublished ? 'Unpublish' : 'Publish',
                icon: row.isPublished ? EyeOff : Eye,
                onClick: (r) => publishMutation.mutate({ id: r._id, isPublished: !r.isPublished }),
              },
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
    [publishMutation, featureMutation]
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
        title="Sermons"
        subtitle="Manage sermon recordings, videos, and notes"
        breadcrumbs={[{ label: 'Sermons' }]}
        actions={
          <Button onClick={() => { setEditing(null); setFormOpen(true); }}>
            <Plus className="h-4 w-4" />
            New Sermon
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
              placeholder="Search sermons…"
              className="w-full sm:w-72"
            />
            <FilterBar>
              <FilterSelect
                label="Category"
                value={list.filters.category}
                onChange={(v) => list.setFilter('category', v)}
                options={SERMON_CATEGORIES}
              />
              <FilterSelect
                label="Language"
                value={list.filters.language}
                onChange={(v) => list.setFilter('language', v)}
                options={SERMON_LANGUAGES}
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
        emptyTitle="No sermons found"
        emptyDescription="Add your first sermon to start sharing teachings."
        emptyAction={
          <Button onClick={() => { setEditing(null); setFormOpen(true); }}>
            <Plus className="h-4 w-4" /> Create sermon
          </Button>
        }
      />

      <SermonFormModal
        open={formOpen}
        onClose={() => setFormOpen(false)}
        sermon={editing}
        onSubmit={handleFormSubmit}
        submitting={createMutation.isPending || updateMutation.isPending}
      />

      <SermonMediaModal
        open={Boolean(mediaSermon)}
        onClose={() => setMediaSermon(null)}
        sermon={mediaSermon}
        submitting={mediaMutation.isPending}
        onUpload={(files) => mediaMutation.mutate({ id: mediaSermon._id, ...files })}
      />

      <ConfirmDialog
        open={Boolean(deleting)}
        onClose={() => setDeleting(null)}
        onConfirm={() => deleting && deleteMutation.mutate(deleting._id)}
        title="Delete sermon"
        description={`Delete "${deleting?.title}" and its uploaded media? This action cannot be undone.`}
        confirmLabel="Delete"
        loading={deleteMutation.isPending}
      />
    </div>
  );
};

export default SermonsPage;
