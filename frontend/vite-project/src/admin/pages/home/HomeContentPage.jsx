import { useMemo, useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { Plus, Pencil, Trash2, Eye, EyeOff, Link2, Save } from 'lucide-react';
import { PageHeader } from '../../components/ui/PageHeader';
import Button from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Tabs } from '../../components/ui/Tabs';
import { FormSection } from '../../components/ui/FormSection';
import { ConfirmDialog } from '../../components/ui/ConfirmDialog';
import { EmptyState } from '../../components/ui/EmptyState';
import { Switch } from '../../components/ui/Switch';
import { Badge } from '../../components/ui/Badge';
import { Skeleton } from '../../components/ui/Skeleton';
import { RichEditor } from '../../components/ui/RichEditor';
import { FileUpload } from '../../components/ui/FileUpload';
import { HeroSlideModal } from './HeroSlideModal';
import { QuickLinkModal } from './QuickLinkModal';
import { homeService } from '../../services/content.service';
import { getErrorMessage } from '../../utils/api';
import { usePageMeta } from '../../hooks/usePageMeta';

const SectionTabs = () => [
  { key: 'hero', label: 'Hero Slides' },
  { key: 'welcome', label: 'Welcome' },
  { key: 'priest', label: 'Priest Welcome' },
  { key: 'quick-links', label: 'Quick Links' },
  { key: 'settings', label: 'Page Settings' },
];

const HeroSkeleton = () => (
  <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
    {[1, 2, 3].map((i) => (
      <Skeleton key={i} className="h-64 rounded-xl" />
    ))}
  </div>
);

