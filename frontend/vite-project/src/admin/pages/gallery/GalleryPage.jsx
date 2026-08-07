import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { Plus, Pencil, Trash2, Images, Film, Eye } from 'lucide-react';
import { PageHeader } from '../../components/ui/PageHeader';
import Button from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { EmptyState } from '../../components/ui/EmptyState';
import { SearchInput } from '../../components/ui/SearchInput';
import { Skeleton } from '../../components/ui/Skeleton';
import { ConfirmDialog } from '../../components/ui/ConfirmDialog';
import { AlbumFormModal } from './AlbumFormModal';
import { AlbumDetailModal } from './AlbumDetailModal';
import { galleryService } from '../../services/gallery.service';
import { useListQuery } from '../../hooks/useListQuery';
import { getErrorMessage } from '../../utils/api';
import { FilterSelect, FilterBar } from '../../components/ui/FilterSelect';
import { GALLERY_CATEGORIES } from '../../constants/options';
import { usePageMeta } from '../../hooks/usePageMeta';

export const GalleryPage = () => {
  usePageMeta('Gallery');
  const queryClient = useQueryClient();
  const [formOpen, setFormOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [deleting, setDeleting] = useState(null);
  const [viewing, setViewing] = useState(null);

  const list = useListQuery({
    key: 'gallery',
    fetcher: (params) => galleryService.list(params),
    initialLimit: 12,
  });

  const invalidate = () => queryClient.invalidateQueries({ queryKey: ['gallery'] });

  const createMutation = useMutation({
    mutationFn: (payload) => galleryService.create(payload),
    onSuccess: () => {
      toast.success('Album created');
      invalidate();
      setFormOpen(false);
    },
    onError: (error) => toast.error(getErrorMessage(error)),
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, payload }) => galleryService.update(id, payload),
    onSuccess: () => {
      toast.success('Album updated');
      invalidate();
      setFormOpen(false);
    },
    onError: (error) => toast.error(getErrorMessage(error)),
  });

  const deleteMutation = useMutation({
    mutationFn: (id) => galleryService.remove(id),
    onSuccess: () => {
      toast.success('Album deleted');
      invalidate();
    },
    onError: (error) => toast.error(getErrorMessage(error)),
  });

  const uploadImagesMutation = useMutation({
    mutationFn: ({ id, files }) => galleryService.addImages(id, files),
    onSuccess: () => {
      toast.success('Photos uploaded');
      invalidate();
    },
    onError: (error) => toast.error(getErrorMessage(error)),
  });

  const uploadVideoMutation = useMutation({
    mutationFn: ({ id, file }) => galleryService.addVideo(id, file),
    onSuccess: () => {
      toast.success('Video uploaded');
      invalidate();
    },
    onError: (error) => toast.error(getErrorMessage(error)),
  });

  const removeImageMutation = useMutation({
    mutationFn: ({ id, mediaId }) => galleryService.removeImage(id, mediaId),
    onSuccess: () => {
      toast.success('Photo removed');
      invalidate();
    },
    onError: (error) => toast.error(getErrorMessage(error)),
  });

  const removeVideoMutation = useMutation({
    mutationFn: ({ id, mediaId }) => galleryService.removeVideo(id, mediaId),
    onSuccess: () => {
      toast.success('Video removed');
      invalidate();
    },
    onError: (error) => toast.error(getErrorMessage(error)),
  });

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
        title="Gallery"
        subtitle="Manage photo and video albums"
        breadcrumbs={[{ label: 'Gallery' }]}
        actions={
          <Button onClick={() => { setEditing(null); setFormOpen(true); }}>
            <Plus className="h-4 w-4" />
            New Album
          </Button>
        }
      />

      <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center">
        <SearchInput
          value={list.searchInput}
          onChange={list.setSearchInput}
          placeholder="Search albums…"
          className="w-full sm:w-72"
        />
        <FilterBar>
          <FilterSelect
            label="Category"
            value={list.filters.category}
            onChange={(v) => list.setFilter('category', v)}
            options={GALLERY_CATEGORIES}
          />
        </FilterBar>
      </div>

      {list.isLoading ? (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <Skeleton key={i} className="h-56 rounded-xl" />
          ))}
        </div>
      ) : list.items.length === 0 ? (
        <EmptyState
          icon={Images}
          title="No albums found"
          description="Create photo albums to share church moments."
          action={
            <Button onClick={() => { setEditing(null); setFormOpen(true); }}>
              <Plus className="h-4 w-4" /> Create album
            </Button>
          }
        />
      ) : (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {list.items.map((album) => (
            <div
              key={album._id}
              className="group overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition-shadow hover:shadow-md dark:border-gray-700 dark:bg-gray-800"
            >
              <button
                type="button"
                onClick={() => setViewing(album)}
                className="relative block h-40 w-full bg-gray-100 dark:bg-gray-700"
              >
                {album.coverImage?.url ? (
                  <img src={album.coverImage.url} alt="" className="h-full w-full object-cover" loading="lazy" />
                ) : (
                  <div className="flex h-full items-center justify-center text-gray-400">
                    <Images className="h-9 w-9" />
                  </div>
                )}
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-gray-900/70 to-transparent p-3">
                  <Badge tone="info">{album.category}</Badge>
                </div>
              </button>
              <div className="p-4">
                <h3 className="truncate text-sm font-semibold text-gray-900 dark:text-gray-100">
                  {album.albumName}
                </h3>
                <div className="mt-1 flex items-center gap-3 text-xs text-gray-400">
                  <span className="inline-flex items-center gap-1">
                    <Images className="h-3.5 w-3.5" />
                    {(album.images || []).length}
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <Film className="h-3.5 w-3.5" />
                    {(album.videos || []).length}
                  </span>
                </div>
                <div className="mt-3 flex items-center gap-2">
                  <Button variant="secondary" size="xs" onClick={() => setViewing(album)}>
                    <Eye className="h-3.5 w-3.5" /> Open
                  </Button>
                  <Button
                    variant="ghost"
                    size="xs"
                    onClick={() => { setEditing(album); setFormOpen(true); }}
                  >
                    <Pencil className="h-3.5 w-3.5" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="xs"
                    className="ml-auto text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10"
                    onClick={() => setDeleting(album)}
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <AlbumFormModal
        open={formOpen}
        onClose={() => setFormOpen(false)}
        album={editing}
        onSubmit={handleFormSubmit}
        submitting={createMutation.isPending || updateMutation.isPending}
      />

      <AlbumDetailModal
        open={Boolean(viewing)}
        onClose={() => setViewing(null)}
        album={viewing}
        onUploadImages={(files) => uploadImagesMutation.mutate({ id: viewing._id, files })}
        onUploadVideo={(file) => uploadVideoMutation.mutate({ id: viewing._id, file })}
        onRemoveImage={(mediaId) => removeImageMutation.mutate({ id: viewing._id, mediaId })}
        onRemoveVideo={(mediaId) => removeVideoMutation.mutate({ id: viewing._id, mediaId })}
        uploadingImages={uploadImagesMutation.isPending}
        uploadingVideo={uploadVideoMutation.isPending}
        removing={removeImageMutation.isPending || removeVideoMutation.isPending}
      />

      <ConfirmDialog
        open={Boolean(deleting)}
        onClose={() => setDeleting(null)}
        onConfirm={() => deleting && deleteMutation.mutate(deleting._id)}
        title="Delete album"
        description={`Delete "${deleting?.albumName}" and all its photos and videos? This action cannot be undone.`}
        confirmLabel="Delete"
        loading={deleteMutation.isPending}
      />
    </div>
  );
};

export default GalleryPage;
