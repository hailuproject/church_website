import { useEffect, useMemo, useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { Save, FileText, Home as HomeIcon, Phone, HeartHandshake, Info, Code2 } from 'lucide-react';
import { PageHeader } from '../../components/ui/PageHeader';
import Button from '../../components/ui/Button';
import { Input, Textarea } from '../../components/ui/Input';
import { Switch } from '../../components/ui/Switch';
import { FormSection } from '../../components/ui/FormSection';
import { Spinner } from '../../components/ui/Loader';
import { contentService, CONTENT_KEYS } from '../../services/content.service';
import { getErrorMessage } from '../../utils/api';
import { usePageMeta } from '../../hooks/usePageMeta';
import { cn } from '../../utils/helpers';

const PAGE_META = {
  home: { label: 'Home', icon: HomeIcon },
  about: { label: 'About', icon: Info },
  contact: { label: 'Contact', icon: Phone },
  donate: { label: 'Donate', icon: HeartHandshake },
  footer: { label: 'Footer', icon: FileText },
};

const PAGE_CONFIG = {
  home: [
    {
      title: 'Hero',
      description: 'Landing section of the homepage',
      fields: [
        { type: 'text', path: 'hero.heading', label: 'Hero heading (English)' },
        { type: 'text', path: 'hero.headingAm', label: 'Hero heading (አማርኛ)' },
        { type: 'text', path: 'hero.headingTi', label: 'Hero heading (ትግርኛ)' },
        { type: 'text', path: 'hero.tagline', label: 'Tagline (English)' },
        { type: 'text', path: 'hero.taglineAm', label: 'Tagline (አማርኛ)' },
        { type: 'text', path: 'hero.taglineTi', label: 'Tagline (ትግርኛ)' },
        { type: 'text', path: 'hero.image', label: 'Hero image URL (optional)' },
      ],
    },
    {
      title: 'Hero buttons',
      description: 'Primary and secondary call-to-action buttons',
      fields: [
        { type: 'text', path: 'hero.primaryCta.label', label: 'Primary button label (English)' },
        { type: 'text', path: 'hero.primaryCta.labelAm', label: 'Primary button label (አማርኛ)' },
        { type: 'text', path: 'hero.primaryCta.labelTi', label: 'Primary button label (ትግርኛ)' },
        { type: 'text', path: 'hero.primaryCta.href', label: 'Primary button link' },
        { type: 'text', path: 'hero.secondaryCta.label', label: 'Secondary button label (English)' },
        { type: 'text', path: 'hero.secondaryCta.labelAm', label: 'Secondary button label (አማርኛ)' },
        { type: 'text', path: 'hero.secondaryCta.labelTi', label: 'Secondary button label (ትግርኛ)' },
        { type: 'text', path: 'hero.secondaryCta.href', label: 'Secondary button link' },
      ],
    },
    {
      title: 'Intro',
      description: 'Welcome text on the homepage',
      fields: [
        { type: 'text', path: 'intro.title', label: 'Title (English)' },
        { type: 'text', path: 'intro.titleAm', label: 'Title (አማርኛ)' },
        { type: 'text', path: 'intro.titleTi', label: 'Title (ትግርኛ)' },
        { type: 'textarea', path: 'intro.content', label: 'Content (English)' },
        { type: 'textarea', path: 'intro.contentAm', label: 'Content (አማርኛ)' },
        { type: 'textarea', path: 'intro.contentTi', label: 'Content (ትግርኛ)' },
      ],
    },
    {
      title: 'Sections',
      description: 'Toggle homepage sections',
      fields: [
        { type: 'switch', path: 'showUpcomingEvents', label: 'Upcoming events', description: 'Show upcoming events on the homepage' },
        { type: 'switch', path: 'showLatestSermons', label: 'Latest sermons', description: 'Show latest sermons on the homepage' },
        { type: 'switch', path: 'showGalleryPreview', label: 'Gallery preview', description: 'Show a gallery preview on the homepage' },
      ],
    },
    {
      title: 'Bottom call to action',
      description: 'Closing call-to-action banner',
      fields: [
        { type: 'text', path: 'cta.title', label: 'Title (English)' },
        { type: 'text', path: 'cta.titleAm', label: 'Title (አማርኛ)' },
        { type: 'text', path: 'cta.titleTi', label: 'Title (ትግርኛ)' },
        { type: 'textarea', path: 'cta.content', label: 'Content (English)' },
        { type: 'textarea', path: 'cta.contentAm', label: 'Content (አማርኛ)' },
        { type: 'textarea', path: 'cta.contentTi', label: 'Content (ትግርኛ)' },
        { type: 'text', path: 'cta.buttonLabel', label: 'Button label (English)' },
        { type: 'text', path: 'cta.buttonLabelAm', label: 'Button label (አማርኛ)' },
        { type: 'text', path: 'cta.buttonLabelTi', label: 'Button label (ትግርኛ)' },
        { type: 'text', path: 'cta.buttonHref', label: 'Button link' },
      ],
    },
  ],
};

const flatten = (obj, prefix = '', out = {}) => {
  Object.entries(obj || {}).forEach(([key, value]) => {
    const path = prefix ? `${prefix}.${key}` : key;
    if (value && typeof value === 'object' && !Array.isArray(value)) flatten(value, path, out);
    else out[path] = value;
  });
  return out;
};

const unflatten = (flat) => {
  const result = {};
  Object.entries(flat).forEach(([path, value]) => {
    const parts = path.split('.');
    let node = result;
    parts.forEach((part, i) => {
      if (i === parts.length - 1) node[part] = value;
      else {
        if (typeof node[part] !== 'object' || node[part] === null) node[part] = {};
        node = node[part];
      }
    });
  });
  return result;
};

const PageEditor = ({ page, content }) => {
  const queryClient = useQueryClient();
  const [tab, setTab] = useState('editor');
  const [jsonText, setJsonText] = useState(JSON.stringify(content?.data || {}, null, 2));

  useEffect(() => {
    setJsonText(JSON.stringify(content?.data || {}, null, 2));
  }, [page, content]);

  const mutation = useMutation({
    mutationFn: (data) => contentService.update(page, data),
    onSuccess: () => {
      toast.success('Page saved');
      queryClient.invalidateQueries({ queryKey: ['adminContent'] });
    },
    onError: (error) => toast.error(getErrorMessage(error)),
  });

  const defaults = useMemo(() => flatten(content?.data || {}), [content]);
  const { register, handleSubmit, reset, watch, setValue } = useForm({ defaultValues: defaults });

  useEffect(() => {
    reset(flatten(content?.data || {}));
  }, [content, reset]);

  const config = PAGE_CONFIG[page];

  const renderField = (field) => {
    if (field.type === 'switch') {
      return (
        <div key={field.path} className="mb-4 last:mb-0">
          <Switch
            label={field.label}
            description={field.description}
            checked={Boolean(watch(field.path))}
            onChange={(v) => setValue(field.path, v)}
          />
        </div>
      );
    }
    const Component = field.type === 'textarea' ? Textarea : Input;
    return (
      <div key={field.path} className="mb-4 last:mb-0">
        <Component label={field.label} placeholder={field.placeholder} {...register(field.path)} />
      </div>
    );
  };

  const submitEditor = handleSubmit((values) => {
    mutation.mutate(unflatten(values));
  });

  const submitJson = () => {
    try {
      const data = JSON.parse(jsonText);
      mutation.mutate(data);
    } catch (err) {
      toast.error(`Invalid JSON: ${err.message}`);
    }
  };

  const generic = config ?? [];

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <TabButton active={tab === 'editor'} onClick={() => setTab('editor')}>
          <FileText className="h-4 w-4" /> Structured editor
        </TabButton>
        <TabButton active={tab === 'json'} onClick={() => setTab('json')}>
          <Code2 className="h-4 w-4" /> Raw JSON
        </TabButton>
      </div>

      {tab === 'editor' && (
        <form onSubmit={submitEditor} noValidate>
          <div className="space-y-5">
            {generic.map((section, i) => (
              <FormSection
                key={`${section.title}-${i}`}
                title={section.title}
                description={section.description}
                collapsible
                defaultOpen={i === 0}
              >
                {section.fields.filter((f) => f).map(renderField)}
              </FormSection>
            ))}
            <div className="flex justify-end">
              <Button type="submit" loading={mutation.isPending}>
                <Save className="h-4 w-4" />
                Save page
              </Button>
            </div>
          </div>
        </form>
      )}

      {tab === 'json' && (
        <div className="space-y-4">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Full JSON for "{page}"</label>
          <textarea
            value={jsonText}
            onChange={(e) => setJsonText(e.target.value)}
            rows={22}
            spellCheck="false"
            className="block w-full rounded-lg border-0 bg-gray-900 p-4 font-mono text-xs leading-relaxed text-gray-100 shadow-sm ring-1 ring-inset ring-gray-700 placeholder:text-gray-500 focus:ring-2 focus:ring-inset focus:ring-primary-500"
          />
          <Button onClick={submitJson} loading={mutation.isPending}>
            <Save className="h-4 w-4" />
            Save JSON
          </Button>
          <p className="text-xs text-gray-400">
            Advanced editor — use the structured editor where possible. Invalid JSON will not be saved.
          </p>
        </div>
      )}
    </div>
  );
};

