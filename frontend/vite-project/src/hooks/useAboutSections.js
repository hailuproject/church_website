import { useAbout } from './usePublicData';
import {
  historyBlocks as staticHistoryBlocks,
  historyTimeline as staticTimeline,
  beliefsData as staticBeliefs,
  leadersData as staticLeaders,
} from '../data/aboutData';
import { mediaUrl } from '../lib/publicMappers';

export function useHistoryBlocks() {
  const { data } = useAbout();
  const h = data?.history;
  const paragraphs = (h?.content || '').split(/\n+/).filter(Boolean);
  const images = (h?.images || []).map(mediaUrl).filter(Boolean);
  if (!h || (!h.title && !paragraphs.length)) return staticHistoryBlocks;
  return [
    {
      title: h.title || staticHistoryBlocks[0]?.title || 'Our History',
      paragraphs: paragraphs.length ? paragraphs : [h.content].filter(Boolean),
      image: images[0] || staticHistoryBlocks[0]?.image,
      imageAlt: staticHistoryBlocks[0]?.imageAlt || '',
      imageLabel: staticHistoryBlocks[0]?.imageLabel || '',
    },
  ];
}

export function useHistoryTimeline() {
  const { data } = useAbout();
  const timeline = data?.timeline || [];
  if (!timeline.length) return staticTimeline;
  return timeline.map((entry) => ({
    year: entry.year,
    title: entry.title,
    description: entry.description,
  }));
}

export function useBeliefs() {
  const { data } = useAbout();
  const beliefs = data?.faith?.beliefs || [];
  if (!beliefs.length) return staticBeliefs;
  return beliefs.map((belief) => ({ icon: 'faith', title: belief, description: '' }));
}

export function useLeaders() {
  const { data } = useAbout();
  const leaders = data?.leadership || [];
  if (!leaders.length) return staticLeaders;
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
