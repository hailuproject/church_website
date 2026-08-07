import { useEffect, useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { Plus, Save, Trash2 } from 'lucide-react';
import { PageHeader } from '../../components/ui/PageHeader';
import Button from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Tabs } from '../../components/ui/Tabs';
import { FormSection } from '../../components/ui/FormSection';
import { ConfirmDialog } from '../../components/ui/ConfirmDialog';
import { EmptyState } from '../../components/ui/EmptyState';
import { Skeleton } from '../../components/ui/Skeleton';
import { RichEditor } from '../../components/ui/RichEditor';
import { FileUpload } from '../../components/ui/FileUpload';
import { TimelineModal } from './TimelineModal';
import { aboutService } from '../../services/content.service';
import { getErrorMessage } from '../../utils/api';
import { usePageMeta } from '../../hooks/usePageMeta';

const ContentTabs = () => [
  { key: 'history', label: 'History' },
  { key: 'faith', label: 'Faith & Beliefs' },
  { key: 'location', label: 'Location' },
  { key: 'timeline', label: 'Timeline' },
];

export const AboutContentPage = () => {
  usePageMeta('About Page');
  const queryClient = useQueryClient();
  const [tab, setTab] = useState('history');
  const [timelineModal, setTimelineModal] = useState(false);
  const [deletingTimeline, setDeletingTimeline] = useState(null);
  const [deletingIndex, setDeletingIndex] = useState(null);

  const { data: about, isLoading } = useQuery({
    queryKey: ['about', 'admin'],
    queryFn: aboutService.getAdmin,
  });

  const invalidate = () => queryClient.invalidateQueries({ queryKey: ['about', 'admin'] });

  const historyMutation = useMutation({
    mutationFn: (payload) => aboutService.updateHistory(payload),
    onSuccess: () => {
      toast.success('History updated');
      invalidate();
    },
    onError: (error) => toast.error(getErrorMessage(error)),
  });

  const contentMutation = useMutation({
    mutationFn: (payload) => aboutService.updateContent(payload),
    onSuccess: () => {
      toast.success('Content updated');
      invalidate();
    },
    onError: (error) => toast.error(getErrorMessage(error)),
  });

  const timelineMutation = useMutation({
    mutationFn: (payload) => aboutService.addTimelineEntry(payload),
    onSuccess: () => {
      toast.success('Timeline entry added');
      invalidate();
      setTimelineModal(false);
    },
    onError: (error) => toast.error(getErrorMessage(error)),
  });

  const removeTimelineMutation = useMutation({
    mutationFn: (index) => aboutService.removeTimelineEntry(index),
    onSuccess: () => {
      toast.success('Timeline entry removed');
      invalidate();
    },
    onError: (error) => toast.error(getErrorMessage(error)),
  });

  return (
    <div>
      <PageHeader
        title="About Page"
        subtitle="Manage the story, faith, and details of the church"
        breadcrumbs={[{ label: 'About' }]}
        actions={
          tab === 'timeline' ? (
            <Button onClick={() => setTimelineModal(true)}>
              <Plus className="h-4 w-4" /> Add Timeline Entry
            </Button>
          ) : undefined
        }
      />

      <div className="mb-6">
        <Tabs tabs={ContentTabs()} onChange={setTab} />
      </div>

      {isLoading ? (
        <Skeleton className="h-72 rounded-xl" />
      ) : tab === 'history' ? (
        <HistoryForm about={about} submitting={historyMutation.isPending} onSave={historyMutation.mutate} />
      ) : tab === 'faith' ? (
        <FaithForm about={about} submitting={contentMutation.isPending} onSave={contentMutation.mutate} />
      ) : tab === 'location' ? (
        <LocationForm about={about} submitting={contentMutation.isPending} onSave={contentMutation.mutate} />
      ) : about?.timeline?.length ? (
        <div className="space-y-3">
          {about.timeline.map((entry, index) => (
            <div
              key={index}
              className="flex items-start gap-4 rounded-xl border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800"
            >
              <div className="flex h-10 w-14 shrink-0 items-center justify-center rounded-lg bg-primary-50 text-sm font-bold text-primary-600 dark:bg-primary-500/10 dark:text-primary-400">
                {entry.year || '—'}
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium text-gray-900 dark:text-gray-100">{entry.title || entry.titleAm}</p>
                <p className="mt-0.5 line-clamp-2 text-xs text-gray-500 dark:text-gray-400">
                  {entry.description || entry.descriptionAm || 'No description'}
                </p>
              </div>
              <Button
                variant="ghost"
                size="xs"
                className="text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10"
                onClick={() => { setDeletingTimeline(entry); setDeletingIndex(index); }}
              >
                <Trash2 className="h-3.5 w-3.5" />
              </Button>
            </div>
          ))}
        </div>
      ) : (
        <EmptyState
          title="No timeline entries"
          description="Share the milestones of the parish history."
          action={
            <Button onClick={() => setTimelineModal(true)}>
              <Plus className="h-4 w-4" /> Add entry
            </Button>
          }
        />
      )}

      <TimelineModal
        open={timelineModal}
        onClose={() => setTimelineModal(false)}
        onSubmit={timelineMutation.mutate}
        submitting={timelineMutation.isPending}
      />

      <ConfirmDialog
        open={Boolean(deletingTimeline)}
        onClose={() => setDeletingTimeline(null)}
        onConfirm={() => deletingIndex !== null && removeTimelineMutation.mutate(deletingIndex)}
        title="Remove timeline entry"
        description={`Remove the entry "${deletingTimeline?.year || ''} ${deletingTimeline?.title || ''}"?`}
        confirmLabel="Remove"
        loading={removeTimelineMutation.isPending}
      />
    </div>
  );
};