const TabButton = ({ active, onClick, children }) => (
  <button
    type="button"
    onClick={onClick}
    className={cn(
      'inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-colors',
      active
        ? 'bg-primary-50 text-primary-700 ring-1 ring-inset ring-primary-200 dark:bg-primary-500/10 dark:text-primary-300 dark:ring-primary-700'
        : 'text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-gray-800'
    )}
  >
    {children}
  </button>
);

export const PagesPage = () => {
  usePageMeta('Pages');
  const [page, setPage] = useState('home');

  const { data: contentList, isLoading } = useQuery({
    queryKey: ['adminContent'],
    queryFn: () => contentService.list(),
  });

  const content = useMemo(
    () => contentList?.items?.find((item) => item.key === page),
    [contentList, page]
  );

  return (
    <div>
      <PageHeader
        title="Pages"
        subtitle="Edit the content shown on public site pages"
        breadcrumbs={[{ label: 'Pages' }]}
      />

      <div className="mb-6 flex flex-wrap gap-2">
        {CONTENT_KEYS.map((key) => {
          const meta = PAGE_META[key];
          const Icon = meta?.icon || FileText;
          return (
            <button
              key={key}
              type="button"
              onClick={() => setPage(key)}
              className={cn(
                'inline-flex items-center gap-2 rounded-lg px-3.5 py-2 text-sm font-medium capitalize transition-colors',
                page === key
                  ? 'bg-white text-primary-700 shadow-sm ring-1 ring-inset ring-primary-200 dark:bg-gray-800 dark:text-primary-300 dark:ring-primary-700'
                  : 'bg-gray-100 text-gray-500 hover:bg-gray-200 hover:text-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700'
              )}
            >
              <Icon className="h-4 w-4" />
              {meta?.label || key}
            </button>
          );
        })}
      </div>

      {isLoading ? (
        <div className="flex justify-center py-20">
          <Spinner />
        </div>
      ) : content && content.data ? (
        <PageEditor page={page} content={content} />
      ) : (
        <div className="flex items-center justify-between rounded-xl border border-gray-200 bg-white p-5 dark:border-gray-700 dark:bg-gray-800">
          <div>
            <p className="text-sm font-medium text-gray-900 dark:text-gray-100">No content yet for "{page}"</p>
            <p className="mt-0.5 text-xs text-gray-500 dark:text-gray-400">Create the initial content record for this page.</p>
          </div>
          <Button onClick={() => contentService.update(page, {})}>
            <Save className="h-4 w-4" />
            Create page
          </Button>
        </div>
      )}
    </div>
  );
};

export default PagesPage;