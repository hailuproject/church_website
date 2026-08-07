import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Images } from 'lucide-react';
import { Input, Select, Textarea } from '../../components/ui/Input';
import Button from '../../components/ui/Button';
import { Modal } from '../../components/ui/Modal';
import { FileUpload } from '../../components/ui/FileUpload';
import { LanguageToggle } from '../../components/ui/FormSection';
import { GALLERY_CATEGORIES } from '../../constants/options';
import { useAuth } from '../../context/AuthContext';

const albumSchema = z.object({
  albumName: z.string().min(3, 'Album name is required (min 3 characters)').max(200, 'Name too long'),
  albumNameAm: z.string().optional().or(z.literal('')),
  description: z.string().optional().or(z.literal('')),
  descriptionAm: z.string().optional().or(z.literal('')),
  category: z.enum(GALLERY_CATEGORIES),
});

export const AlbumFormModal = ({ open, onClose, album, onSubmit, submitting }) => {
  const { user } = useAuth();
  const isEdit = Boolean(album?._id);

  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(albumSchema),
    defaultValues: {
      albumName: '',
      albumNameAm: '',
      description: '',
      descriptionAm: '',
      category: 'Liturgy',
    },
  });

  useEffect(() => {
    if (open) {
      if (album?._id) {
        reset({
          albumName: album.albumName || '',
          albumNameAm: album.albumNameAm || '',
          description: album.description || '',
          descriptionAm: album.descriptionAm || '',
          category: album.category || 'Liturgy',
        });
      } else {
        reset({
          albumName: '',
          albumNameAm: '',
          description: '',
          descriptionAm: '',
          category: 'Liturgy',
        });
      }
      setValue('coverImage', null);
    }
  }, [open, album, reset, setValue]);

  const coverImage = watch('coverImage');

  const onFormSubmit = (values) => {
    onSubmit({
      ...values,
      albumName: values.albumName.trim(),
      albumNameAm: values.albumNameAm.trim() || undefined,
      description: values.description || undefined,
      descriptionAm: values.descriptionAm || undefined,
      createdBy: user?._id,
      coverImage: coverImage instanceof File || coverImage instanceof Blob ? coverImage : undefined,
    });
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      title={isEdit ? 'Edit Album' : 'Create Album'}
      subtitle="Photo and video albums shown in the gallery"
      size="lg"
      footer={
        <>
          <Button variant="secondary" onClick={onClose} type="button">
            Cancel
          </Button>
          <Button type="submit" form="album-form" loading={submitting}>
            {isEdit ? 'Save changes' : 'Create album'}
          </Button>
        </>
      }
    >
      <form id="album-form" onSubmit={handleSubmit(onFormSubmit)} className="space-y-5" noValidate>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400">
            <Images className="h-4 w-4" />
            <span className="text-xs font-medium">Content languages</span>
          </div>
          <LanguageToggle activeLang="English" onToggle={() => {}} />
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <Input label="Album name (English)" placeholder="Timket Celebration" required error={errors.albumName?.message} {...register('albumName')} />
          <Input label="Album name (አማርኛ)" placeholder="የጥምቀት በዓል" error={errors.albumNameAm?.message} {...register('albumNameAm')} />
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <Select label="Category" error={errors.category?.message} {...register('category')}>
            {GALLERY_CATEGORIES.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </Select>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <Textarea label="Description (English)" placeholder="About this album…" error={errors.description?.message} {...register('description')} />
          <Textarea label="Description (አማርኛ)" placeholder="ስለ አልበሙ…" error={errors.descriptionAm?.message} {...register('descriptionAm')} />
        </div>

        <FileUpload type="image" label="Cover image" value={coverImage} onChange={(file) => setValue('coverImage', file)} hint="Optional album cover" />
        {album?.coverImage?.url && !coverImage && (
          <p className="-mt-3 text-xs text-gray-400">Current cover will be kept unless you upload a new one.</p>
        )}
      </form>
    </Modal>
  );
};

export default AlbumFormModal;
