import { useEffect, useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { Plus, Pencil, Trash2, Image, Film, ImagePlus, Video, X, Eye, FolderOpen, AlertTriangle, RefreshCw } from 'lucide-react';
import { PageHeader } from '../../components/ui/PageHeader';
import Button from '../../components/ui/Button';
import { Input, Textarea, Select } from '../../components/ui/Input';
import FileUpload from '../../components/ui/FileUpload';
import { Modal } from '../../components/ui/Modal';
import { ConfirmDialog } from '../../components/ui/ConfirmDialog';
import { Badge } from '../../components/ui/Badge';
import { Spinner } from '../../components/ui/Loader';
import { LanguageToggle } from '../../components/ui/FormSection';
import { galleryService, GALLERY_CATEGORIES } from '../../services/gallery.service';
import { useListQuery } from '../../hooks/useListQuery';
import { getErrorMessage } from '../../utils/api';
import { formatDate } from '../../utils/format';
import { usePageMeta } from '../../hooks/usePageMeta';

const getCover = (album) => album?.coverImage?.url || album?.images?.[0]?.url || '';

const AlbumFormModal = ({ open, onClose, album, onSubmit, submitting }) => {
  const isEdit = Boolean(album?._id);
  const [activeLang, setActiveLang] = useState('English');
  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (open) {
      reset({
        albumName: album?.albumName || '',
        albumNameAm: album?.albumNameAm || '',
        albumNameTi: album?.albumNameTi || '',
        description: album?.description || '',
        descriptionAm: album?.descriptionAm || '',
        descriptionTi: album?.descriptionTi || '',
        category: album?.category || 'Liturgy',
      });
      if (!isEdit) setValue('coverImage', null);
    }
  }, [open, album, reset, isEdit, setValue]);

  const coverImage = watch('coverImage');

  return (
    <Modal
      open={open}
      onClose={onClose}
      title={isEdit ? 'Edit album' : 'New album'}
      subtitle={isEdit ? album?.albumName : 'Create a photo or video album'}
      size="lg"
      footer={
        <>
          <Button variant="secondary" onClick={onClose}>Cancel</Button>
          <Button form="album-form" type="submit" loading={submitting}>Save album</Button>
        </>
      }
    >
      <form id="album-form" onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">
        <div className="flex justify-end">
          <LanguageToggle activeLang={activeLang} onToggle={setActiveLang} />
        </div>

        <div className="grid gap-4 sm:grid-cols-3">
          <div className={activeLang === 'English' ? '' : 'opacity-40'}>
            <Input label="Album name (English)" required error={errors.albumName?.message} {...register('albumName', { required: 'Album name is required' })} />
          </div>
          <div className={activeLang === 'Amharic' ? '' : 'opacity-40'}>
            <Input label="Album name (አማርኛ)" {...register('albumNameAm')} />
          </div>
          <div className={activeLang === 'Tigrigna' ? '' : 'opacity-40'}>
            <Input label="Album name (ትግርኛ)" {...register('albumNameTi')} />
          </div>
          <div className={activeLang === 'English' ? '' : 'opacity-40'}>
            <Textarea label="Description (English)" {...register('description')} />
          </div>
          <div className={activeLang === 'Amharic' ? '' : 'opacity-40'}>
            <Textarea label="Description (አማርኛ)" {...register('descriptionAm')} />
          </div>
          <div className={activeLang === 'Tigrigna' ? '' : 'opacity-40'}>
            <Textarea label="Description (ትግርኛ)" {...register('descriptionTi')} />
          </div>
          <Select label="Category" {...register('category')}>
            {GALLERY_CATEGORIES.map((category) => (
              <option key={category} value={category}>{category}</option>
            ))}
          </Select>
          <FileUpload
            type="image"
            label="Cover image"
            hint="Shown as the album thumbnail"
            value={isEdit && !coverImage && album?.coverImage?.url ? album.coverImage.url : coverImage}
            onChange={(file) => setValue('coverImage', file)}
          />
        </div>
      </form>
    </Modal>
  );
};