export const HomeContentPage = () => {
  usePageMeta('Home Page');
  const queryClient = useQueryClient();
  const [tab, setTab] = useState('hero');
  const [heroModal, setHeroModal] = useState(false);
  const [editingSlide, setEditingSlide] = useState(null);
  const [editingSlideIndex, setEditingSlideIndex] = useState(null);
  const [quickLinkModal, setQuickLinkModal] = useState(false);
  const [editingLink, setEditingLink] = useState(null);
  const [editingLinkIndex, setEditingLinkIndex] = useState(null);
  const [deletingSlide, setDeletingSlide] = useState(null);
  const [deletingSlideIndex, setDeletingSlideIndex] = useState(null);
  const [deletingLink, setDeletingLink] = useState(null);
  const [deletingLinkIndex, setDeletingLinkIndex] = useState(null);

  const { data: home, isLoading } = useQuery({
    queryKey: ['home', 'admin'],
    queryFn: homeService.getAdmin,
  });

  const invalidate = () => {
    queryClient.invalidateQueries({ queryKey: ['home', 'admin'] });
    queryClient.invalidateQueries({ queryKey: ['dashboard', 'full'] });
  };

  const heroMutation = useMutation({
    mutationFn: (payload) => homeService.updateHero(payload),
    onSuccess: (_, vars) => {
      toast.success(vars.index !== undefined ? 'Hero slide updated' : 'Hero slide added');
      invalidate();
      setHeroModal(false);
    },
    onError: (error) => toast.error(getErrorMessage(error)),
  });

  const deleteSlideMutation = useMutation({
    mutationFn: (index) => homeService.deleteHeroSlide(index),
    onSuccess: () => {
      toast.success('Hero slide removed');
      invalidate();
    },
    onError: (error) => toast.error(getErrorMessage(error)),
  });

  const quickLinkMutation = useMutation({
    mutationFn: ({ index, payload }) =>
      index !== undefined && index !== null
        ? homeService.updateQuickLink(index, payload)
        : homeService.addQuickLink(payload),
    onSuccess: (_data, vars) => {
      toast.success(vars.index !== undefined && vars.index !== null ? 'Quick link updated' : 'Quick link added');
      invalidate();
      setQuickLinkModal(false);
    },
    onError: (error) => toast.error(getErrorMessage(error)),
  });

  const deleteLinkMutation = useMutation({
    mutationFn: (index) => homeService.removeQuickLink(index),
    onSuccess: () => {
      toast.success('Quick link removed');
      invalidate();
    },
    onError: (error) => toast.error(getErrorMessage(error)),
  });

  const updateContentMutation = useMutation({
    mutationFn: (payload) => homeService.updateContent(payload),
    onSuccess: () => {
      toast.success('Content updated');
      invalidate();
    },
    onError: (error) => toast.error(getErrorMessage(error)),
  });

  const slides = home?.hero?.slides || [];
  const quickLinks = home?.quickLinks || [];

  const heroContent = useMemo(
    () =>
      slides.map((slide, index) => ({
        ...slide,
        index,
      })),
    [slides]
  );

  return (
    <div>
      <PageHeader
        title="Home Page"
        subtitle="Manage the content shown on the church homepage"
        breadcrumbs={[{ label: 'Home' }]}
        actions={
          tab === 'hero' ? (
            <Button onClick={() => { setEditingSlide(null); setEditingSlideIndex(null); setHeroModal(true); }}>
              <Plus className="h-4 w-4" />
              Add Slide
            </Button>
          ) : tab === 'quick-links' ? (
            <Button onClick={() => { setEditingLink(null); setEditingLinkIndex(null); setQuickLinkModal(true); }}>
              <Plus className="h-4 w-4" />
              Add Quick Link
            </Button>
          ) : undefined
        }
      />

      <div className="mb-6">
        <Tabs tabs={SectionTabs()} onChange={setTab} />
      </div>

      {isLoading ? (
        tab === 'hero' ? <HeroSkeleton /> : <Skeleton className="h-72 rounded-xl" />
      ) : tab === 'hero' ? (
        <div className="space-y-5">
          {heroContent.length === 0 ? (
            <EmptyState
              icon={Eye}
              title="No hero slides"
              description="Add your first banner slide to welcome visitors."
              action={
                <Button onClick={() => setHeroModal(true)}>
                  <Plus className="h-4 w-4" /> Add slide
                </Button>
              }
            />
          ) : (
            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {heroContent.map((slide) => (
                <div
                  key={slide.index}
                  className="group overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-800"
                >
                  <div className="relative h-44 bg-gray-100 dark:bg-gray-700">
                    {slide.image?.url ? (
                      <img src={slide.image.url} alt={slide.title || 'Hero slide'} className="h-full w-full object-cover" loading="lazy" />
                    ) : (
                      <div className="flex h-full items-center justify-center text-gray-400">
                        <Eye className="h-8 w-8" />
                      </div>
                    )}
                    <div className="absolute left-3 top-3">
                      <Badge tone={slide.isActive ? 'success' : 'neutral'}>
                        {slide.isActive ? 'Active' : 'Hidden'}
                      </Badge>
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                      {slide.title || slide.titleAm || 'Untitled slide'}
                    </h3>
                    <p className="mt-1 line-clamp-2 text-xs text-gray-500 dark:text-gray-400">
                      {slide.subtitle || slide.subtitleAm || 'No subtitle'}
                    </p>
                    <div className="mt-3 flex items-center gap-2">
                      <Button
                        variant="secondary"
                        size="xs"
                        onClick={() => {
                          setEditingSlide(slide);
                          setEditingSlideIndex(slide.index);
                          setHeroModal(true);
                        }}
                      >
                        <Pencil className="h-3.5 w-3.5" /> Edit
                      </Button>
                      <Button
                        variant="ghost"
                        size="xs"
                        onClick={() => {
                          heroMutation.mutate({ index: slide.index, isActive: !slide.isActive });
                        }}
                      >
                        {slide.isActive ? <EyeOff className="h-3.5 w-3.5" /> : <Eye className="h-3.5 w-3.5" />}
                        {slide.isActive ? 'Hide' : 'Show'}
                      </Button>
                      <Button
                        variant="ghost"
                        size="xs"
                        className="ml-auto text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10"
                        onClick={() => { setDeletingSlide(slide); setDeletingSlideIndex(slide.index); }}
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      ) : tab === 'welcome' ? (
        <WelcomeForm home={home} submitting={updateContentMutation.isPending} onSave={updateContentMutation.mutate} />
      ) : tab === 'priest' ? (
        <PriestWelcomeForm home={home} submitting={updateContentMutation.isPending} onSave={updateContentMutation.mutate} />
      ) : tab === 'quick-links' ? (
        <div className="space-y-3">
          {quickLinks.length === 0 ? (
            <EmptyState
              icon={Link2}
              title="No quick links"
              description="Add shortcuts so visitors can jump straight to key pages."
              action={
                <Button onClick={() => setQuickLinkModal(true)}>
                  <Plus className="h-4 w-4" /> Add quick link
                </Button>
              }
            />
          ) : (
            quickLinks.map((link, index) => (
              <div
                key={index}
                className="flex items-center gap-4 rounded-xl border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary-50 text-primary-500 dark:bg-primary-500/10">
                  <Link2 className="h-4 w-4" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-gray-900 dark:text-gray-100">
                    {link.label || link.labelAm}
                  </p>
                  <p className="truncate text-xs text-gray-400">{link.url}</p>
                </div>
                <span className="hidden text-xs text-gray-400 sm:block">Order {link.order ?? index}</span>
                <div className="flex items-center gap-1">
                  <Button
                    variant="ghost"
                    size="xs"
                    onClick={() => { setEditingLink(link); setEditingLinkIndex(index); setQuickLinkModal(true); }}
                  >
                    <Pencil className="h-3.5 w-3.5" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="xs"
                    className="text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10"
                    onClick={() => { setDeletingLink(link); setDeletingLinkIndex(index); }}
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </Button>
                </div>
              </div>
            ))
          )}
        </div>
      ) : (
        <PageSettingsForm home={home} submitting={updateContentMutation.isPending} onSave={updateContentMutation.mutate} />
      )}

      <HeroSlideModal
        open={heroModal}
        onClose={() => setHeroModal(false)}
        slide={editingSlide}
        index={editingSlideIndex}
        onSubmit={heroMutation.mutate}
        submitting={heroMutation.isPending}
      />

      <QuickLinkModal
        open={quickLinkModal}
        onClose={() => setQuickLinkModal(false)}
        link={editingLink}
        index={editingLinkIndex}
        onSubmit={(payload) => quickLinkMutation.mutate({ index: editingLinkIndex, payload })}
        submitting={quickLinkMutation.isPending}
      />

      <ConfirmDialog
        open={Boolean(deletingSlide)}
        onClose={() => setDeletingSlide(null)}
        onConfirm={() => deletingSlideIndex !== null && deleteSlideMutation.mutate(deletingSlideIndex)}
        title="Remove hero slide"
        description={`Remove "${deletingSlide?.title || 'this slide'}" from the homepage banner?`}
        confirmLabel="Remove"
        loading={deleteSlideMutation.isPending}
      />

      <ConfirmDialog
        open={Boolean(deletingLink)}
        onClose={() => setDeletingLink(null)}
        onConfirm={() => deletingLinkIndex !== null && deleteLinkMutation.mutate(deletingLinkIndex)}
        title="Remove quick link"
        description={`Remove "${deletingLink?.label || 'this link'}"?`}
        confirmLabel="Remove"
        loading={deleteLinkMutation.isPending}
      />
    </div>
  );
};

const WelcomeForm = ({ home, submitting, onSave }) => {
  const [values, setValues] = useState({
    title: home?.welcome?.title || '',
    titleAm: home?.welcome?.titleAm || '',
    content: home?.welcome?.content || '',
    contentAm: home?.welcome?.contentAm || '',
    scripture: home?.welcome?.scripture || '',
    image: null,
  });

  const update = (key) => (value) => setValues((prev) => ({ ...prev, [key]: value }));

  const canSave =
    values.title.trim() && values.content.trim() && !submitting;

  return (
    <FormSection
      title="Welcome section"
      description="Introductory message shown on the homepage"
    >
      <div className="space-y-5">
        <div className="grid gap-4 sm:grid-cols-2">
          <Input label="Title (English)" value={values.title} onChange={(e) => update('title')(e.target.value)} placeholder="Welcome to our parish" />
          <Input label="Title (አማርኛ)" value={values.titleAm} onChange={(e) => update('titleAm')(e.target.value)} placeholder="ወደ ምእመናናችን እንኳን ደህና መጡ" />
        </div>
        <RichEditor label="Message (English)" value={values.content} onChange={update('content')} />
        <RichEditor label="Message (አማርኛ)" value={values.contentAm} onChange={update('contentAm')} />
        <Input label="Scripture reference" value={values.scripture} onChange={(e) => update('scripture')(e.target.value)} placeholder="Psalm 100:4" />
        <FileUpload type="image" label="Welcome image" value={values.image} onChange={update('image')} hint="Optional supporting photo" />
        <div className="flex justify-end border-t border-gray-100 pt-4 dark:border-gray-700">
          <Button
            onClick={() =>
              onSave({
                welcome: {
                  title: values.title,
                  titleAm: values.titleAm || undefined,
                  content: values.content,
                  contentAm: values.contentAm || undefined,
                  scripture: values.scripture || undefined,
                },
                ...(values.image instanceof File || values.image instanceof Blob ? { welcomeImage: values.image } : {}),
              })
            }
            loading={submitting}
            disabled={!canSave}
          >
            <Save className="h-4 w-4" /> Save welcome
          </Button>
        </div>
      </div>
    </FormSection>
  );
};

const PriestWelcomeForm = ({ home, submitting, onSave }) => {
  const [values, setValues] = useState({
    priestName: home?.priestWelcome?.priestName || '',
    priestTitle: home?.priestWelcome?.priestTitle || '',
    title: home?.priestWelcome?.title || '',
    titleAm: home?.priestWelcome?.titleAm || '',
    content: home?.priestWelcome?.content || '',
    contentAm: home?.priestWelcome?.contentAm || '',
    priestImage: null,
  });

  const update = (key) => (value) => setValues((prev) => ({ ...prev, [key]: value }));

  const canSave = values.title.trim() && values.content.trim() && !submitting;

  return (
    <FormSection
      title="Priest welcome"
      description="A personal message from the parish priest"
    >
      <div className="space-y-5">
        <div className="grid gap-4 sm:grid-cols-2">
          <Input label="Priest name" value={values.priestName} onChange={(e) => update('priestName')(e.target.value)} placeholder="Fr. Aba Gebre" />
          <Input label="Priest title" value={values.priestTitle} onChange={(e) => update('priestTitle')(e.target.value)} placeholder="Head Priest" />
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <Input label="Heading (English)" value={values.title} onChange={(e) => update('title')(e.target.value)} placeholder="A word from our priest" />
          <Input label="Heading (አማርኛ)" value={values.titleAm} onChange={(e) => update('titleAm')(e.target.value)} placeholder="ከካህናችን ቃል" />
        </div>
        <RichEditor label="Message (English)" value={values.content} onChange={update('content')} />
        <RichEditor label="Message (አማርኛ)" value={values.contentAm} onChange={update('contentAm')} />
        <FileUpload type="image" label="Priest photo" value={values.priestImage} onChange={update('priestImage')} hint="Optional" />
        <div className="flex justify-end border-t border-gray-100 pt-4 dark:border-gray-700">
          <Button
            onClick={() =>
              onSave({
                priestWelcome: {
                  priestName: values.priestName || undefined,
                  priestTitle: values.priestTitle || undefined,
                  title: values.title,
                  titleAm: values.titleAm || undefined,
                  content: values.content,
                  contentAm: values.contentAm || undefined,
                },
                ...(values.priestImage instanceof File || values.priestImage instanceof Blob ? { priestImage: values.priestImage } : {}),
              })
            }
            loading={submitting}
            disabled={!canSave}
          >
            <Save className="h-4 w-4" /> Save priest welcome
          </Button>
        </div>
      </div>
    </FormSection>
  );
};

const PageSettingsForm = ({ home, submitting, onSave }) => {
  const [values, setValues] = useState({
    announcementSectionTitle: home?.announcementSectionTitle || '',
    announcementSectionTitleAm: home?.announcementSectionTitleAm || '',
    showLiveStream: Boolean(home?.showLiveStream),
    showAnnouncements: Boolean(home?.showAnnouncements),
    showUpcomingEvents: Boolean(home?.showUpcomingEvents),
    showRecentSermons: Boolean(home?.showRecentSermons),
  });

  const toggle = (key) => (val) => setValues((prev) => ({ ...prev, [key]: val }));

  const toggles = [
    { key: 'showLiveStream', label: 'Live stream section', description: 'Show the YouTube live stream embed on the homepage' },
    { key: 'showAnnouncements', label: 'Announcements section', description: 'Show recent announcements on the homepage' },
    { key: 'showUpcomingEvents', label: 'Upcoming events section', description: 'Show the next church events' },
    { key: 'showRecentSermons', label: 'Recent sermons section', description: 'Show the latest sermon recordings' },
  ];

  return (
    <FormSection
      title="Page sections"
      description="Control which sections appear on the homepage"
    >
      <div className="space-y-5">
        <div className="grid gap-4 sm:grid-cols-2">
          <Input
            label="Announcements section title (English)"
            value={values.announcementSectionTitle}
            onChange={(e) => toggle('announcementSectionTitle')(e.target.value)}
            placeholder="Announcements"
          />
          <Input
            label="Announcements section title (አማርኛ)"
            value={values.announcementSectionTitleAm}
            onChange={(e) => toggle('announcementSectionTitleAm')(e.target.value)}
            placeholder="ማስታወቂያዎች"
          />
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          {toggles.map((t) => (
            <Switch
              key={t.key}
              checked={values[t.key]}
              onChange={toggle(t.key)}
              label={t.label}
              description={t.description}
            />
          ))}
        </div>
        <div className="flex justify-end border-t border-gray-100 pt-4 dark:border-gray-700">
          <Button
            onClick={() =>
              onSave({
                announcementSectionTitle: values.announcementSectionTitle || undefined,
                announcementSectionTitleAm: values.announcementSectionTitleAm || undefined,
                showLiveStream: values.showLiveStream,
                showAnnouncements: values.showAnnouncements,
                showUpcomingEvents: values.showUpcomingEvents,
                showRecentSermons: values.showRecentSermons,
              })
            }
            loading={submitting}
          >
            <Save className="h-4 w-4" /> Save settings
          </Button>
        </div>
      </div>
    </FormSection>
  );
};

export default HomeContentPage;
