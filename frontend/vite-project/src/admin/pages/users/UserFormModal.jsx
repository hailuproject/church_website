import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { UserRound } from 'lucide-react';
import { Input, Select } from '../../components/ui/Input';
import Button from '../../components/ui/Button';
import { Modal } from '../../components/ui/Modal';
import { Switch } from '../../components/ui/Switch';
import { ROLE_VALUES } from '../../constants/options';

const schema = z
  .object({
    name: z.string().min(2, 'Name is required').max(100),
    email: z.string().email('Enter a valid email'),
    phone: z.string().optional().or(z.literal('')),
    role: z.enum(ROLE_VALUES),
    isActive: z.boolean(),
    password: z.string().optional().or(z.literal('')),
  })
  .superRefine((data, ctx) => {
    if (data.isEdit) {
      if (data.password && data.password.length < 8) {
        ctx.addIssue({ code: z.ZodIssueCode.custom, message: 'Password must be at least 8 characters', path: ['password'] });
      }
    } else if (!data.password || data.password.length < 8) {
      ctx.addIssue({ code: z.ZodIssueCode.custom, message: 'Password is required (min 8 characters)', path: ['password'] });
    }
  });

export const UserFormModal = ({ open, onClose, user, onSubmit, submitting, canManageSecurity }) => {
  const isEdit = Boolean(user?._id);

  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: { name: '', email: '', phone: '', role: 'Admin', isActive: true, password: '', isEdit: false },
  });

  useEffect(() => {
    if (open) {
      reset({
        name: user?.name || '',
        email: user?.email || '',
        phone: user?.phone || '',
        role: user?.role || 'Admin',
        isActive: user?.isActive !== false,
        password: '',
        isEdit: isEdit,
      });
    }
  }, [open, user, isEdit, reset]);

  const onFormSubmit = (values) => {
    const payload = {
      name: values.name.trim(),
      email: values.email.trim(),
      phone: values.phone.trim() || undefined,
      role: values.role,
    };
    if (isEdit) {
      if (canManageSecurity) {
        payload.isActive = values.isActive;
        if (values.password) payload.password = values.password;
      }
    } else {
      payload.isActive = values.isActive;
      payload.password = values.password;
    }
    onSubmit(payload);
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      title={isEdit ? 'Edit User' : 'Add User'}
      subtitle="Administrative staff who can sign in to the dashboard"
      footer={
        <>
          <Button variant="secondary" onClick={onClose} type="button">
            Cancel
          </Button>
          <Button type="submit" form="user-form" loading={submitting}>
            {isEdit ? 'Save changes' : 'Create user'}
          </Button>
        </>
      }
    >
      <form id="user-form" onSubmit={handleSubmit(onFormSubmit)} className="space-y-4" noValidate>
        <div className="grid gap-4 sm:grid-cols-2">
          <Input label="Full name" placeholder="Abebe Kebede" required error={errors.name?.message} {...register('name')} />
          <Input label="Email" type="email" placeholder="user@church.org" required error={errors.email?.message} {...register('email')} />
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <Input label="Phone" placeholder="+251 9xx xxx xxx" error={errors.phone?.message} {...register('phone')} />
          <Select label="Role" error={errors.role?.message} {...register('role')}>
            {ROLE_VALUES.map((r) => (
              <option key={r} value={r}>{r}</option>
            ))}
          </Select>
        </div>

        {(isEdit ? canManageSecurity : true) && (
          <Input
            label={isEdit ? 'New password (optional)' : 'Password'}
            type="password"
            placeholder={isEdit ? 'Leave blank to keep current' : 'Min 8 characters'}
            required={!isEdit}
            error={errors.password?.message}
            {...register('password')}
          />
        )}

        {isEdit && !canManageSecurity && (
          <p className="text-xs text-gray-400">Only a Super Admin can reset passwords.</p>
        )}

        {!isEdit && (
          <div className="flex items-start gap-3 rounded-xl bg-primary-50 p-3 text-xs text-primary-700 dark:bg-primary-500/10 dark:text-primary-300">
            <UserRound className="mt-0.5 h-4 w-4 shrink-0" />
            <span>Provide a temporary password — the user can change it after their first sign-in.</span>
          </div>
        )}

        {(isEdit ? canManageSecurity : true) && (
          <Switch
            checked={watch('isActive')}
            onChange={(val) => setValue('isActive', val)}
            label="Account active"
            description="Deactivated users cannot sign in"
          />
        )}
      </form>
    </Modal>
  );
};

export default UserFormModal;
