import { useContent, useGalleryAlbums, useRecentSermons, useSettings, useUpcomingEvents } from './usePublicData';
import { mapChurch, mapFeaturedEvents, mapFeaturedSermons, mapGalleryPreview, mapHero, mapHomeCta } from '../lib/publicMappers';

export function useChurch() {
  const { data: settings } = useSettings();
  return mapChurch(settings || {});
}

export function useHomeContent() {
  const { data } = useContent('home');
  return data?.data || {};
}

export function useHeroData() {
  return mapHero(useHomeContent().hero) || null;
}

export function useHomeCta() {
  return mapHomeCta(useHomeContent().cta) || null;
}

export function useFeaturedEvents() {
  const { data } = useUpcomingEvents({ limit: 3 });
  return mapFeaturedEvents(data?.items || []) || [];
}

export function useFeaturedSermons() {
  const { data } = useRecentSermons({ limit: 3 });
  return mapFeaturedSermons(data?.items || []) || [];
}

export function useGalleryPreview() {
  const { data } = useGalleryAlbums({ limit: 6 });
  return mapGalleryPreview(data?.items || []) || [];
}

export function useHomeFlags() {
  const home = useHomeContent();
  return {
    showUpcomingEvents: home.showUpcomingEvents ?? true,
    showLatestSermons: home.showLatestSermons ?? true,
    showGalleryPreview: home.showGalleryPreview ?? true,
  };
}
