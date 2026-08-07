import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '../../components/ui/Input';
import Button from '../../components/ui/Button';
import { Modal } from '../../components/ui/Modal';
import { LanguageToggle } from '../../components/ui/FormSection';

const timelineSchema = z.object({
  year: z.string().min(1, 'Year is required').max(20, 'Year too long'),
  title: z.string().min(1, 'Title is required').max(200, 'Title too long'),
  titleAm: z.string().optional().or(z.literal('')),
  description: z.string().optional().or(z.literal('')),
  descriptionAm: z.string().optional().or(z.literal('')),
});

export const TimelineModal = ({ open, onClose, onSubmit, submitting }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(timelineSchema),
    defaultValues: { year: '', title: '', titleAm: '', description: '', descriptionAm: '' },
  });

  useEffect(() => {
    if (open) reset({ year: '', title: '', titleAm: '', description: '', descriptionAm: '' });
  }, [open, reset]);

  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Add Timeline Entry"
      subtitle="A milestone in the history of the parish"
      footer={
        <>
          <Button variant="secondary" onClick={onClose} type="button">
            Cancel
          </Button>
          <Button type="submit" form="timeline-form" loading={submitting}>
            Add entry
          </Button>
        </>
      }
    >
      <form id="timeline-form" onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
        <Input label="Year" placeholder="1974" required error={errors.year?.message} {...register('year')} />
        <div className="flex items-center justify-between">
          <span className="text-xs font-medium text-gray-500 dark:text-gray-400">Content languages</span>
          <LanguageToggle activeLang="English" onToggle={() => {}} />
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <Input label="Title (English)" placeholder="Church founded" required error={errors.title?.message} {...register('title')} />
          <Input label="Title (አማርኛ)" placeholder="ቤተክርስቲያኑ ተመሠረተ" error={errors.titleAm?.message} {...register('titleAm')} />
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <Input label="Description (English)" placeholder="A short account…" error={errors.description?.message} {...register('description')} />
          <Input label="Description (አማርኛ)" placeholder="አጭር ማብራሪያ…" error={errors.descriptionAm?.message} {...register('descriptionAm')} />
        </div>
      </form>
    </Modal>
  );
};

export default TimelineModal;
