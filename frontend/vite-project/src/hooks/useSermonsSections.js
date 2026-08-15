import { usePublishedSermons, useSermonCategories } from './usePublicData';
import { formatDate, mediaUrl } from '../lib/publicMappers';
import { useChurch } from './useHomeSections';
import { localeTag, pickAm } from '../lib/localize';
import { useLanguage } from '../i18n/LanguageContext';

export function useLatestSermons() {
  const { data } = usePublishedSermons({ limit: 4 });
  const items = data?.items || [];
  const { language } = useLanguage();
  return items.map((sermon) => ({
    id: sermon._id,
    thumbnail: mediaUrl(sermon.thumbnail),
    title: pickAm(sermon, 'title', language),
    priest: pickAm(sermon, 'speaker', language) || 'Clergy',
    date: formatDate(sermon.publishedAt || sermon.date, { locale: localeTag(language) }),
    duration: sermon.duration ? `${sermon.duration} ${language === 'am' ? 'ደቂቃ' : 'min'}` : '',
    bibleVerse: pickAm(sermon, 'description', language) || '',
  }));
}

export function useAudioSermons() {
  const { data } = usePublishedSermons({ limit: 4 });
  const items = (data?.items || []).filter((sermon) => mediaUrl(sermon.audioUrl));
  const { language } = useLanguage();
  return items.map((sermon) => ({
    id: sermon._id,
    title: pickAm(sermon, 'title', language),
    priest: pickAm(sermon, 'speaker', language) || 'Clergy',
    duration: sermon.duration ? `${sermon.duration} ${language === 'am' ? 'ደቂቃ' : 'min'}` : language === 'am' ? 'ድምጽ' : 'Audio',
    audioUrl: mediaUrl(sermon.audioUrl),
  }));
}

export function useSermonCategoriesList() {
  const { data } = useSermonCategories();
  if (!Array.isArray(data) || !data.length) return [];
  return data.map((cat) => ({
    id: cat._id,
    icon: 'bible',
    title: cat._id,
    description: '',
    count: cat.count || 0,
  }));
}

export function useLiveStream() {
  const church = useChurch();
  const url = church.liveStreamURL;
  if (!url) return null;
  return {
    isLive: true,
    videoUrl: url,
    title: church.name || 'Live Service',
    description: '',
    startTime: '',
    nextService: '',
    nextServiceDate: '',
    thumbnail: '',
    scheduleLabel: 'View Service Schedule',
  };
}
