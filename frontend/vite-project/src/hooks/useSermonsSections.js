import { usePublishedSermons, useSermonCategories } from './usePublicData';
import { formatDate, mediaUrl } from '../lib/publicMappers';
import { useChurch } from './useHomeSections';
import { localeTag, pickAm } from '../lib/localize';
import { useLanguage } from '../i18n/LanguageContext';

export function useLatestSermons() {
  const query = usePublishedSermons({ limit: 4 });
  const items = query.data?.items || [];
  const { language } = useLanguage();
  return {
    items: items.map((sermon) => ({
      id: sermon._id,
      thumbnail: mediaUrl(sermon.thumbnail),
      title: pickAm(sermon, 'title', language),
      priest: pickAm(sermon, 'speaker', language) || (language === 'ti' ? 'ቀሳውስት' : 'Clergy'),
      date: formatDate(sermon.publishedAt || sermon.date, { locale: localeTag(language) }),
      duration: sermon.duration
        ? `${sermon.duration} ${language === 'am' ? 'ደቂቃ' : language === 'ti' ? 'ደቒቕ' : 'min'}`
        : '',
      bibleVerse: pickAm(sermon, 'description', language) || '',
    })),
    isLoading: query.isLoading || query.isFetching,
    isError: query.isError,
    isEmpty: query.isSuccess && !(query.data?.items || []).length,
    refetch: query.refetch,
  };
}

export function useAudioSermons() {
  const query = usePublishedSermons({ limit: 4 });
  const items = (query.data?.items || []).filter((sermon) => mediaUrl(sermon.audioUrl));
  const { language } = useLanguage();
  return {
    items: items.map((sermon) => ({
      id: sermon._id,
      title: pickAm(sermon, 'title', language),
      priest: pickAm(sermon, 'speaker', language) || (language === 'ti' ? 'ቀሳውስት' : 'Clergy'),
      duration: sermon.duration
        ? `${sermon.duration} ${language === 'am' ? 'ደቂቃ' : language === 'ti' ? 'ደቒቕ' : 'min'}`
        : language === 'am'
          ? 'ድምጽ'
          : language === 'ti'
            ? 'ድምጺ'
            : 'Audio',
      audioUrl: mediaUrl(sermon.audioUrl),
    })),
    isLoading: query.isLoading || query.isFetching,
    isError: query.isError,
    isEmpty: query.isSuccess && !(query.data?.items || []).length,
    refetch: query.refetch,
  };
}

const SERMON_CATEGORY_ICONS = {
  Sermon: 'bible',
  Sermons: 'bible',
  'Bible Study': 'bible',
  Scripture: 'bible',
  Teaching: 'church',
  Liturgy: 'church',
  Prayer: 'prayer',
  Hymns: 'prayer',
  Feast: 'feast',
  'Feast Days': 'feast',
  Youth: 'youth',
  Sunday: 'church',
  History: 'history',
  'Church History': 'history',
};

export function useSermonCategoriesList() {
  const query = useSermonCategories();
  const data = query.data;
  return {
    items: (Array.isArray(data) ? data : []).map((cat) => ({
      id: cat._id,
      icon: SERMON_CATEGORY_ICONS[cat._id] || 'bible',
      title: cat._id,
      description: '',
      count: cat.count || 0,
    })),
    isLoading: query.isLoading || query.isFetching,
    isError: query.isError,
    isEmpty: query.isSuccess && !(Array.isArray(data) && data.length),
    refetch: query.refetch,
  };
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
