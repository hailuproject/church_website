import { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import toast from 'react-hot-toast';
import { Camera, KeyRound } from 'lucide-react';
import { PageHeader } from '../../components/ui/PageHeader';
import { Card, CardContent, CardHeader } from '../../components/ui/Card';
import { Avatar } from '../../components/ui/Avatar';
import { Input } from '../../components/ui/Input';
import Button from '../../components/ui/Button';
import { Tabs } from '../../components/ui/Tabs';
import { useAuth } from '../../context/AuthContext';
import { authService } from '../../services/auth.service';
import { getErrorMessage } from '../../utils/api';
import { ChangePasswordForm } from './ChangePasswordPage';
import { usePageMeta } from '../../hooks/usePageMeta';

const profileSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(100, 'Name too long'),
  phone: z.string().optional(),
});

export const ProfilePage = () => {
  usePageMeta('Profile');
  const { user, updateUser } = useAuth();
  const [tab, setTab] = useState('profile');
  const [uploadingAvatar, setUploadingAvatar] = useState(false);
  const avatarInputRef = useRef(null);
  const [saving, setSaving] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(profileSchema),
    defaultValues: { name: user?.name || '', phone: user?.phone || '' },
  });

  const onSaveProfile = async (values) => {
    setSaving(true);
    try {
      const updated = await authService.updateProfile(values);
      updateUser(updated);
      toast.success('Profile updated successfully');
    } catch (error) {
      toast.error(getErrorMessage(error));
    } finally {
      setSaving(false);
    }
  };

  const onAvatarChange = async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    setUploadingAvatar(true);
    try {
      const updated = await authService.uploadAvatar(file);
      updateUser(updated);
      toast.success('Avatar updated');
    } catch (error) {
      toast.error(getErrorMessage(error, 'Avatar upload failed'));
    } finally {
      setUploadingAvatar(false);
      if (avatarInputRef.current) avatarInputRef.current.value = '';
    }
  };

  return (
    <div>
      <PageHeader title="My Profile" subtitle="Manage your account information and security" />
      <Tabs
        tabs={[
          { key: 'profile', label: 'Profile' },
          { key: 'password', label: 'Change Password' },
        ]}
        onChange={setTab}
      />

      <div className="mt-6 grid gap-6 lg:grid-cols-3">
        <div className="space-y-6">
          <Card>
            <CardContent className="flex flex-col items-center py-8 text-center">
              <div className="relative">
                <Avatar name={user?.name} src={user?.avatar} size="xl" />
                <button
                  type="button"
                  onClick={() => avatarInputRef.current?.click()}
                  disabled={uploadingAvatar}
                  className="absolute -bottom-1 -right-1 rounded-full bg-primary-500 p-2 text-white shadow-lg transition-colors hover:bg-primary-600 disabled:opacity-60"
                  aria-label="Upload avatar"
                >
                  <Camera className="h-4 w-4" />
                </button>
                <input
                  ref={avatarInputRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={onAvatarChange}
                />
              </div>
              <h3 className="mt-4 text-base font-semibold text-gray-900 dark:text-gray-100">{user?.name}</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">{user?.email}</p>
              <span className="mt-2 rounded-full bg-primary-50 px-3 py-1 text-xs font-medium text-primary-700 dark:bg-primary-500/10 dark:text-primary-300">
                {user?.role}
              </span>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-2">
          {tab === 'profile' ? (
            <Card>
              <CardHeader title="Account Information" subtitle="Update your personal details" />
              <CardContent>
                <form onSubmit={handleSubmit(onSaveProfile)} className="space-y-4" noValidate>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <Input label="Full name" error={errors.name?.message} {...register('name')} />
                    <Input label="Phone" placeholder="+2519…" error={errors.phone?.message} {...register('phone')} />
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <Input label="Email" value={user?.email || ''} disabled />
                    <Input label="Role" value={user?.role || ''} disabled />
                  </div>
                  <div className="flex justify-end">
                    <Button type="submit" loading={saving}>
                      Save changes
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardHeader title="Change Password" subtitle="Update your account password" />
              <CardContent>
                <ChangePasswordForm reset={() => reset()} />
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
