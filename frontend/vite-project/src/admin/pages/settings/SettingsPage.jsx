import { useEffect, useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import toast from 'react-hot-toast';
import { Building2, Share2, Video, Save, AlertTriangle, RefreshCw } from 'lucide-react';
import { PageHeader } from '../../components/ui/PageHeader';
import Button from '../../components/ui/Button';
import { Tabs } from '../../components/ui/Tabs';
import { FormSection } from '../../components/ui/FormSection';
import { Input, Textarea } from '../../components/ui/Input';
import { FileUpload } from '../../components/ui/FileUpload';
import { Spinner } from '../../components/ui/Loader';
import { settingService } from '../../services/system.service';
import { getErrorMessage } from '../../utils/api';
import { usePageMeta } from '../../hooks/usePageMeta';

const SaveBar = ({ onSave, loading }) => (
  <div className="mt-5 flex justify-end">
    <Button onClick={onSave} loading={loading}>
      <Save className="h-4 w-4" />
      Save changes
    </Button>
  </div>
);

const optional = () => z.string().optional().or(z.literal(''));

const addressShape = {
  street: optional('street'),
  city: optional('city'),
  region: optional('region'),
  country: optional('country'),
  postalCode: optional('postalCode'),
};

const generalSchema = z.object({
  churchName: z.string().min(2, 'Church name is required').max(200, 'Church name too long'),
  churchNameAm: optional('churchNameAm'),
  churchNameTi: optional('churchNameTi'),
  tagline: optional('tagline'),
  taglineAm: optional('taglineAm'),
  taglineTi: optional('taglineTi'),
  phone: optional('phone'),
  email: optional('email').refine((v) => !v || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v), {
    message: 'Enter a valid email address',
  }),
  address: z.object(addressShape),
  addressAm: z.object(addressShape),
  addressTi: z.object(addressShape),
  logo: z.any().nullable().optional(),
  favicon: z.any().nullable().optional(),
});

const socialSchema = z.object({
  facebook: optional('facebook').refine((v) => !v || /^https?:\/\/.+/.test(v), { message: 'Must be a valid http(s) URL' }),
  twitter: optional('twitter').refine((v) => !v || /^https?:\/\/.+/.test(v), { message: 'Must be a valid http(s) URL' }),
  instagram: optional('instagram').refine((v) => !v || /^https?:\/\/.+/.test(v), { message: 'Must be a valid http(s) URL' }),
  youtube: optional('youtube').refine((v) => !v || /^https?:\/\/.+/.test(v), { message: 'Must be a valid http(s) URL' }),
  telegram: optional('telegram').refine((v) => !v || /^https?:\/\/.+/.test(v), { message: 'Must be a valid http(s) URL' }),
  tiktok: optional('tiktok').refine((v) => !v || /^https?:\/\/.+/.test(v), { message: 'Must be a valid http(s) URL' }),
  footerText: optional('footerText'),
  footerTextAm: optional('footerTextAm'),
  footerTextTi: optional('footerTextTi'),
});

