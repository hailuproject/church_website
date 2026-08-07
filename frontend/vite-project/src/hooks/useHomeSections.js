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
  const { data: home } = useHomeData();
  return mapHeroSlides(home) || staticHeroSlides;
}

export function useWelcomeData() {
  const { data: home } = useHomeData();
  return mapWelcome(home, staticWelcome) || staticWelcome;
}

export function useFeaturedEvents() {
  const { data: home } = useHomeData();
  return mapFeaturedEvents(home?.upcomingEvents) || staticEvents;
}

export function useFeaturedSermons() {
  const { data: home } = useHomeData();
  return mapFeaturedSermons(home?.recentSermons) || staticSermons;
}

export function useGalleryPreview() {
  const { data } = useGalleryAlbums({ limit: 6 });
  return mapGalleryPreview(data?.items) || staticGallery;
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
