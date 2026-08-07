import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { FileText, ImageIcon } from 'lucide-react';
import Button from '../../components/ui/Button';
import { Modal } from '../../components/ui/Modal';
import { FileUpload } from '../../components/ui/FileUpload';

const resourceMediaSchema = z.object({
  pdf: z.instanceof(File).optional(),
  thumbnail: z.instanceof(File).optional(),
});

export const ResourceMediaModal = ({ open, onClose, resource, submitting, onUpload }) => {
  const { handleSubmit, setValue, watch, reset } = useForm({
    resolver: zodResolver(resourceMediaSchema),
    defaultValues: { pdf: undefined, thumbnail: undefined },
  });

  useEffect(() => {
    if (open) reset({ pdf: undefined, thumbnail: undefined });
  }, [open, reset]);

  const pdf = watch('pdf');
  const thumbnail = watch('thumbnail');
  const hasAny = Boolean(pdf || thumbnail);

  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Manage resource files"
      subtitle={`Upload the PDF or thumbnail for "${resource?.title || 'this resource'}"`}
      size="md"
      footer={
        <>
          <Button variant="secondary" onClick={onClose} type="button">
            Close
          </Button>
          <Button type="submit" form="resource-media-form" loading={submitting} disabled={!hasAny}>
            Upload
          </Button>
        </>
      }
    >
      <form
        id="resource-media-form"
        onSubmit={handleSubmit((values) =>
          onUpload({ pdf: values.pdf || undefined, thumbnail: values.thumbnail || undefined })
        )}
        className="space-y-5"
        noValidate
      >
        <div className="space-y-3">
          {resource?.file?.url && (
            <p className="flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-400">
              <FileText className="h-3.5 w-3.5 text-primary-500" />
              Current file: {resource.file.format || 'PDF'} — uploading replaces it.
            </p>
          )}
          <FileUpload type="pdf" label="PDF file" value={pdf} onChange={(file) => setValue('pdf', file)} hint="PDF documents only" />
        </div>
        <div className="space-y-3">
          {resource?.thumbnail?.url && (
            <p className="flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-400">
              <ImageIcon className="h-3.5 w-3.5 text-primary-500" />
              Current thumbnail will be replaced.
            </p>
          )}
          <FileUpload type="image" label="Thumbnail" value={thumbnail} onChange={(file) => setValue('thumbnail', file)} hint="Cover image" />
        </div>
      </form>
    </Modal>
  );
};

export default ResourceMediaModal;
