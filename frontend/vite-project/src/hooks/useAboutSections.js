import { useAbout } from './usePublicData';
import {
  historyBlocks as staticHistoryBlocks,
  historyTimeline as staticTimeline,
  beliefsData as staticBeliefs,
  leadersData as staticLeaders,
} from '../data/aboutData';
import { mediaUrl } from '../lib/publicMappers';

export function useHistoryBlocks() {
  const { data, isError } = useAbout();
  const h = data?.history;
  const paragraphs = (h?.content || '').split(/\n+/).filter(Boolean);
  const images = (h?.images || []).map(mediaUrl).filter(Boolean);
  if (!h || (!h.title && !paragraphs.length)) return isError ? staticHistoryBlocks : [];
  return [
    {
      title: h.title || 'Our History',
      paragraphs: paragraphs.length ? paragraphs : [h.content].filter(Boolean),
      image: images[0] || '',
      imageAlt: 'Church history',
      imageLabel: '',
    },
  ];
}

export function useHistoryTimeline() {
  const { data, isError } = useAbout();
  const timeline = data?.timeline || [];
  if (!timeline.length) return isError ? staticTimeline : [];
  return timeline.map((entry) => ({
    year: entry.year,
    title: entry.title,
    description: entry.description,
  }));
}

export function useBeliefs() {
  const { data, isError } = useAbout();
  const beliefs = data?.faith?.beliefs || [];
  if (!beliefs.length) return isError ? staticBeliefs : [];
  return beliefs.map((belief) => ({ icon: 'faith', title: belief, description: '' }));
}

export function useLeaders() {
  const { data, isError } = useAbout();
  const leaders = data?.leadership || [];
  if (!leaders.length) return isError ? staticLeaders : [];
  return leaders.map((leader) => ({
    name: leader.name,
    role: leader.role || leader.title,
    bio: leader.bio,
    image: mediaUrl(leader.photo),
    email: leader.email,
  }));
}

export function useServiceHours() {
  const { data } = useAbout();
  const hours = data?.serviceHours || [];
  if (!hours.length) return null;
  return hours.map((entry) => ({
    day: entry.weekday,
    service: entry.name,
    time: entry.hours,
  }));
}

export function useAboutLocation() {
  const { data } = useAbout();
  return data?.location || null;
}
