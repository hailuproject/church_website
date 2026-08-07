import { useState } from 'react';
import toast from 'react-hot-toast';
import { CloudUpload, X, FileAudio, FileVideo, FileText, Image as ImageIcon, Loader2 } from 'lucide-react';
import { openCloudinaryWidget } from '../../utils/cloudinary';
import { getErrorMessage } from '../../utils/api';
import { cn } from '../../utils/helpers';

const getTypeIcon = (media) => {
  const type = media?.resourceType || '';
  if (type === 'video') return FileVideo;
  if (type === 'raw') return FileText;
  if (type === 'audio') return FileAudio;
  return ImageIcon;
};

const MediaThumb = ({ media, onRemove, isVideo }) => {
  const Icon = getTypeIcon(media);
  if (!media?.url && !media?.publicId) return null;
  const url = media.url || media.publicId;
  const thumbUrl = url.startsWith('http')
    ? url
    : `https://res.cloudinary.com/${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME || ''}/image/upload/w_300/${url}`;

  return (
    <div className="group relative overflow-hidden rounded-lg border border-gray-200 dark:border-gray-700">
      <div className="flex h-24 w-full items-center justify-center bg-gray-100 dark:bg-gray-700">
        {media?.resourceType === 'video' ? (
          <Icon className="h-8 w-8 text-gray-500" />
        ) : isVideo || media?.format === 'mp4' ? (
          <Icon className="h-8 w-8 text-gray-500" />
        ) : url ? (
          <img src={thumbUrl} alt="" className="h-full w-full object-cover" loading="lazy" />
        ) : (
          <Icon className="h-8 w-8 text-gray-500" />
        )}
      </div>
      <button
        type="button"
        onClick={onRemove}
        className="absolute right-1 top-1 rounded-full bg-gray-900/70 p-1 text-white opacity-0 transition-opacity group-hover:opacity-100"
        aria-label="Remove"
      >
        <X className="h-3.5 w-3.5" />
      </button>
    </div>
  );
};

export const CloudinaryUpload = ({
  value,
  onChange,
  multiple = false,
  folder = 'church/misc',
  resourceType = 'image',
  maxFiles = 10,
  label,
  hint = 'Click to upload from your device, URL, or cloud.',
  error,
  children,
}) => {
  const [uploading, setUploading] = useState(false);

  const items = Array.isArray(value) ? value : value ? [value] : [];
  const isVideo = resourceType === 'video';

  const handleUpload = async () => {
    if (uploading || (maxFiles && items.length >= maxFiles)) return;
    setUploading(true);
    try {
      const results = await openCloudinaryWidget({
        multiple,
        resourceType,
        folder,
        maxFiles: maxFiles - items.length,
      });
      if (results.length) {
        const normalized = results.map((r) => ({ ...r, resourceType: r.resourceType || resourceType }));
        if (multiple) {
          onChange?.([...items, ...normalized].slice(0, maxFiles));
        } else {
          onChange?.(normalized[0]);
        }
        toast.success(`${results.length} file${results.length > 1 ? 's' : ''} uploaded`);
      }
    } catch (error) {
      toast.error(getErrorMessage(error, 'Upload failed'));
    } finally {
      setUploading(false);
    }
  };

  return (
    <div>
      {label && (
        <div className="mb-1.5 flex items-baseline justify-between gap-2">
          <span className="block text-sm font-medium text-gray-700 dark:text-gray-300">{label}</span>
          {hint && <span className="text-xs text-gray-400">{hint}</span>}
        </div>
      )}
      <div
        className={cn(
          'rounded-xl border-2 border-dashed border-gray-300 p-4 text-center transition-colors dark:border-gray-600',
          uploading ? 'cursor-wait' : 'cursor-pointer hover:border-primary-400 dark:hover:border-primary-600'
        )}
        onClick={handleUpload}
      >
        {uploading ? (
          <div className="flex flex-col items-center py-4">
            <Loader2 className="h-7 w-7 animate-spin text-primary-500" />
            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">Uploading…</p>
          </div>
        ) : children ? (
          children
        ) : (
          <div className="flex flex-col items-center py-4">
            <div className="mb-2 flex h-11 w-11 items-center justify-center rounded-full bg-primary-50 dark:bg-primary-500/10">
              <CloudUpload className="h-5 w-5 text-primary-500" />
            </div>
            <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
              {items.length ? 'Upload more' : 'Upload files'}
            </p>
            <p className="mt-1 text-xs text-gray-400">{hint}</p>
          </div>
        )}
      </div>
      {items.length > 0 && (
        <div className="mt-3 grid grid-cols-3 gap-2 sm:grid-cols-4 md:grid-cols-6">
          {items.map((media, index) => (
            <MediaThumb
              key={media.publicId || index}
              media={media}
              isVideo={isVideo}
              onRemove={() => {
                if (multiple) {
                  onChange?.(items.filter((_, i) => i !== index));
                } else {
                  onChange?.(null);
                }
              }}
            />
          ))}
        </div>
      )}
      {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
    </div>
  );
};

export default CloudinaryUpload;
