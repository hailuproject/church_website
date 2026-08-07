import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { CalendarDays } from 'lucide-react';
import { Input, Select, Textarea } from '../../components/ui/Input';
import Button from '../../components/ui/Button';
import { Modal } from '../../components/ui/Modal';
import { Switch } from '../../components/ui/Switch';
import { FileUpload } from '../../components/ui/FileUpload';
import { LanguageToggle } from '../../components/ui/FormSection';
import { EVENT_CATEGORIES, EVENT_STATUSES } from '../../constants/options';
import { useAuth } from '../../context/AuthContext';

const eventSchema = z.object({
  title: z.string().min(3, 'Title is required (min 3 characters)').max(250, 'Title too long'),
  titleAm: z.string().optional().or(z.literal('')),
  description: z.string().optional().or(z.literal('')),
  descriptionAm: z.string().optional().or(z.literal('')),
  date: z.string().min(1, 'Event date is required'),
  startTime: z.string().optional().or(z.literal('')),
  endTime: z.string().optional().or(z.literal('')),
  location: z.string().optional().or(z.literal('')),
  category: z.enum(EVENT_CATEGORIES),
  capacity: z.string().optional().or(z.literal('')),
  status: z.enum(EVENT_STATUSES),
  isFeatured: z.boolean(),
});

export const EventFormModal = ({ open, onClose, event, onSubmit, submitting }) => {
  const { user } = useAuth();
  const isEdit = Boolean(event?._id);

  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(eventSchema),
    defaultValues: {
      title: '',
      titleAm: '',
      description: '',
      descriptionAm: '',
      date: '',
      startTime: '',
      endTime: '',
      location: '',
      category: 'Liturgy',
      capacity: '',
      status: 'upcoming',
      isFeatured: false,
    },
  });

  useEffect(() => {
    if (open) {
      if (event?._id) {
        reset({
          title: event.title || '',
          titleAm: event.titleAm || '',
          description: event.description || '',
          descriptionAm: event.descriptionAm || '',
          date: event.date ? event.date.slice(0, 10) : '',
          startTime: event.startTime || '',
          endTime: event.endTime || '',
          location: event.location || '',
          category: event.category || 'Liturgy',
          capacity: event.capacity ? String(event.capacity) : '',
          status: event.status || 'upcoming',
          isFeatured: Boolean(event.isFeatured),
        });
      } else {
        reset({
          title: '',
          titleAm: '',
          description: '',
          descriptionAm: '',
          date: '',
          startTime: '',
          endTime: '',
          location: '',
          category: 'Liturgy',
          capacity: '',
          status: 'upcoming',
          isFeatured: false,
        });
      }
      setValue('coverImage', null);
    }
  }, [open, event, reset, setValue]);

  const coverImage = watch('coverImage');

  const onFormSubmit = (values) => {
    onSubmit({
      ...values,
      title: values.title.trim(),
      titleAm: values.titleAm.trim() || undefined,
      description: values.description || undefined,
      descriptionAm: values.descriptionAm || undefined,
      startTime: values.startTime || undefined,
      endTime: values.endTime || undefined,
      location: values.location.trim() || undefined,
      capacity: values.capacity === '' ? undefined : Number(values.capacity),
      createdBy: user?._id,
      coverImage: coverImage instanceof File || coverImage instanceof Blob ? coverImage : undefined,
    });
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      title={isEdit ? 'Edit Event' : 'Create Event'}
      subtitle="Events are listed on the website and in the calendar"
      size="lg"
      footer={
        <>
          <Button variant="secondary" onClick={onClose} type="button">
            Cancel
          </Button>
          <Button type="submit" form="event-form" loading={submitting}>
            {isEdit ? 'Save changes' : 'Create event'}
          </Button>
        </>
      }
    >
      <form id="event-form" onSubmit={handleSubmit(onFormSubmit)} className="space-y-5" noValidate>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400">
            <CalendarDays className="h-4 w-4" />
            <span className="text-xs font-medium">Content languages</span>
          </div>
          <LanguageToggle activeLang="English" onToggle={() => {}} />
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <Input label="Title (English)" placeholder="Holy Feast of Timket" required error={errors.title?.message} {...register('title')} />
          <Input label="Title (አማርኛ)" placeholder="የጥምቀት በዓል" error={errors.titleAm?.message} {...register('titleAm')} />
        </div>

        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4">
          <Input label="Date" type="date" required error={errors.date?.message} {...register('date')} />
          <Input label="Start time" type="time" error={errors.startTime?.message} {...register('startTime')} />
          <Input label="End time" type="time" error={errors.endTime?.message} {...register('endTime')} />
          <Input label="Capacity" type="number" min="0" placeholder="0 (unlimited)" error={errors.capacity?.message} {...register('capacity')} />
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <Select label="Category" error={errors.category?.message} {...register('category')}>
            {EVENT_CATEGORIES.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </Select>
          <Select label="Status" error={errors.status?.message} {...register('status')}>
            {EVENT_STATUSES.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </Select>
        </div>

        <Input label="Location" placeholder="Church main hall, Bole" error={errors.location?.message} {...register('location')} />

        <div className="grid gap-4 sm:grid-cols-2">
          <Textarea label="Description (English)" placeholder="Event details…" error={errors.description?.message} {...register('description')} />
          <Textarea label="Description (አማርኛ)" placeholder="የዝግጅት ዝርዝር…" error={errors.descriptionAm?.message} {...register('descriptionAm')} />
        </div>

        <FileUpload type="image" label="Cover image" value={coverImage} onChange={(file) => setValue('coverImage', file)} hint="Optional event banner" />
        {event?.coverImage?.url && !coverImage && (
          <p className="-mt-3 text-xs text-gray-400">Current cover will be kept unless you upload a new one.</p>
        )}

        <Switch
          checked={watch('isFeatured')}
          onChange={(val) => setValue('isFeatured', val)}
          label="Featured event"
          description="Featured events are highlighted on the homepage"
        />
      </form>
    </Modal>
  );
};

export default EventFormModal;
