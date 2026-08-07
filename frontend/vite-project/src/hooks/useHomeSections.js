import { useActiveAnnouncements, useGalleryAlbums, useHomeData, useSettings } from './usePublicData';
import {
  heroSlides as staticHeroSlides,
  welcomeData as staticWelcome,
  featuredEvents as staticEvents,
  featuredSermons as staticSermons,
  galleryPreview as staticGallery,
} from '../data/homeData';
import {
  mapAnnouncements,
  mapChurch,
  mapFeaturedEvents,
  mapFeaturedSermons,
  mapGalleryPreview,
  mapHeroSlides,
  mapWelcome,
} from '../lib/publicMappers';

export function useChurch() {
  const { data: settings } = useSettings();
  const { data: home } = useHomeData();
  return mapChurch(home?.church || settings || {});
}

export function useHeroSlides() {
  const { data: home, isError } = useHomeData();
  const slides = mapHeroSlides(home);
  if (slides) return slides;
  return isError ? staticHeroSlides : [];
}

export function useWelcomeData() {
  const { data: home, isError } = useHomeData();
  const welcome = mapWelcome(home, isError ? staticWelcome : {});
  if (welcome) return welcome;
  return isError ? staticWelcome : { title: '', description: '', image: '', scripture: '', features: [] };
}

export function useFeaturedEvents() {
  const { data: home, isError } = useHomeData();
  const events = mapFeaturedEvents(home?.upcomingEvents);
  if (events) return events;
  return isError ? staticEvents : [];
}

export function useFeaturedSermons() {
  const { data: home, isError } = useHomeData();
  const sermons = mapFeaturedSermons(home?.recentSermons);
  if (sermons) return sermons;
  return isError ? staticSermons : [];
}

export function useGalleryPreview() {
  const { data, isError } = useGalleryAlbums({ limit: 6 });
  const preview = mapGalleryPreview(data?.items);
  if (preview) return preview;
  return isError ? staticGallery : [];
}

export function useAnnouncements() {
  const { data } = useActiveAnnouncements();
  return mapAnnouncements(Array.isArray(data) ? data : []) || [];
}

export function useHomeFlags() {
  const { data: home } = useHomeData();
  return {
    showAnnouncements: home?.showAnnouncements ?? true,
    showUpcomingEvents: home?.showUpcomingEvents ?? true,
    showRecentSermons: home?.showRecentSermons ?? true,
    showLiveStream: home?.showLiveStream ?? true,
    liveStreamURL: home?.liveStreamURL || '',
  };
}
