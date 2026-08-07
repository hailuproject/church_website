import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Mic2 } from 'lucide-react';
import { Input, Select, Textarea } from '../../components/ui/Input';
import Button from '../../components/ui/Button';
import { Modal } from '../../components/ui/Modal';
import { Switch } from '../../components/ui/Switch';
import { FileUpload } from '../../components/ui/FileUpload';
import { LanguageToggle } from '../../components/ui/FormSection';
import { SERMON_CATEGORIES, SERMON_LANGUAGES } from '../../constants/options';
import { useAuth } from '../../context/AuthContext';

const sermonSchema = z.object({
  title: z.string().min(3, 'Title is required (min 3 characters)').max(250, 'Title too long'),
  titleAm: z.string().optional().or(z.literal('')),
  description: z.string().optional().or(z.literal('')),
  descriptionAm: z.string().optional().or(z.literal('')),
  speaker: z.string().optional().or(z.literal('')),
  scripture: z.string().optional().or(z.literal('')),
  category: z.enum(SERMON_CATEGORIES),
  language: z.enum(SERMON_LANGUAGES),
  duration: z.string().optional().or(z.literal('')),
  isPublished: z.boolean(),
  isFeatured: z.boolean(),
});

export const SermonFormModal = ({ open, onClose, sermon, onSubmit, submitting }) => {
  const { user } = useAuth();
  const isEdit = Boolean(sermon?._id);

  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(sermonSchema),
    defaultValues: {
      title: '',
      titleAm: '',
      description: '',
      descriptionAm: '',
      speaker: '',
      scripture: '',
      category: 'Sunday Sermon',
      language: 'English',
      duration: '',
      isPublished: true,
      isFeatured: false,
    },
  });

  useEffect(() => {
    if (open) {
      if (sermon?._id) {
        reset({
          title: sermon.title || '',
          titleAm: sermon.titleAm || '',
          description: sermon.description || '',
          descriptionAm: sermon.descriptionAm || '',
          speaker: sermon.speaker || '',
          scripture: sermon.scripture || '',
          category: sermon.category || 'Sunday Sermon',
          language: sermon.language || 'English',
          duration: sermon.duration ? String(sermon.duration) : '',
          isPublished: Boolean(sermon.isPublished),
          isFeatured: Boolean(sermon.isFeatured),
        });
      } else {
        reset({
          title: '',
          titleAm: '',
          description: '',
          descriptionAm: '',
          speaker: '',
          scripture: '',
          category: 'Sunday Sermon',
          language: 'English',
          duration: '',
          isPublished: true,
          isFeatured: false,
        });
      }
      setValue('thumbnail', null);
    }
  }, [open, sermon, reset, setValue]);

  const thumbnail = watch('thumbnail');

  const onFormSubmit = (values) => {
    onSubmit({
      ...values,
      title: values.title.trim(),
      titleAm: values.titleAm.trim() || undefined,
      description: values.description || undefined,
      descriptionAm: values.descriptionAm || undefined,
      speaker: values.speaker.trim() || undefined,
      scripture: values.scripture.trim() || undefined,
      duration: values.duration === '' ? undefined : Number(values.duration),
      createdBy: user?._id,
      thumbnail: thumbnail instanceof File || thumbnail instanceof Blob ? thumbnail : undefined,
    });
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      title={isEdit ? 'Edit Sermon' : 'Add Sermon'}
      subtitle="Sermon recordings and notes shown on the website"
      size="lg"
      footer={
        <>
          <Button variant="secondary" onClick={onClose} type="button">
            Cancel
          </Button>
          <Button type="submit" form="sermon-form" loading={submitting}>
            {isEdit ? 'Save changes' : 'Create sermon'}
          </Button>
        </>
      }
    >
      <form id="sermon-form" onSubmit={handleSubmit(onFormSubmit)} className="space-y-5" noValidate>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400">
            <Mic2 className="h-4 w-4" />
            <span className="text-xs font-medium">Content languages</span>
          </div>
          <LanguageToggle activeLang="English" onToggle={() => {}} />
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <Input label="Title (English)" placeholder="The mystery of the Holy Trinity" required error={errors.title?.message} {...register('title')} />
          <Input label="Title (አማርኛ)" placeholder="የቅድስት ሥላሴ ምስጢር" error={errors.titleAm?.message} {...register('titleAm')} />
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <Input label="Speaker" placeholder="Fr. Aba Gebre" error={errors.speaker?.message} {...register('speaker')} />
          <Input label="Scripture reference" placeholder="John 1:1-14" error={errors.scripture?.message} {...register('scripture')} />
        </div>

        <div className="grid gap-4 sm:grid-cols-3">
          <Select label="Category" error={errors.category?.message} {...register('category')}>
            {SERMON_CATEGORIES.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </Select>
          <Select label="Language" error={errors.language?.message} {...register('language')}>
            {SERMON_LANGUAGES.map((l) => (
              <option key={l} value={l}>{l}</option>
            ))}
          </Select>
          <Input label="Duration (minutes)" type="number" min="0" placeholder="45" error={errors.duration?.message} {...register('duration')} />
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <Textarea label="Description (English)" placeholder="Summary of the sermon…" error={errors.description?.message} {...register('description')} />
          <Textarea label="Description (አማርኛ)" placeholder="የስብከቱ ማጠቃለያ…" error={errors.descriptionAm?.message} {...register('descriptionAm')} />
        </div>

        <FileUpload type="image" label="Thumbnail" value={thumbnail} onChange={(file) => setValue('thumbnail', file)} hint="Cover image shown on the website" />
        {sermon?.thumbnail?.url && !thumbnail && (
          <p className="-mt-3 text-xs text-gray-400">Current thumbnail will be kept unless you upload a new one.</p>
        )}

        <div className="grid gap-3 sm:grid-cols-2">
          <Switch
            checked={watch('isPublished')}
            onChange={(val) => setValue('isPublished', val)}
            label="Publish"
            description="Published sermons are visible on the website"
          />
          <Switch
            checked={watch('isFeatured')}
            onChange={(val) => setValue('isFeatured', val)}
            label="Featured"
            description="Featured sermons appear in the homepage highlight"
          />
        </div>
      </form>
    </Modal>
  );
};

export default SermonFormModal;