const AlbumDetailModal = ({ open, onClose, album, loading }) => {
  const queryClient = useQueryClient();
  const [uploadMode, setUploadMode] = useState(null);
  const [removing, setRemoving] = useState(null);

  const invalidate = () => {
    queryClient.invalidateQueries({ queryKey: ['albums'] });
  };

  const addImagesMutation = useMutation({
    mutationFn: (files) => galleryService.addImages(album._id, files),
    onSuccess: () => {
      toast.success('Images uploaded');
      invalidate();
      setUploadMode(null);
    },
    onError: (error) => toast.error(getErrorMessage(error)),
  });

  const addVideosMutation = useMutation({
    mutationFn: (files) => galleryService.addVideos(album._id, files),
    onSuccess: () => {
      toast.success('Videos uploaded');
      invalidate();
      setUploadMode(null);
    },
    onError: (error) => toast.error(getErrorMessage(error)),
  });

  const removeMediaMutation = useMutation({
    mutationFn: ({ mediaId }) => galleryService.removeMedia(album._id, mediaId),
    onSuccess: () => {
      toast.success('Media removed');
      invalidate();
      setRemoving(null);
    },
    onError: (error) => toast.error(getErrorMessage(error)),
  });

  return (
    <Modal
      open={open && Boolean(album)}
      onClose={onClose}
      title={album?.albumName}
      subtitle={
        album ? `${album.category} · ${album.imageCount ?? album.images?.length ?? 0} photos · ${album.videoCount ?? album.videos?.length ?? 0} videos · created ${formatDate(album.createdAt)}` : undefined
      }
      size="xl"
    >
      {loading || !album ? (
        <Spinner label="Loading album…" />
      ) : (
        <div className="space-y-6">
          <div className="flex flex-wrap gap-2">
            <Button size="sm" onClick={() => setUploadMode(uploadMode === 'images' ? null : 'images')}>
              <ImagePlus className="h-4 w-4" /> Upload photos
            </Button>
            <Button size="sm" variant="secondary" onClick={() => setUploadMode(uploadMode === 'videos' ? null : 'videos')}>
              <Video className="h-4 w-4" /> Upload videos
            </Button>
            {album.coverImage?.url && (
              <Button size="sm" variant="secondary" disabled>
                <FolderOpen className="h-4 w-4" /> Uses a custom cover
              </Button>
            )}
          </div>

          {uploadMode === 'images' && (
            <div className="rounded-xl border border-dashed border-gray-300 p-4 dark:border-gray-600">
              <FileUpload
                type="image"
                multiple
                label="Select photos (up to 20 per batch)"
                value={[]}
                onChange={(files) => addImagesMutation.mutate(files)}
              />
            </div>
          )}
          {uploadMode === 'videos' && (
            <div className="rounded-xl border border-dashed border-gray-300 p-4 dark:border-gray-600">
              <FileUpload
                type="video"
                multiple
                label="Select videos (up to 5 per batch)"
                value={[]}
                onChange={(files) => addVideosMutation.mutate(files)}
              />
            </div>
          )}

          {(album.images?.length > 0 || album.videos?.length > 0) && (
            <div className="space-y-4">
              {album.images?.length > 0 && (
                <div>
                  <h4 className="mb-2 flex items-center gap-1.5 text-sm font-semibold text-gray-700 dark:text-gray-300">
                    <Image className="h-4 w-4" /> Photos
                  </h4>
                  <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                    {album.images.map((image) => (
                      <div key={image._id} className="group relative aspect-square overflow-hidden rounded-lg bg-gray-100 dark:bg-gray-700">
                        {image.url ? (
                          <img src={image.url} alt={album.albumName} className="h-full w-full object-cover" loading="lazy" />
                        ) : (
                          <div className="flex h-full w-full items-center justify-center">
                            <Image className="h-6 w-6 text-gray-400" />
                          </div>
                        )}
                        <button
                          type="button"
                          onClick={() => setRemoving({ mediaId: image._id, type: 'photo' })}
                          className="absolute right-1.5 top-1.5 rounded-full bg-black/50 p-1 text-white opacity-0 transition-opacity hover:bg-red-600 group-hover:opacity-100"
                          aria-label="Remove photo"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {album.videos?.length > 0 && (
                <div>
                  <h4 className="mb-2 flex items-center gap-1.5 text-sm font-semibold text-gray-700 dark:text-gray-300">
                    <Film className="h-4 w-4" /> Videos
                  </h4>
                  <ul className="space-y-2">
                    {album.videos.map((video) => (
                      <li key={video._id} className="flex items-center justify-between gap-3 rounded-lg border border-gray-200 px-3 py-2 dark:border-gray-700">
                        <div className="flex min-w-0 items-center gap-2.5">
                          <Film className="h-4 w-4 shrink-0 text-primary-500" />
                          <span className="truncate text-sm text-gray-700 dark:text-gray-300">{video.filename || 'Video'}</span>
                        </div>
                        <div className="flex shrink-0 items-center gap-2">
                          {video.url && (
                            <a href={video.url} target="_blank" rel="noreferrer" className="rounded p-1 text-gray-400 hover:text-primary-600" aria-label="Open video">
                              <Eye className="h-4 w-4" />
                            </a>
                          )}
                          <button
                            type="button"
                            onClick={() => setRemoving({ mediaId: video._id, type: 'video' })}
                            className="rounded p-1 text-gray-400 hover:bg-red-50 hover:text-red-600"
                            aria-label="Remove video"
                          >
                            <X className="h-4 w-4" />
                          </button>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}

          {!album.images?.length && !album.videos?.length && (
            <p className="py-8 text-center text-sm text-gray-400">No media yet — upload the first photos or videos.</p>
          )}
        </div>
      )}

      <ConfirmDialog
        open={Boolean(removing)}
        onClose={() => setRemoving(null)}
        onConfirm={() => removing && removeMediaMutation.mutate(removing)}
        title={`Remove this ${removing?.type}?`}
        description={`Remove the ${removing?.type} from "${album?.albumName}"? The uploaded file will be deleted from storage.`}
        confirmLabel="Remove"
        loading={removeMediaMutation.isPending}
      />
    </Modal>
  );
};

export const GalleryPage = () => {
  usePageMeta('Gallery');
  const queryClient = useQueryClient();
  const [formOpen, setFormOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [deleting, setDeleting] = useState(null);
  const [viewing, setViewing] = useState(null);

  const list = useListQuery({
    key: 'albums',
    fetcher: (params) => galleryService.list(params),
    initialLimit: 12,
  });

  const invalidate = () => {
    queryClient.invalidateQueries({ queryKey: ['albums'] });
    queryClient.invalidateQueries({ queryKey: ['dashboard', 'overview'] });
  };

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

  const handleFormSubmit = (payload) => {
    if (editing?._id) {
      updateMutation.mutate({ id: editing._id, payload });
    } else {
      createMutation.mutate(payload);
    }
  };

  const cover = (album) => getCover(album);

  return (
    <div>
      <PageHeader
        title="Gallery"
        subtitle="Organize church photos and videos into albums"
        breadcrumbs={[{ label: 'Gallery' }]}
        actions={
          <Button onClick={() => { setEditing(null); setFormOpen(true); }}>
            <Plus className="h-4 w-4" />
            New Album
          </Button>
        }
      />

      {list.isLoading ? (
        <Spinner label="Loading albums…" />
      ) : list.error ? (
        <div className="rounded-xl border border-red-200 bg-red-50 p-12 text-center dark:border-red-500/30 dark:bg-red-500/5">
          <AlertTriangle className="mx-auto h-10 w-10 text-red-400" />
          <p className="mt-3 text-sm font-medium text-red-700 dark:text-red-300">Failed to load albums</p>
          <p className="text-xs text-red-500 dark:text-red-400">{list.error?.message || 'There was a problem fetching albums. Please try again.'}</p>
          <div className="mt-4">
            <Button variant="secondary" onClick={() => list.refetch()}>
              <RefreshCw className="h-4 w-4" /> Retry
            </Button>
          </div>
        </div>
      ) : list.items.length === 0 ? (
        <div className="rounded-xl border border-dashed border-gray-300 p-12 text-center dark:border-gray-600">
          <Image className="mx-auto h-10 w-10 text-gray-300 dark:text-gray-600" />
          <p className="mt-3 text-sm font-medium text-gray-700 dark:text-gray-300">No albums yet</p>
          <p className="text-xs text-gray-400">Create your first photo album to start sharing church moments.</p>
          <div className="mt-4">
            <Button onClick={() => { setEditing(null); setFormOpen(true); }}>
              <Plus className="h-4 w-4" /> Create album
            </Button>
          </div>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {list.items.map((album) => (
              <div
                key={album._id}
                className="group overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition-shadow hover:shadow-md dark:border-gray-700 dark:bg-gray-800"
              >
                <button
                  type="button"
                  onClick={() => setViewing(album)}
                  className="relative block aspect-[16/10] w-full overflow-hidden bg-gray-100 dark:bg-gray-700"
                >
                  {cover(album) ? (
                    <img src={cover(album)} alt={album.albumName} className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105" loading="lazy" />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center">
                      <Image className="h-10 w-10 text-gray-300 dark:text-gray-600" />
                    </div>
                  )}
                  <span className="absolute left-2 top-2">
                    <Badge tone="neutral">{album.category}</Badge>
                  </span>
                </button>
                <div className="flex items-center justify-between gap-2 px-4 py-3">
                  <button type="button" onClick={() => setViewing(album)} className="min-w-0 text-left">
                    <p className="truncate text-sm font-semibold text-gray-900 dark:text-gray-100">{album.albumName}</p>
                    <p className="mt-0.5 text-xs text-gray-400">
                      {album.imageCount ?? album.images?.length ?? 0} photos · {album.videoCount ?? album.videos?.length ?? 0} videos
                    </p>
                  </button>
                  <div className="flex shrink-0 items-center gap-0.5">
                    <button
                      type="button"
                      onClick={() => setViewing(album)}
                      className="rounded-lg p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-600 dark:hover:bg-gray-700"
                      aria-label={`Manage ${album.albumName}`}
                    >
                      <Eye className="h-4 w-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => { setEditing(album); setFormOpen(true); }}
                      className="rounded-lg p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-600 dark:hover:bg-gray-700"
                      aria-label={`Edit ${album.albumName}`}
                    >
                      <Pencil className="h-4 w-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => setDeleting(album)}
                      className="rounded-lg p-2 text-gray-400 hover:bg-red-50 hover:text-red-600"
                      aria-label={`Delete ${album.albumName}`}
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 flex justify-center gap-4">
            <Button
              variant="secondary"
              disabled={list.page <= 1 || list.isLoading}
              onClick={() => list.setPage(list.page - 1)}
            >
              Previous
            </Button>
            <span className="flex items-center text-sm text-gray-500">Page {list.page}</span>
            <Button
              variant="secondary"
              disabled={!list.pagination?.hasNextPage || list.isLoading}
              onClick={() => list.setPage(list.page + 1)}
            >
              Next
            </Button>
          </div>
        </>
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
        loading={false}
      />

      <ConfirmDialog
        open={Boolean(deleting)}
        onClose={() => setDeleting(null)}
        onConfirm={() => deleting && deleteMutation.mutate(deleting._id)}
        title="Delete album"
        description={`Delete "${deleting?.albumName}" and all of its photos and videos? This action cannot be undone.`}
        confirmLabel="Delete"
        loading={deleteMutation.isPending}
      />
    </div>
  );
};

export default GalleryPage;