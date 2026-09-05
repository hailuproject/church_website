import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { BookOpen } from 'lucide-react';
import { Input, Select, Textarea } from '../../components/ui/Input';
import Button from '../../components/ui/Button';
import { Modal } from '../../components/ui/Modal';
import { Switch } from '../../components/ui/Switch';
import { FileUpload } from '../../components/ui/FileUpload';
import { LanguageToggle } from '../../components/ui/FormSection';
import { RESOURCE_CATEGORIES, RESOURCE_LANGUAGES } from '../../constants/options';
import { useAuth } from '../../context/AuthContext';

const resourceSchema = z.object({
  title: z.string().min(3, 'Title is required (min 3 characters)').max(250, 'Title too long'),
  titleAm: z.string().optional().or(z.literal('')),
  titleTi: z.string().optional().or(z.literal('')),
  description: z.string().optional().or(z.literal('')),
  descriptionAm: z.string().optional().or(z.literal('')),
  descriptionTi: z.string().optional().or(z.literal('')),
  category: z.enum(RESOURCE_CATEGORIES),
  language: z.enum(RESOURCE_LANGUAGES),
  isPublished: z.boolean(),
});

export const ResourceFormModal = ({ open, onClose, resource, onSubmit, submitting }) => {
  const { user } = useAuth();
  const isEdit = Boolean(resource?._id);
  const [activeLang, setActiveLang] = useState('English');

  const langDim = (lang) => (activeLang === lang ? '' : 'opacity-40');

  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(resourceSchema),
    defaultValues: {
      title: '',
      titleAm: '',
      titleTi: '',
      description: '',
      descriptionAm: '',
      descriptionTi: '',
      category: 'Books',
      language: 'English',
      isPublished: true,
    },
  });

  useEffect(() => {
    if (open) {
      if (resource?._id) {
        reset({
          title: resource.title || '',
          titleAm: resource.titleAm || '',
          titleTi: resource.titleTi || '',
          description: resource.description || '',
          descriptionAm: resource.descriptionAm || '',
          descriptionTi: resource.descriptionTi || '',
          category: resource.category || 'Books',
          language: resource.language || 'English',
          isPublished: Boolean(resource.isPublished),
        });
      } else {
        reset({
          title: '',
          titleAm: '',
      titleTi: '',
          description: '',
          descriptionAm: '',
      descriptionTi: '',
          category: 'Books',
          language: 'English',
          isPublished: true,
        });
      }
      setValue('thumbnail', null);
    }
  }, [open, resource, reset, setValue]);

  const thumbnail = watch('thumbnail');

  const onFormSubmit = (values) => {
    onSubmit({
      ...values,
      title: values.title.trim(),
      titleAm: values.titleAm.trim() || undefined,
      titleTi: values.titleTi.trim() || undefined,
      description: values.description || undefined,
      descriptionAm: values.descriptionAm || undefined,
      descriptionTi: values.descriptionTi || undefined,
      createdBy: user?._id,
      thumbnail: thumbnail instanceof File || thumbnail instanceof Blob ? thumbnail : undefined,
    });
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      title={isEdit ? 'Edit Resource' : 'Add Resource'}
      subtitle="Books, prayers, and documents shared with the community"
      size="lg"
      footer={
        <>
          <Button variant="secondary" onClick={onClose} type="button">
            Cancel
          </Button>
          <Button type="submit" form="resource-form" loading={submitting}>
            {isEdit ? 'Save changes' : 'Create resource'}
          </Button>
        </>
      }
    >
      <form id="resource-form" onSubmit={handleSubmit(onFormSubmit)} className="space-y-5" noValidate>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400">
            <BookOpen className="h-4 w-4" />
            <span className="text-xs font-medium">Content languages</span>
          </div>
          <LanguageToggle activeLang={activeLang} onToggle={setActiveLang} />
        </div>

        <div className="grid gap-4 sm:grid-cols-3">
          <div className={langDim('English')}>
            <Input label="Title (English)" placeholder="The Book of Psalms" required error={errors.title?.message} {...register('title')} />
          </div>
          <div className={langDim('Amharic')}>
            <Input label="Title (አማርኛ)" placeholder="መዝሙረ ዳዊት" error={errors.titleAm?.message} {...register('titleAm')} />
          </div>
          <div className={langDim('Tigrigna')}>
            <Input label="Title (ትግርኛ)" placeholder="መዝሙር ዳዊት" error={errors.titleTi?.message} {...register('titleTi')} />
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <Select label="Category" error={errors.category?.message} {...register('category')}>
            {RESOURCE_CATEGORIES.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </Select>
          <Select label="Language" error={errors.language?.message} {...register('language')}>
            {RESOURCE_LANGUAGES.map((l) => (
              <option key={l} value={l}>{l}</option>
            ))}
          </Select>
        </div>

        <div className="grid gap-4 sm:grid-cols-3">
          <div className={langDim('English')}>
            <Textarea label="Description (English)" placeholder="About this resource…" error={errors.description?.message} {...register('description')} />
          </div>
          <div className={langDim('Amharic')}>
            <Textarea label="Description (አማርኛ)" placeholder="ስለ ግብዓቱ…" error={errors.descriptionAm?.message} {...register('descriptionAm')} />
          </div>
          <div className={langDim('Tigrigna')}>
            <Textarea label="Description (ትግርኛ)" placeholder="ብዛዕባ ሓገዝቲ…" error={errors.descriptionTi?.message} {...register('descriptionTi')} />
          </div>
        </div>

        <FileUpload type="image" label="Thumbnail" value={thumbnail} onChange={(file) => setValue('thumbnail', file)} hint="Optional cover image" />
        {resource?.thumbnail?.url && !thumbnail && (
          <p className="-mt-3 text-xs text-gray-400">Current thumbnail will be kept unless you upload a new one.</p>
        )}

        <Switch
          checked={watch('isPublished')}
          onChange={(val) => setValue('isPublished', val)}
          label="Publish"
          description="Published resources are visible on the website"
        />
      </form>
    </Modal>
  );
};

export default ResourceFormModal;
