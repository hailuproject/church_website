import { useRef, useState } from 'react';
import { FileUp, FileAudio, FileVideo, FileText, X } from 'lucide-react';
import { cn } from '../../utils/helpers';

const ACCEPT = {
  audio: 'audio/*',
  video: 'video/*',
  pdf: 'application/pdf',
  image: 'image/*',
};

const ICONS = {
  audio: FileAudio,
  video: FileVideo,
  pdf: FileText,
  image: FileUp,
};

export const FileUpload = ({
  value,
  onChange,
  type = 'audio',
  label,
  hint,
  error,
  multiple = false,
}) => {
  const inputRef = useRef(null);
  const [dragOver, setDragOver] = useState(false);

  const items = Array.isArray(value) ? value : value ? [value] : [];
  const Icon = ICONS[type];

  const handleFiles = (fileList) => {
    const files = Array.from(fileList || []);
    if (!files.length) return;
    const normalized = multiple ? [...items, ...files] : [files[0]];
    onChange?.(multiple ? normalized : normalized[0]);
  };

  return (
    <div>
      {label && (
        <div className="mb-1.5 flex items-baseline justify-between gap-2">
          <span className="block text-sm font-medium text-gray-700 dark:text-gray-300">{label}</span>
          {hint && <span className="text-xs text-gray-400">{hint}</span>}
        </div>
      )}
      <input
        ref={inputRef}
        type="file"
        accept={ACCEPT[type]}
        multiple={multiple}
        className="hidden"
        onChange={(e) => {
          handleFiles(e.target.files);
          e.target.value = '';
        }}
      />
      <div
        onClick={() => inputRef.current?.click()}
        onDragOver={(e) => {
          e.preventDefault();
          setDragOver(true);
        }}
        onDragLeave={() => setDragOver(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDragOver(false);
          handleFiles(e.dataTransfer.files);
        }}
        className={cn(
          'cursor-pointer rounded-xl border-2 border-dashed border-gray-300 p-4 text-center transition-colors dark:border-gray-600',
          dragOver && 'border-primary-400 bg-primary-50/50 dark:border-primary-600 dark:bg-primary-500/5'
        )}
      >
        <div className="flex flex-col items-center py-3">
          <div className="mb-2 flex h-11 w-11 items-center justify-center rounded-full bg-primary-50 dark:bg-primary-500/10">
            <Icon className="h-5 w-5 text-primary-500" />
          </div>
          <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
            {items.length ? 'Upload another file' : `Choose ${type} file`}
          </p>
          <p className="mt-1 text-xs text-gray-400">or drag and drop here</p>
        </div>
      </div>

      {items.length > 0 && (
        <ul className="mt-3 space-y-2">
          {items.map((file, index) => {
            const name = typeof file === 'string' ? file : file?.name || 'Selected file';
            const url = typeof file === 'string' ? file : file?.url || (file instanceof Blob ? URL.createObjectURL(file) : '');
            const isRemote = typeof file === 'string' || file?.url;
            return (
              <li
                key={`${name}-${index}`}
                className="flex items-center justify-between gap-3 rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 dark:border-gray-700 dark:bg-gray-700/50"
              >
                <div className="flex min-w-0 items-center gap-2.5">
                  <Icon className="h-4 w-4 shrink-0 text-primary-500" />
                  <div className="min-w-0">
                    <p className="truncate text-sm text-gray-700 dark:text-gray-200">{name}</p>
                    {file?.size ? (
                      <p className="text-xs text-gray-400">{(file.size / (1024 * 1024)).toFixed(2)} MB</p>
                    ) : (
                      <p className="text-xs text-gray-400">{isRemote ? 'Uploaded file' : type.toUpperCase()}</p>
                    )}
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    if (multiple) onChange?.(items.filter((_, i) => i !== index));
                    else onChange?.(null);
                  }}
                  className="rounded-full p-1 text-gray-400 hover:bg-gray-200 hover:text-gray-600 dark:hover:bg-gray-600"
                  aria-label="Remove file"
                >
                  <X className="h-4 w-4" />
                </button>
              </li>
            );
          })}
        </ul>
      )}
      {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
    </div>
  );
};

export default FileUpload;