const HistoryForm = ({ about, submitting, onSave }) => {
  const [values, setValues] = useState({
    title: about?.history?.title || '',
    titleAm: about?.history?.titleAm || '',
    content: about?.history?.content || '',
    contentAm: about?.history?.contentAm || '',
    image: null,
  });

  const update = (key) => (value) => setValues((prev) => ({ ...prev, [key]: value }));
  const canSave = values.title.trim() && values.content.trim() && !submitting;
  const images = about?.history?.images || [];

  return (
    <FormSection title="Church history" description="The story of the parish since its founding">
      <div className="space-y-5">
        <div className="grid gap-4 sm:grid-cols-2">
          <Input label="Title (English)" value={values.title} onChange={(e) => update('title')(e.target.value)} placeholder="Our history" />
          <Input label="Title (አማርኛ)" value={values.titleAm} onChange={(e) => update('titleAm')(e.target.value)} placeholder="ታሪካችን" />
        </div>
        <RichEditor label="Story (English)" value={values.content} onChange={update('content')} />
        <RichEditor label="Story (አማርኛ)" value={values.contentAm} onChange={update('contentAm')} />
        <div>
          <FileUpload type="image" label="Add history photo" value={values.image} onChange={update('image')} hint="Uploads are added to the history gallery" />
          {images.length > 0 && (
            <div className="mt-3">
              <p className="mb-2 text-xs font-medium text-gray-500 dark:text-gray-400">
                {images.length} photo{images.length > 1 ? 's' : ''} in gallery
              </p>
              <div className="grid grid-cols-3 gap-2 sm:grid-cols-5">
                {images.map((media, index) => (
                  <img
                    key={media.publicId || index}
                    src={media.url}
                    alt=""
                    className="h-20 w-full rounded-lg border border-gray-200 object-cover dark:border-gray-700"
                    loading="lazy"
                  />
                ))}
              </div>
            </div>
          )}
        </div>
        <div className="flex justify-end border-t border-gray-100 pt-4 dark:border-gray-700">
          <Button
            onClick={() =>
              onSave({
                title: values.title,
                titleAm: values.titleAm || undefined,
                content: values.content,
                contentAm: values.contentAm || undefined,
                ...(values.image instanceof File || values.image instanceof Blob ? { image: values.image } : {}),
              })
            }
            loading={submitting}
            disabled={!canSave}
          >
            <Save className="h-4 w-4" /> Save history
          </Button>
        </div>
      </div>
    </FormSection>
  );
};

