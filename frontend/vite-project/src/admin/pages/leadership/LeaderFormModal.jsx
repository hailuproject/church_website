import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input, Select } from '../../components/ui/Input';
import Button from '../../components/ui/Button';
import { Modal } from '../../components/ui/Modal';
import { Switch } from '../../components/ui/Switch';
import { FileUpload } from '../../components/ui/FileUpload';
import { LanguageToggle } from '../../components/ui/FormSection';
import { LEADERSHIP_ROLES } from '../../constants/options';
import { useAuth } from '../../context/AuthContext';

const leaderSchema = z.object({
  name: z.string().min(3, 'Name is required (min 3 characters)').max(150, 'Name too long'),
  nameAm: z.string().optional().or(z.literal('')),
  title: z.string().optional().or(z.literal('')),
  titleAm: z.string().optional().or(z.literal('')),
  role: z.enum(LEADERSHIP_ROLES),
  bio: z.string().optional().or(z.literal('')),
  bioAm: z.string().optional().or(z.literal('')),
  email: z.string().email('Invalid email').optional().or(z.literal('')),
  phone: z.string().optional().or(z.literal('')),
  order: z.string().optional().or(z.literal('')),
  isActive: z.boolean(),
});

export const LeaderFormModal = ({ open, onClose, leader, onSubmit, submitting }) => {
  const { user } = useAuth();
  const isEdit = Boolean(leader?._id);

  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(leaderSchema),
    defaultValues: {
      name: '',
      nameAm: '',
      title: '',
      titleAm: '',
      role: 'Priest',
      bio: '',
      bioAm: '',
      email: '',
      phone: '',
      order: '',
      isActive: true,
    },
  });

  useEffect(() => {
    if (open) {
      if (leader?._id) {
        reset({
          name: leader.name || '',
          nameAm: leader.nameAm || '',
          title: leader.title || '',
          titleAm: leader.titleAm || '',
          role: leader.role || 'Priest',
          bio: leader.bio || '',
          bioAm: leader.bioAm || '',
          email: leader.email || '',
          phone: leader.phone || '',
          order: leader.order !== undefined ? String(leader.order) : '',
          isActive: Boolean(leader.isActive),
        });
      } else {
        reset({
          name: '',
          nameAm: '',
          title: '',
          titleAm: '',
          role: 'Priest',
          bio: '',
          bioAm: '',
          email: '',
          phone: '',
          order: '',
          isActive: true,
        });
      }
      setValue('photo', null);
    }
  }, [open, leader, reset, setValue]);

  const photo = watch('photo');

  const onFormSubmit = (values) => {
    onSubmit({
      ...values,
      name: values.name.trim(),
      nameAm: values.nameAm.trim() || undefined,
      title: values.title.trim() || undefined,
      titleAm: values.titleAm.trim() || undefined,
      bio: values.bio || undefined,
      bioAm: values.bioAm || undefined,
      email: values.email.trim() || undefined,
      phone: values.phone.trim() || undefined,
      order: values.order === '' ? undefined : Number(values.order),
      createdBy: isEdit ? undefined : user?._id,
      photo: photo instanceof File || photo instanceof Blob ? photo : undefined,
    });
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      title={isEdit ? 'Edit Leader' : 'Add Leader'}
      subtitle="Leadership members are shown on the About page"
      size="lg"
      footer={
        <>
          <Button variant="secondary" onClick={onClose} type="button">
            Cancel
          </Button>
          <Button type="submit" form="leader-form" loading={submitting}>
            {isEdit ? 'Save changes' : 'Add leader'}
          </Button>
        </>
      }
    >
      <form id="leader-form" onSubmit={handleSubmit(onFormSubmit)} className="space-y-5" noValidate>
        <div className="grid gap-4 sm:grid-cols-2">
          <Input label="Name" placeholder="Abune Gebre" required error={errors.name?.message} {...register('name')} />
          <Input label="Name (አማርኛ)" placeholder="አቡነ ገብረ" error={errors.nameAm?.message} {...register('nameAm')} />
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <Input label="Title (English)" placeholder="Head Priest" error={errors.title?.message} {...register('title')} />
          <Input label="Title (አማርኛ)" placeholder="የመተዳደሪያ ካህን" error={errors.titleAm?.message} {...register('titleAm')} />
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <Select label="Role" required error={errors.role?.message} {...register('role')}>
            {LEADERSHIP_ROLES.map((role) => (
              <option key={role} value={role}>
                {role}
              </option>
            ))}
          </Select>
          <Input label="Display order" type="number" placeholder="0" error={errors.order?.message} {...register('order')} />
        </div>
        <div className="flex items-center justify-between">
          <span className="text-xs font-medium text-gray-500 dark:text-gray-400">Content languages</span>
          <LanguageToggle activeLang="English" onToggle={() => {}} />
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <Input label="Bio (English)" placeholder="A short biography…" error={errors.bio?.message} {...register('bio')} />
          <Input label="Bio (አማርኛ)" placeholder="አጭር የህይወት ታሪክ…" error={errors.bioAm?.message} {...register('bioAm')} />
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <Input label="Email" type="email" placeholder="leader@church.org" error={errors.email?.message} {...register('email')} />
          <Input label="Phone" placeholder="+251…" error={errors.phone?.message} {...register('phone')} />
        </div>
        <FileUpload type="image" label="Photo" value={photo} onChange={(file) => setValue('photo', file)} hint="Optional portrait photo" />
        {leader?.photo?.url && !photo && (
          <p className="-mt-3 text-xs text-gray-400">Current photo will be kept unless you upload a new one.</p>
        )}
        <Switch
          checked={watch('isActive')}
          onChange={(val) => setValue('isActive', val)}
          label="Visible on website"
          description="Only active leaders are shown publicly"
        />
      </form>
    </Modal>
  );
};

export default LeaderFormModal;
