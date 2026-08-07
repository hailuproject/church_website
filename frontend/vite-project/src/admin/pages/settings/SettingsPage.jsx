import { useEffect, useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { Building2, Home, Palette, Share2, Save } from 'lucide-react';
import { PageHeader } from '../../components/ui/PageHeader';
import Button from '../../components/ui/Button';
import { Tabs } from '../../components/ui/Tabs';
import { FormSection } from '../../components/ui/FormSection';
import { Input, Select, Textarea } from '../../components/ui/Input';
import { Switch } from '../../components/ui/Switch';
import { FileUpload } from '../../components/ui/FileUpload';
import { Spinner } from '../../components/ui/Loader';
import { settingService } from '../../services/system.service';
import { getErrorMessage } from '../../utils/api';
import { LANGUAGES } from '../../constants/options';
import { usePageMeta } from '../../hooks/usePageMeta';

const SaveBar = ({ onSave, loading }) => (
  <div className="mt-5 flex justify-end">
    <Button onClick={onSave} loading={loading}>
      <Save className="h-4 w-4" />
      Save changes
    </Button>
  </div>
);

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

  const { register, handleSubmit, reset, watch, setValue } = useForm();

  useEffect(() => {
    if (settings) {
      reset({
        churchName: settings.churchName || '',
        churchNameAm: settings.churchNameAm || '',
        tagline: settings.tagline || '',
        taglineAm: settings.taglineAm || '',
        phone: settings.phone || '',
        email: settings.email || '',
        address: settings.address || {},
        addressAm: settings.addressAm || {},
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
        <div className="grid gap-4 sm:grid-cols-2">
          <Input label="Church name (English)" {...register('churchName')} />
          <Input label="Church name (አማርኛ)" {...register('churchNameAm')} />
          <Input label="Tagline (English)" {...register('tagline')} />
          <Input label="Tagline (አማርኛ)" {...register('taglineAm')} />
          <Input label="Phone" {...register('phone')} />
          <Input label="Email" type="email" {...register('email')} />
        </div>
      </FormSection>

      <div className="mt-4 grid gap-4 lg:grid-cols-2">
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

const HomepageForm = ({ settings }) => {
  const queryClient = useQueryClient();
  const heroMutation = useMutation({
    mutationFn: (payload) => settingService.update(payload),
    onSuccess: () => {
      toast.success('Homepage hero updated');
      queryClient.invalidateQueries({ queryKey: ['settings'] });
    },
    onError: (error) => toast.error(getErrorMessage(error)),
  });
  const liveMutation = useMutation({
    mutationFn: (payload) => settingService.updateLiveStream(payload),
    onSuccess: () => toast.success('Live stream settings saved'),
    onError: (error) => toast.error(getErrorMessage(error)),
  });
  const languageMutation = useMutation({
    mutationFn: (payload) => settingService.updateLanguage(payload),
    onSuccess: () => {
      toast.success('Language settings saved');
      queryClient.invalidateQueries({ queryKey: ['settings'] });
    },
    onError: (error) => toast.error(getErrorMessage(error)),
  });

  const [heroFile, setHeroFile] = useState(null);
  const [liveStreamURL, setLiveStreamURL] = useState('');
  const [defaultLanguage, setDefaultLanguage] = useState('english');
  const [allowSwitch, setAllowSwitch] = useState(true);

  useEffect(() => {
    if (settings) {
      setLiveStreamURL(settings.liveStreamURL || '');
      setDefaultLanguage(settings.languageSettings?.defaultLanguage || 'english');
      setAllowSwitch(settings.languageSettings?.allowLanguageSwitch !== false);
    }
  }, [settings]);

  if (!settings) return <div className="flex justify-center py-16"><Spinner /></div>;

  const saveAll = () => {
    if (heroFile instanceof File || heroFile instanceof Blob) heroMutation.mutate({ heroImage: heroFile });
    liveMutation.mutate({ liveStreamURL });
    languageMutation.mutate({
      defaultLanguage,
      supportedLanguages: ['english', 'amharic'],
      allowLanguageSwitch: allowSwitch,
    });
  };

  const busy = heroMutation.isPending || liveMutation.isPending || languageMutation.isPending;

  return (
    <div>
      <FormSection title="Hero image" description="Large banner image on the homepage">
        <FileUpload type="image" label="Hero image" value={heroFile} onChange={setHeroFile} hint="Wide image, 1920×1080 recommended" />
        {!heroFile && settings.heroImage?.url && (
          <div className="mt-3 overflow-hidden rounded-xl border border-gray-200 dark:border-gray-700">
            <img src={settings.heroImage.url} alt="Current hero" className="max-h-48 w-full object-cover" />
          </div>
        )}
      </FormSection>

      <div className="mt-4">
        <FormSection title="Live stream" description="YouTube or other embed URL used for the live liturgy">
          <Input
            label="Live stream URL"
            placeholder="https://www.youtube.com/watch?v=…"
            value={liveStreamURL}
            onChange={(e) => setLiveStreamURL(e.target.value)}
          />
        </FormSection>
      </div>

      <div className="mt-4">
        <FormSection title="Languages" description="Default language and language switching behaviour">
          <div className="space-y-4">
            <Select label="Default language" value={defaultLanguage} onChange={(e) => setDefaultLanguage(e.target.value)}>
              {LANGUAGES.map((l) => (
                <option key={l.value} value={l.value}>{l.label}</option>
              ))}
            </Select>
            <Switch
              checked={allowSwitch}
              onChange={setAllowSwitch}
              label="Allow language switching"
              description="Visitors can toggle between English and Amharic"
            />
          </div>
        </FormSection>
      </div>

      <SaveBar onSave={saveAll} loading={busy} />
    </div>
  );
};

const AppearanceForm = ({ settings }) => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (payload) => settingService.updateTheme(payload),
    onSuccess: () => {
      toast.success('Appearance updated');
      queryClient.invalidateQueries({ queryKey: ['settings'] });
    },
    onError: (error) => toast.error(getErrorMessage(error)),
  });

  const { register, handleSubmit, reset, watch, setValue } = useForm();

  useEffect(() => {
    if (settings?.theme) reset(settings.theme);
  }, [settings, reset]);
  if (!settings) return <div className="flex justify-center py-16"><Spinner /></div>;

  const onSubmit = (values) => mutation.mutate(values);

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <FormSection title="Theme" description="Colors and typography used across the website">
        <div className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">Primary color</label>
              <div className="flex items-center gap-3">
                <input type="color" className="h-10 w-14 cursor-pointer rounded-lg border border-gray-200 bg-white dark:border-gray-700" {...register('primaryColor')} />
                <Input {...register('primaryColor')} />
              </div>
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">Secondary color</label>
              <div className="flex items-center gap-3">
                <input type="color" className="h-10 w-14 cursor-pointer rounded-lg border border-gray-200 bg-white dark:border-gray-700" {...register('secondaryColor')} />
                <Input {...register('secondaryColor')} />
              </div>
            </div>
          </div>
          <Input label="Font family" placeholder="Georgia" {...register('fontFamily')} />
          <Switch
            checked={Boolean(watch('darkMode'))}
            onChange={(val) => setValue('darkMode', val)}
            label="Default to dark mode"
            description="Site visitors see the dark theme first"
          />
        </div>
      </FormSection>

      <SaveBar onSave={handleSubmit(onSubmit)} loading={mutation.isPending} />
    </form>
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

  const { register, handleSubmit, reset } = useForm();

  useEffect(() => {
    if (settings) {
      reset({
        ...settings.socialLinks,
        footerText: settings.footerText || '',
        footerTextAm: settings.footerTextAm || '',
      });
    }
  }, [settings, reset]);

  if (!settings) return <div className="flex justify-center py-16"><Spinner /></div>;

  const onSubmit = (values) => {
    const { footerText, footerTextAm, ...links } = values;
    socialMutation.mutate(links);
    footerMutation.mutate({ footerText: footerText || undefined, footerTextAm: footerTextAm || undefined });
  };

  const fields = ['facebook', 'twitter', 'instagram', 'youtube', 'telegram', 'tiktok'];

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <FormSection title="Social links" description="Profiles linked in the site footer and contact page">
        <div className="grid gap-4 sm:grid-cols-2">
          {fields.map((field) => (
            <Input key={field} label={field.charAt(0).toUpperCase() + field.slice(1)} placeholder={`https://${field}.com/…`} {...register(field)} />
          ))}
        </div>
      </FormSection>

      <div className="mt-4">
        <FormSection title="Footer" description="Footer text shown at the bottom of every page">
          <div className="grid gap-4 sm:grid-cols-2">
            <Textarea label="Footer text (English)" rows={3} {...register('footerText')} />
            <Textarea label="Footer text (አማርኛ)" rows={3} {...register('footerTextAm')} />
          </div>
        </FormSection>
      </div>

      <SaveBar onSave={handleSubmit(onSubmit)} loading={socialMutation.isPending || footerMutation.isPending} />
    </form>
  );
};

const TABS = [
  { key: 'general', label: 'General', icon: Building2 },
  { key: 'homepage', label: 'Homepage', icon: Home },
  { key: 'appearance', label: 'Appearance', icon: Palette },
  { key: 'social', label: 'Social & Footer', icon: Share2 },
];

export const SettingsPage = () => {
  usePageMeta('Settings');
  const [tab, setTab] = useState('general');

  const { data: settings, isLoading } = useQuery({
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

      {isLoading ? <div className="flex justify-center py-16"><Spinner /></div> : null}
      {!isLoading && tab === 'general' && <GeneralForm settings={settings} />}
      {!isLoading && tab === 'homepage' && <HomepageForm settings={settings} />}
      {!isLoading && tab === 'appearance' && <AppearanceForm settings={settings} />}
      {!isLoading && tab === 'social' && <SocialForm settings={settings} />}
    </div>
  );
};

export default SettingsPage;
