import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { ImageIcon } from 'lucide-react';
import { Input } from '../../components/ui/Input';
import Button from '../../components/ui/Button';
import { Modal } from '../../components/ui/Modal';
import { Switch } from '../../components/ui/Switch';
import { FileUpload } from '../../components/ui/FileUpload';
import { LanguageToggle } from '../../components/ui/FormSection';

const heroSlideSchema = z.object({
  title: z.string().optional().or(z.literal('')),
  titleAm: z.string().optional().or(z.literal('')),
  subtitle: z.string().optional().or(z.literal('')),
  subtitleAm: z.string().optional().or(z.literal('')),
  ctaText: z.string().optional().or(z.literal('')),
  ctaLink: z.string().optional().or(z.literal('')),
  isActive: z.boolean(),
});

export const HeroSlideModal = ({ open, onClose, slide, index, onSubmit, submitting }) => {
  const isEdit = index !== null && index !== undefined;

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(heroSlideSchema),
    defaultValues: {
      title: '',
      titleAm: '',
      subtitle: '',
      subtitleAm: '',
      ctaText: '',
      ctaLink: '',
      isActive: true,
    },
  });

  useEffect(() => {
    if (open) {
      reset({
        title: slide?.title || '',
        titleAm: slide?.titleAm || '',
        subtitle: slide?.subtitle || '',
        subtitleAm: slide?.subtitleAm || '',
        ctaText: slide?.ctaText || '',
        ctaLink: slide?.ctaLink || '',
        isActive: slide ? Boolean(slide.isActive) : true,
      });
      setValue('image', null);
    }
  }, [open, slide, reset, setValue]);

  const image = watch('image');

  const onFormSubmit = (values) => {
    onSubmit({
      ...values,
      index: isEdit ? index : undefined,
      image: image instanceof File || image instanceof Blob ? image : undefined,
    });
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      title={isEdit ? 'Edit Hero Slide' : 'Add Hero Slide'}
      subtitle="Slides are shown in the rotating banner on the homepage"
      size="lg"
      footer={
        <>
          <Button variant="secondary" onClick={onClose} type="button">
            Cancel
          </Button>
          <Button type="submit" form="hero-slide-form" loading={submitting}>
            {isEdit ? 'Save changes' : 'Add slide'}
          </Button>
        </>
      }
    >
      <form id="hero-slide-form" onSubmit={handleSubmit(onFormSubmit)} className="space-y-5" noValidate>
        <FileUpload
          type="image"
          label="Slide image"
          hint="Recommended size 1920x1080"
          value={image}
          onChange={(file) => setValue('image', file)}
          error={errors.image?.message}
        />
        {slide?.image?.url && !image && (
          <p className="-mt-3 flex items-center gap-1.5 text-xs text-gray-400">
            <ImageIcon className="h-3.5 w-3.5" />
            Current image will be kept unless you upload a new one.
          </p>
        )}

        <div className="flex items-center justify-between">
          <span className="text-xs font-medium text-gray-500 dark:text-gray-400">Content languages</span>
          <LanguageToggle activeLang="English" onToggle={() => {}} />
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <Input label="Title (English)" placeholder="Welcome to our church" error={errors.title?.message} {...register('title')} />
          <Input label="Title (አማርኛ)" placeholder="ወደ ቤተክርስቲያናችን እንኳን ደህና መጡ" error={errors.titleAm?.message} {...register('titleAm')} />
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <Input label="Subtitle (English)" placeholder="A short supporting line" error={errors.subtitle?.message} {...register('subtitle')} />
          <Input label="Subtitle (አማርኛ)" placeholder="አጭር ማብራሪያ" error={errors.subtitleAm?.message} {...register('subtitleAm')} />
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <Input label="Button text" placeholder="Learn more" error={errors.ctaText?.message} {...register('ctaText')} />
          <Input label="Button link" placeholder="/about" error={errors.ctaLink?.message} {...register('ctaLink')} />
        </div>

        <Switch
          checked={watch('isActive')}
          onChange={(val) => setValue('isActive', val)}
          label="Active slide"
          description="Only active slides are displayed on the website"
        />
      </form>
    </Modal>
  );
};

export default HeroSlideModal;
