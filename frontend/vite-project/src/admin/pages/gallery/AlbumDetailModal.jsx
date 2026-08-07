import { useQuery } from '@tanstack/react-query';
import { Film, ImagePlus, X, FileVideo, Play } from 'lucide-react';
import { Modal } from '../../components/ui/Modal';
import Button from '../../components/ui/Button';
import { FileUpload } from '../../components/ui/FileUpload';
import { EmptyState } from '../../components/ui/EmptyState';
import { galleryService } from '../../services/gallery.service';

export const AlbumDetailModal = ({ open, onClose, album, onUploadImages, onUploadVideo, onRemoveImage, onRemoveVideo, uploadingImages, uploadingVideo, removing }) => {
  const { data, isLoading } = useQuery({
    queryKey: ['gallery-album', album?._id],
    queryFn: () => galleryService.get(album._id),
    enabled: Boolean(album?._id),
    placeholderData: album,
  });

  const current = data || album;
  const images = current?.images || [];
  const videos = current?.videos || [];

  return (
    <Modal
      open={open}
      onClose={onClose}
      title={current?.albumName || 'Album'}
      subtitle={`${current?.category || ''} · ${images.length} photos · ${videos.length} videos`}
      size="full"
    >
      <div className="space-y-6">
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <FileUpload
              type="image"
              multiple
              label="Add photos"
              value={null}
              onChange={(files) => onUploadImages(Array.isArray(files) ? files : [files])}
              hint="Up to 10 at a time"
            />
          </div>
          <div>
            <FileUpload
              type="video"
              label="Add video"
              value={null}
              onChange={(file) => onUploadVideo(file)}
              hint="A single video clip"
            />
          </div>
        </div>

        {isLoading ? (
          <p className="py-8 text-center text-sm text-gray-400">Loading media…</p>
        ) : (
          <>
            {images.length > 0 && (
              <div>
                <h4 className="mb-3 flex items-center gap-2 text-sm font-semibold text-gray-900 dark:text-gray-100">
                  <ImagePlus className="h-4 w-4 text-primary-500" /> Photos ({images.length})
                </h4>
                <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
                  {images.map((image) => (
                    <div
                      key={image._id}
                      className="group relative aspect-square overflow-hidden rounded-lg border border-gray-200 dark:border-gray-700"
                    >
                      <img src={image.url} alt="" className="h-full w-full object-cover" loading="lazy" />
                      <button
                        type="button"
                        disabled={removing}
                        onClick={() => onRemoveImage(image._id)}
                        className="absolute right-1.5 top-1.5 rounded-full bg-gray-900/70 p-1.5 text-white opacity-0 transition-opacity group-hover:opacity-100 disabled:opacity-30"
                        aria-label="Remove image"
                      >
                        <X className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {videos.length > 0 && (
              <div>
                <h4 className="mb-3 flex items-center gap-2 text-sm font-semibold text-gray-900 dark:text-gray-100">
                  <Film className="h-4 w-4 text-primary-500" /> Videos ({videos.length})
                </h4>
                <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
                  {videos.map((video) => (
                    <div
                      key={video._id}
                      className="group relative overflow-hidden rounded-lg border border-gray-200 dark:border-gray-700"
                    >
                      <div className="flex aspect-video items-center justify-center bg-gray-100 dark:bg-gray-700">
                        {video.url ? (
                          <a href={video.url} target="_blank" rel="noreferrer" className="flex flex-col items-center gap-2 text-gray-500 hover:text-primary-500">
                            <Play className="h-8 w-8" />
                            <span className="text-xs">{video.format || 'video'}</span>
                          </a>
                        ) : (
                          <FileVideo className="h-8 w-8 text-gray-400" />
                        )}
                      </div>
                      <button
                        type="button"
                        disabled={removing}
                        onClick={() => onRemoveVideo(video._id)}
                        className="absolute right-1.5 top-1.5 rounded-full bg-gray-900/70 p-1.5 text-white opacity-0 transition-opacity group-hover:opacity-100 disabled:opacity-30"
                        aria-label="Remove video"
                      >
                        <X className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {images.length === 0 && videos.length === 0 && (
              <EmptyState
                icon={Film}
                title="No media yet"
                description="Upload photos and videos to this album."
              />
            )}

            {(uploadingImages || uploadingVideo) && (
              <div className="flex items-center justify-center gap-2 rounded-lg bg-primary-50 py-3 text-sm text-primary-600 dark:bg-primary-500/10 dark:text-primary-400">
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-primary-500 border-t-transparent" />
                Uploading media…
              </div>
            )}
          </>
        )}
      </div>
    </Modal>
  );
};

export default AlbumDetailModal;