const GeneralForm = ({ settings }) => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (payload) => settingService.update(payload),
    onSuccess: () => {
      toast.success('Church profile updated');
      queryClient.invalidateQueries({ queryKey: ['settings'] });
    },
    onError: (error) => toast.error(getErrorMessage(error)),
  });

  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors },
  } = useForm({ resolver: zodResolver(generalSchema) });

  useEffect(() => {
    if (settings) {
      reset({
        churchName: settings.churchName || '',
        churchNameAm: settings.churchNameAm || '',
        churchNameTi: settings.churchNameTi || '',
        tagline: settings.tagline || '',
        taglineAm: settings.taglineAm || '',
        taglineTi: settings.taglineTi || '',
        phone: settings.phone || '',
        email: settings.email || '',
        address: settings.address || {},
        addressAm: settings.addressAm || {},
        addressTi: settings.addressTi || {},
      });
      setValue('logo', null);
      setValue('favicon', null);
    }
  }, [settings, reset, setValue]);

  if (!settings) return <div className="flex justify-center py-16"><Spinner /></div>;

  const onSubmit = (values) => {
    const { logo, favicon, ...rest } = values;
    mutation.mutate({
      ...rest,
      ...(logo instanceof File || logo instanceof Blob ? { logo } : {}),
      ...(favicon instanceof File || favicon instanceof Blob ? { favicon } : {}),
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <FormSection title="Church identity" description="Name, tagline and contact details shown across the site">
        <div className="grid gap-4 sm:grid-cols-3">
          <Input label="Church name (English)" error={errors.churchName?.message} {...register('churchName')} />
          <Input label="Church name (አማርኛ)" error={errors.churchNameAm?.message} {...register('churchNameAm')} />
          <Input label="Church name (ትግርኛ)" error={errors.churchNameTi?.message} {...register('churchNameTi')} />
          <Input label="Tagline (English)" {...register('tagline')} />
          <Input label="Tagline (አማርኛ)" {...register('taglineAm')} />
          <Input label="Tagline (ትግርኛ)" {...register('taglineTi')} />
          <Input label="Phone" {...register('phone')} />
          <Input label="Email" type="email" error={errors.email?.message} {...register('email')} />
        </div>
      </FormSection>

      <div className="mt-4 grid gap-4 lg:grid-cols-3">
        <FormSection title="Address" description="Postal address (English)">
          <div className="space-y-4">
            <Input label="Street" {...register('address.street')} />
            <div className="grid grid-cols-2 gap-4">
              <Input label="City" {...register('address.city')} />
              <Input label="Region" {...register('address.region')} />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <Input label="Country" {...register('address.country')} />
              <Input label="Postal code" {...register('address.postalCode')} />
            </div>
          </div>
        </FormSection>

        <FormSection title="Address (አማርኛ)" description="Postal address in Amharic">
          <div className="space-y-4">
            <Input label="መንገድ" {...register('addressAm.street')} />
            <div className="grid grid-cols-2 gap-4">
              <Input label="ከተማ" {...register('addressAm.city')} />
              <Input label="ክልል" {...register('addressAm.region')} />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <Input label="ሀገር" {...register('addressAm.country')} />
              <Input label="ፖስታ ኮድ" {...register('addressAm.postalCode')} />
            </div>
          </div>
        </FormSection>

        <FormSection title="Address (ትግርኛ)" description="Postal address in Tigrigna">
          <div className="space-y-4">
            <Input label="ጎደና" {...register('addressTi.street')} />
            <div className="grid grid-cols-2 gap-4">
              <Input label="ከተማ" {...register('addressTi.city')} />
              <Input label="ክልል" {...register('addressTi.region')} />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <Input label="ሃገር" {...register('addressTi.country')} />
              <Input label="ፖስታ ኮድ" {...register('addressTi.postalCode')} />
            </div>
          </div>
        </FormSection>
      </div>

      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        <FormSection title="Logo" description="Shown in the site header">
          <FileUpload type="image" label="Logo" value={watch('logo')} onChange={(f) => setValue('logo', f)} hint="Transparent PNG recommended" />
        </FormSection>
        <FormSection title="Favicon" description="Small icon in the browser tab">
          <FileUpload type="image" label="Favicon" value={watch('favicon')} onChange={(f) => setValue('favicon', f)} hint="Square, 32×32 or larger" />
        </FormSection>
      </div>

      <SaveBar onSave={handleSubmit(onSubmit)} loading={mutation.isPending} />
    </form>
  );
};

const LiveStreamForm = ({ settings }) => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (payload) => settingService.updateLiveStream(payload),
    onSuccess: () => {
      toast.success('Live stream settings saved');
      queryClient.invalidateQueries({ queryKey: ['settings'] });
    },
    onError: (error) => toast.error(getErrorMessage(error)),
  });

  const [liveStreamURL, setLiveStreamURL] = useState('');
  const [urlError, setUrlError] = useState('');

  useEffect(() => {
    if (settings) setLiveStreamURL(settings.liveStreamURL || '');
  }, [settings]);

  if (!settings) return <div className="flex justify-center py-16"><Spinner /></div>;

  const handleSave = () => {
    const url = liveStreamURL.trim();
    if (url && !/^https?:\/\/[^\s]+$/.test(url)) {
      setUrlError('Enter a valid http(s) URL (e.g. your YouTube live link)');
      return;
    }
    setUrlError('');
    mutation.mutate({ liveStreamURL: url || undefined });
  };

  return (
    <div>
      <FormSection title="Live stream" description="YouTube or other embed URL used for the live liturgy">
        <Input
          label="Live stream URL"
          placeholder="https://www.youtube.com/watch?v=…"
          value={liveStreamURL}
          onChange={(e) => {
            setLiveStreamURL(e.target.value);
            if (urlError) setUrlError('');
          }}
          error={urlError}
        />
      </FormSection>

      <SaveBar onSave={handleSave} loading={mutation.isPending} />
    </div>
  );
};

