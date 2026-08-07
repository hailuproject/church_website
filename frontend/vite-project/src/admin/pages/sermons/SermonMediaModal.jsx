import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { FileAudio, FileVideo, ImageIcon } from 'lucide-react';
import Button from '../../components/ui/Button';
import { Modal } from '../../components/ui/Modal';
import { FileUpload } from '../../components/ui/FileUpload';

const mediaSchema = z.object({
  audio: z.instanceof(File).optional(),
  video: z.instanceof(File).optional(),
  thumbnail: z.instanceof(File).optional(),
});

export const SermonMediaModal = ({ open, onClose, sermon, submitting, onUpload }) => {
  const { handleSubmit, setValue, watch, reset, formState: { errors } } = useForm({
    resolver: zodResolver(mediaSchema),
    defaultValues: { audio: undefined, video: undefined, thumbnail: undefined },
  });

  useEffect(() => {
    if (open) reset({ audio: undefined, video: undefined, thumbnail: undefined });
  }, [open, reset]);

  const audio = watch('audio');
  const video = watch('video');
  const thumbnail = watch('thumbnail');
  const hasAny = Boolean(audio || video || thumbnail);

  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Manage sermon media"
      subtitle={`Upload audio, video, or a thumbnail for "${sermon?.title || 'this sermon'}"`}
      size="lg"
      footer={
        <>
          <Button variant="secondary" onClick={onClose} type="button">
            Close
          </Button>
          <Button
            type="submit"
            form="sermon-media-form"
            loading={submitting}
            disabled={!hasAny}
          >
            Upload
          </Button>
        </>
      }
    >
      <form
        id="sermon-media-form"
        onSubmit={handleSubmit((values) =>
          onUpload({
            audio: values.audio || undefined,
            video: values.video || undefined,
            thumbnail: values.thumbnail || undefined,
          })
        )}
        className="space-y-5"
        noValidate
      >
        <div className="space-y-3">
          {sermon?.audioUrl?.url && (
            <p className="flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-400">
              <FileAudio className="h-3.5 w-3.5 text-primary-500" />
              Current audio: {sermon.audioUrl.format || 'file'} — uploading a new one replaces it.
            </p>
          )}
          <FileUpload type="audio" label="Audio recording" value={audio} onChange={(file) => setValue('audio', file)} hint="MP3, M4A or similar" error={errors.audio?.message} />
        </div>
        <div className="space-y-3">
          {sermon?.videoUrl?.url && (
            <p className="flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-400">
              <FileVideo className="h-3.5 w-3.5 text-primary-500" />
              Current video: {sermon.videoUrl.format || 'file'} — uploading a new one replaces it.
            </p>
          )}
          <FileUpload type="video" label="Video recording" value={video} onChange={(file) => setValue('video', file)} hint="MP4, WebM or similar" error={errors.video?.message} />
        </div>
        <div className="space-y-3">
          {sermon?.thumbnail?.url && (
            <p className="flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-400">
              <ImageIcon className="h-3.5 w-3.5 text-primary-500" />
              Current thumbnail will be replaced.
            </p>
          )}
          <FileUpload type="image" label="Thumbnail" value={thumbnail} onChange={(file) => setValue('thumbnail', file)} hint="Cover image" error={errors.thumbnail?.message} />
        </div>
      </form>
    </Modal>
  );
};

export default SermonMediaModal;
