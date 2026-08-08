import { usePublishedSermons, useSermonCategories } from './usePublicData';
import { formatDate, mediaUrl } from '../lib/publicMappers';
import { useHomeFlags } from './useHomeSections';
import { useChurch } from './useHomeSections';

export function useLatestSermons() {
  const { data } = usePublishedSermons({ limit: 4 });
  const items = data?.items || [];
  return items.map((sermon) => ({
    id: sermon._id,
    thumbnail: mediaUrl(sermon.thumbnail),
    title: sermon.title,
    priest: sermon.speaker || 'Clergy',
    date: formatDate(sermon.publishedAt || sermon.date),
    duration: sermon.duration ? `${sermon.duration} min` : '',
    bibleVerse: sermon.description || '',
  }));
}

export function useAudioSermons() {
  const { data } = usePublishedSermons({ limit: 4 });
  const items = (data?.items || []).filter((sermon) => mediaUrl(sermon.audioUrl));
  return items.map((sermon) => ({
    id: sermon._id,
    title: sermon.title,
    priest: sermon.speaker || 'Clergy',
    duration: sermon.duration ? `${sermon.duration} min` : 'Audio',
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
