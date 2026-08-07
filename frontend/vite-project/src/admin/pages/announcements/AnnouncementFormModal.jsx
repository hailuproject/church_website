import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Megaphone, CalendarClock } from 'lucide-react';
import { Input, Textarea } from '../../components/ui/Input';
import Button from '../../components/ui/Button';
import { Modal } from '../../components/ui/Modal';
import { RichEditor } from '../../components/ui/RichEditor';
import { Select } from '../../components/ui/Input';
import { Switch } from '../../components/ui/Switch';
import { LanguageToggle } from '../../components/ui/FormSection';
import { ANNOUNCEMENT_PRIORITIES } from '../../constants/options';
import { useAuth } from '../../context/AuthContext';

const baseSchema = {
  title: z.string().min(3, 'Title is required (min 3 characters)').max(200, 'Title too long'),
  titleAm: z.string().optional().or(z.literal('')),
  description: z.string().min(10, 'Description is required (min 10 characters)'),
  descriptionAm: z.string().optional().or(z.literal('')),
  priority: z.enum(ANNOUNCEMENT_PRIORITIES),
  startDate: z.string().optional().or(z.literal('')),
  endDate: z.string().optional().or(z.literal('')),
  isPublished: z.boolean(),
};

const createSchema = z.object(baseSchema);

const updateSchema = z
  .object(baseSchema)
  .refine((data) => !data.startDate || !data.endDate || data.endDate >= data.startDate, {
    message: 'End date must be after start date',
    path: ['endDate'],
  });

export const AnnouncementFormModal = ({ open, onClose, announcement, onSubmit, submitting }) => {
  const { user } = useAuth();
  const isEdit = Boolean(announcement?._id);

  const schema = isEdit ? updateSchema : createSchema;

  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      title: '',
      titleAm: '',
      description: '',
      descriptionAm: '',
      priority: 'Normal',
      startDate: '',
      endDate: '',
      isPublished: true,
    },
  });

  useEffect(() => {
    if (open) {
      if (announcement?._id) {
        reset({
          title: announcement.title || '',
          titleAm: announcement.titleAm || '',
          description: announcement.description || '',
          descriptionAm: announcement.descriptionAm || '',
          priority: announcement.priority || 'Normal',
          startDate: announcement.startDate ? announcement.startDate.slice(0, 10) : '',
          endDate: announcement.endDate ? announcement.endDate.slice(0, 10) : '',
          isPublished: Boolean(announcement.isPublished),
        });
      } else {
        reset({
          title: '',
          titleAm: '',
          description: '',
          descriptionAm: '',
          priority: 'Normal',
          startDate: '',
          endDate: '',
          isPublished: true,
        });
      }
    }
  }, [open, announcement, reset]);

  const description = watch('description');

  const onFormSubmit = (values) => {
    onSubmit({
      ...values,
      title: values.title.trim(),
      description: values.description,
      startDate: values.startDate || null,
      endDate: values.endDate || null,
      createdBy: user?._id,
    });
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      title={isEdit ? 'Edit Announcement' : 'Create Announcement'}
      subtitle="Announcements appear on the church website"
      size="lg"
      footer={
        <>
          <Button variant="secondary" onClick={onClose} type="button">
            Cancel
          </Button>
          <Button type="submit" form="announcement-form" loading={submitting}>
            {isEdit ? 'Save changes' : 'Create announcement'}
          </Button>
        </>
      }
    >
      <form id="announcement-form" onSubmit={handleSubmit(onFormSubmit)} className="space-y-5" noValidate>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400">
            <Megaphone className="h-4 w-4" />
            <span className="text-xs font-medium">Content languages</span>
          </div>
          <LanguageToggle activeLang="English" onToggle={() => {}} />
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <Input label="Title (English)" placeholder="Sunday service notice" required error={errors.title?.message} {...register('title')} />
          <Input label="Title (አማርኛ)" placeholder="የእሁድ አገልግሎት ማስታወቂያ" error={errors.titleAm?.message} {...register('titleAm')} />
        </div>

        <RichEditor
          label="Description (English)"
          placeholder="Write the announcement content…"
          value={description}
          onChange={(html) => setValue('description', html, { shouldValidate: true })}
          error={errors.description?.message}
        />

        <Textarea
          label="Description (አማርኛ)"
          placeholder="የማስታወቂያው ይዘት…"
          error={errors.descriptionAm?.message}
          {...register('descriptionAm')}
        />

        <div className="grid gap-4 sm:grid-cols-3">
          <Select label="Priority" required error={errors.priority?.message} {...register('priority')}>
            {ANNOUNCEMENT_PRIORITIES.map((priority) => (
              <option key={priority} value={priority}>
                {priority}
              </option>
            ))}
          </Select>
          <div className="flex items-end gap-1">
            <Input label="Start date" type="date" error={errors.startDate?.message} {...register('startDate')} />
            <CalendarClock className="mb-2.5 hidden h-4 w-4 text-gray-400" />
          </div>
          <Input label="End date" type="date" error={errors.endDate?.message} {...register('endDate')} />
        </div>
        {errors.endDate && <p className="-mt-2 text-xs text-red-500">{errors.endDate.message}</p>}

        <Switch
          checked={watch('isPublished')}
          onChange={(val) => setValue('isPublished', val)}
          label="Publish immediately"
          description="Published announcements are visible on the website"
        />
      </form>
    </Modal>
  );
};

export default AnnouncementFormModal;