const SocialForm = ({ settings }) => {
  const queryClient = useQueryClient();
  const socialMutation = useMutation({
    mutationFn: (payload) => settingService.updateSocial(payload),
    onSuccess: () => {
      toast.success('Social links updated');
      queryClient.invalidateQueries({ queryKey: ['settings'] });
    },
    onError: (error) => toast.error(getErrorMessage(error)),
  });
  const footerMutation = useMutation({
    mutationFn: (payload) => settingService.updateFooter(payload),
    onSuccess: () => {
      toast.success('Footer updated');
      queryClient.invalidateQueries({ queryKey: ['settings'] });
    },
    onError: (error) => toast.error(getErrorMessage(error)),
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ resolver: zodResolver(socialSchema) });

  useEffect(() => {
    if (settings) {
      reset({
        ...settings.socialLinks,
        footerText: settings.footerText || '',
        footerTextAm: settings.footerTextAm || '',
        footerTextTi: settings.footerTextTi || '',
      });
    }
  }, [settings, reset]);

  if (!settings) return <div className="flex justify-center py-16"><Spinner /></div>;

  const onSubmit = (values) => {
    const { footerText, footerTextAm, footerTextTi, ...links } = values;
    socialMutation.mutate(links);
    footerMutation.mutate({
      footerText: footerText || undefined,
      footerTextAm: footerTextAm || undefined,
      footerTextTi: footerTextTi || undefined,
    });
  };

  const fields = ['facebook', 'twitter', 'instagram', 'youtube', 'telegram', 'tiktok'];

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <FormSection title="Social links" description="Profiles linked in the site footer and contact page">
        <div className="grid gap-4 sm:grid-cols-2">
          {fields.map((field) => (
            <Input key={field} label={field.charAt(0).toUpperCase() + field.slice(1)} placeholder={`https://${field}.com/…`} error={errors[field]?.message} {...register(field)} />
          ))}
        </div>
      </FormSection>

      <div className="mt-4">
        <FormSection title="Footer" description="Footer text shown at the bottom of every page">
          <div className="grid gap-4 sm:grid-cols-3">
            <Textarea label="Footer text (English)" rows={3} {...register('footerText')} />
            <Textarea label="Footer text (አማርኛ)" rows={3} {...register('footerTextAm')} />
            <Textarea label="Footer text (ትግርኛ)" rows={3} {...register('footerTextTi')} />
          </div>
        </FormSection>
      </div>

      <SaveBar onSave={handleSubmit(onSubmit)} loading={socialMutation.isPending || footerMutation.isPending} />
    </form>
  );
};

const TABS = [
  { key: 'general', label: 'General', icon: Building2 },
  { key: 'live', label: 'Live Stream', icon: Video },
  { key: 'social', label: 'Social & Footer', icon: Share2 },
];

export const SettingsPage = () => {
  usePageMeta('Settings');
  const [tab, setTab] = useState('general');

  const { data: settings, isLoading, isError, error, refetch } = useQuery({
    queryKey: ['settings'],
    queryFn: () => settingService.getAdmin(),
  });

  return (
    <div>
      <PageHeader
        title="Settings"
        subtitle="Configure the church website"
        breadcrumbs={[{ label: 'Settings' }]}
      />

      <div className="mb-4">
        <Tabs tabs={TABS.map(({ key, label }) => ({ key, label }))} onChange={setTab} />
      </div>

      {isLoading && <div className="flex justify-center py-16"><Spinner /></div>}

      {isError && !isLoading && (
        <div className="rounded-xl border border-red-200 bg-red-50 p-12 text-center dark:border-red-500/30 dark:bg-red-500/5">
          <AlertTriangle className="mx-auto h-10 w-10 text-red-400" />
          <p className="mt-3 text-sm font-medium text-red-700 dark:text-red-300">Failed to load settings</p>
          <p className="text-xs text-red-500 dark:text-red-400">{error?.message || 'There was a problem fetching settings. Please try again.'}</p>
          <div className="mt-4">
            <Button variant="secondary" onClick={() => refetch()}>
              <RefreshCw className="h-4 w-4" /> Retry
            </Button>
          </div>
        </div>
      )}

      {!isLoading && !isError && tab === 'general' && <GeneralForm settings={settings} />}
      {!isLoading && !isError && tab === 'live' && <LiveStreamForm settings={settings} />}
      {!isLoading && !isError && tab === 'social' && <SocialForm settings={settings} />}
    </div>
  );
};

export default SettingsPage;
