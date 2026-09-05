import { useContent, useGalleryAlbums, useRecentSermons, useSettings, useUpcomingEvents } from './usePublicData';
import { mapChurch, mapFeaturedEvents, mapFeaturedSermons, mapGalleryPreview, mapHero, mapHomeCta, mapServiceTimes } from '../lib/publicMappers';
import { useLanguage } from '../i18n/LanguageContext';

export function useChurch() {
  const { data: settings } = useSettings();
  const { language } = useLanguage();
  return mapChurch(settings || {}, language);
}

export function useHomeContent() {
  const { data } = useContent('home');
  return data?.data || {};
}

export function useHeroData() {
  const { language } = useLanguage();
  return mapHero(useHomeContent().hero, language) || null;
}

export function useHomeCta() {
  const { language } = useLanguage();
  return mapHomeCta(useHomeContent().cta, language) || null;
}

export function useFeaturedEvents() {
  const { data } = useUpcomingEvents({ limit: 3 });
  const { language } = useLanguage();
  return mapFeaturedEvents(data?.items || [], 3, language) || [];
}

export function useFeaturedSermons() {
  const { data } = useRecentSermons({ limit: 3 });
  const { language } = useLanguage();
  return mapFeaturedSermons(data?.items || [], 3, language) || [];
}

export function useGalleryPreview() {
  const { data } = useGalleryAlbums({ limit: 6 });
  const { language } = useLanguage();
  return mapGalleryPreview(data?.items || [], 6, language) || [];
}

export function useFeaturedEventsState() {
  const query = useUpcomingEvents({ limit: 3 });
  const { language } = useLanguage();
  return {
    items: mapFeaturedEvents(query.data?.items || [], 3, language) || [],
    isLoading: query.isLoading || query.isFetching,
    isError: query.isError,
    isEmpty: query.isSuccess && !(query.data?.items || []).length,
    refetch: query.refetch,
  };
}

export function useFeaturedSermonsState() {
  const query = useRecentSermons({ limit: 3 });
  const { language } = useLanguage();
  return {
    items: mapFeaturedSermons(query.data?.items || [], 3, language) || [],
    isLoading: query.isLoading || query.isFetching,
    isError: query.isError,
    isEmpty: query.isSuccess && !(query.data?.items || []).length,
    refetch: query.refetch,
  };
}

export function useGalleryPreviewState() {
  const query = useGalleryAlbums({ limit: 6 });
  const { language } = useLanguage();
  return {
    items: mapGalleryPreview(query.data?.items || [], 6, language) || [],
    isLoading: query.isLoading || query.isFetching,
    isError: query.isError,
    isEmpty: query.isSuccess && !(query.data?.items || []).length,
    refetch: query.refetch,
  };
}

export function useServiceTimes() {
  const { language } = useLanguage();
  return mapServiceTimes(useHomeContent(), language);
}

export function useHomeFlags() {
  const home = useHomeContent();
  return {
    showUpcomingEvents: home.showUpcomingEvents ?? true,
    showLatestSermons: home.showLatestSermons ?? true,
    showGalleryPreview: home.showGalleryPreview ?? true,
  };
}