const FaithForm = ({ about, submitting, onSave }) => {
  const [values, setValues] = useState({
    title: about?.faith?.title || '',
    titleAm: about?.faith?.titleAm || '',
    content: about?.faith?.content || '',
    contentAm: about?.faith?.contentAm || '',
    beliefs: about?.faith?.beliefs?.join('\n') || '',
    beliefsAm: about?.faith?.beliefsAm?.join('\n') || '',
  });

  const update = (key) => (value) => setValues((prev) => ({ ...prev, [key]: value }));
  const canSave = values.title.trim() && values.content.trim() && !submitting;

  return (
    <FormSection title="Faith & beliefs" description="What the church believes and teaches">
      <div className="space-y-5">
        <div className="grid gap-4 sm:grid-cols-2">
          <Input label="Title (English)" value={values.title} onChange={(e) => update('title')(e.target.value)} placeholder="Our faith" />
          <Input label="Title (አማርኛ)" value={values.titleAm} onChange={(e) => update('titleAm')(e.target.value)} placeholder="እምነታችን" />
        </div>
        <RichEditor label="Statement (English)" value={values.content} onChange={update('content')} />
        <RichEditor label="Statement (አማርኛ)" value={values.contentAm} onChange={update('contentAm')} />
        <div className="grid gap-4 sm:grid-cols-2">
          <Input
            label="Beliefs (English)"
            hint="One per line"
            value={values.beliefs}
            onChange={(e) => update('beliefs')(e.target.value)}
            placeholder={'We believe in the Holy Trinity\nWe honor the Theotokos'}
          />
          <Input
            label="Beliefs (አማርኛ)"
            hint="One per line"
            value={values.beliefsAm}
            onChange={(e) => update('beliefsAm')(e.target.value)}
            placeholder="በስላሴ እናምናለን"
          />
        </div>
        <div className="flex justify-end border-t border-gray-100 pt-4 dark:border-gray-700">
          <Button
            onClick={() =>
              onSave({
                faith: {
                  title: values.title,
                  titleAm: values.titleAm || undefined,
                  content: values.content,
                  contentAm: values.contentAm || undefined,
                  beliefs: values.beliefs.split('\n').map((s) => s.trim()).filter(Boolean),
                  beliefsAm: values.beliefsAm.split('\n').map((s) => s.trim()).filter(Boolean),
                },
              })
            }
            loading={submitting}
            disabled={!canSave}
          >
            <Save className="h-4 w-4" /> Save faith
          </Button>
        </div>
      </div>
    </FormSection>
  );
};

const LocationForm = ({ about, submitting, onSave }) => {
  const [values, setValues] = useState({
    title: about?.location?.title || '',
    address: about?.location?.address || '',
    addressAm: about?.location?.addressAm || '',
    mapEmbedUrl: about?.location?.mapEmbedUrl || '',
    latitude: about?.location?.latitude ?? '',
    longitude: about?.location?.longitude ?? '',
  });

  const update = (key) => (value) => setValues((prev) => ({ ...prev, [key]: value }));
  const canSave = values.title.trim() && values.address.trim() && !submitting;

  return (
    <FormSection title="Location" description="Where the church is and how to find it">
      <div className="space-y-5">
        <div className="grid gap-4 sm:grid-cols-2">
          <Input label="Title (English)" value={values.title} onChange={(e) => update('title')(e.target.value)} placeholder="Find us" />
          <Input label="Title (አማርኛ)" value={values.titleAm} onChange={(e) => update('titleAm')(e.target.value)} placeholder="አካባቢ" />
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <Input label="Address (English)" value={values.address} onChange={(e) => update('address')(e.target.value)} placeholder="Bole, Addis Ababa, Ethiopia" />
          <Input label="Address (አማርኛ)" value={values.addressAm} onChange={(e) => update('addressAm')(e.target.value)} placeholder="ቦሌ፣ አዲስ አበባ" />
        </div>
        <Input label="Map embed URL" value={values.mapEmbedUrl} onChange={(e) => update('mapEmbedUrl')(e.target.value)} placeholder="https://www.google.com/maps/embed?pb=…" />
        <div className="grid gap-4 sm:grid-cols-2">
          <Input label="Latitude" type="number" step="any" value={values.latitude} onChange={(e) => update('latitude')(e.target.value)} placeholder="9.02" />
          <Input label="Longitude" type="number" step="any" value={values.longitude} onChange={(e) => update('longitude')(e.target.value)} placeholder="38.74" />
        </div>
        <div className="flex justify-end border-t border-gray-100 pt-4 dark:border-gray-700">
          <Button
            onClick={() =>
              onSave({
                location: {
                  title: values.title,
                  address: values.address,
                  addressAm: values.addressAm || undefined,
                  mapEmbedUrl: values.mapEmbedUrl || undefined,
                  latitude: values.latitude === '' ? undefined : Number(values.latitude),
                  longitude: values.longitude === '' ? undefined : Number(values.longitude),
                },
              })
            }
            loading={submitting}
            disabled={!canSave}
          >
            <Save className="h-4 w-4" /> Save location
          </Button>
        </div>
      </div>
    </FormSection>
  );
};

export default AboutContentPage;
