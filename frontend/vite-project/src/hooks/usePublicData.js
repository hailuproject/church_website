import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { publicService } from '../services/publicService';
import { getErrorMessage } from '../lib/apiHelpers';

export const publicKeys = {
  all: ['public'],

  settings: () => [...publicKeys.all, 'settings'],
  home: () => [...publicKeys.all, 'home'],
  announcements: () => [...publicKeys.all, 'announcements'],
  events: (params = {}) => [...publicKeys.all, 'events', params],
  featuredEvents: () => [...publicKeys.all, 'events', 'featured'],
  upcomingEvents: (params = {}) => [...publicKeys.all, 'events', 'upcoming', params],
  pastEvents: (params = {}) => [...publicKeys.all, 'events', 'past', params],
  eventCalendar: (params = {}) => [...publicKeys.all, 'events', 'calendar', params],
  liturgicalCalendar: (params = {}) => [...publicKeys.all, 'events', 'liturgical', params],
  event: (id) => [...publicKeys.all, 'events', 'detail', id],
  sermons: (params = {}) => [...publicKeys.all, 'sermons', params],
  featuredSermons: () => [...publicKeys.all, 'sermons', 'featured'],
  recentSermons: (params = {}) => [...publicKeys.all, 'sermons', 'recent', params],
  sermonCategories: () => [...publicKeys.all, 'sermons', 'categories'],
  sermon: (id) => [...publicKeys.all, 'sermons', 'detail', id],
  albums: (params = {}) => [...publicKeys.all, 'gallery', params],
  album: (id) => [...publicKeys.all, 'gallery', 'detail', id],
  resources: (params = {}) => [...publicKeys.all, 'resources', params],
  resourceCategories: () => [...publicKeys.all, 'resources', 'categories'],
  resource: (id) => [...publicKeys.all, 'resources', 'detail', id],
  sacraments: (params = {}) => [...publicKeys.all, 'sacraments', params],
  sacrament: (id) => [...publicKeys.all, 'sacraments', 'detail', id],
  about: () => [...publicKeys.all, 'about'],
  leadership: (params = {}) => [...publicKeys.all, 'leadership', params],
};

export const useSettings = (options) =>
  useQuery({
    queryKey: publicKeys.settings(),
    queryFn: publicService.getSettings,
    staleTime: 5 * 60 * 1000,
    ...options,
  });

export const useHomeData = (options) =>
  useQuery({
    queryKey: publicKeys.home(),
    queryFn: publicService.getHome,
    staleTime: 60 * 1000,
    ...options,
  });

export const useActiveAnnouncements = (options) =>
  useQuery({
    queryKey: publicKeys.announcements(),
    queryFn: publicService.getActiveAnnouncements,
    staleTime: 60 * 1000,
    ...options,
  });

export const useEvents = (params, options) =>
  useQuery({
    queryKey: publicKeys.events(params),
    queryFn: () => publicService.listEvents(params),
    ...options,
  });

export const useFeaturedEvents = (options) =>
  useQuery({
    queryKey: publicKeys.featuredEvents(),
    queryFn: publicService.getFeaturedEvents,
    ...options,
  });

export const useUpcomingEvents = (params, options) =>
  useQuery({
    queryKey: publicKeys.upcomingEvents(params),
    queryFn: () => publicService.getUpcomingEvents(params),
    ...options,
  });

export const usePastEvents = (params, options) =>
  useQuery({
    queryKey: publicKeys.pastEvents(params),
    queryFn: () => publicService.getPastEvents(params),
    ...options,
  });

export const useEventCalendar = (params, options) =>
  useQuery({
    queryKey: publicKeys.eventCalendar(params),
    queryFn: () => publicService.getEventCalendar(params),
    ...options,
  });

export const useLiturgicalCalendar = (params, options) =>
  useQuery({
    queryKey: publicKeys.liturgicalCalendar(params),
    queryFn: () => publicService.getLiturgicalCalendar(params),
    ...options,
  });

export const useEvent = (id, options) =>
  useQuery({
    queryKey: publicKeys.event(id),
    queryFn: () => publicService.getEvent(id),
    enabled: Boolean(id),
    ...options,
  });

export const usePublishedSermons = (params, options) =>
  useQuery({
    queryKey: publicKeys.sermons(params),
    queryFn: () => publicService.listPublishedSermons(params),
    ...options,
  });

export const useFeaturedSermons = (options) =>
  useQuery({
    queryKey: publicKeys.featuredSermons(),
    queryFn: publicService.getFeaturedSermons,
    ...options,
  });

export const useRecentSermons = (params, options) =>
  useQuery({
    queryKey: publicKeys.recentSermons(params),
    queryFn: () => publicService.getRecentSermons(params),
    ...options,
  });

export const useSermonCategories = (options) =>
  useQuery({
    queryKey: publicKeys.sermonCategories(),
    queryFn: publicService.getSermonCategories,
    ...options,
  });

export const useSermon = (id, options) =>
  useQuery({
    queryKey: publicKeys.sermon(id),
    queryFn: () => publicService.getSermon(id),
    enabled: Boolean(id),
    ...options,
  });

export const useGalleryAlbums = (params, options) =>
  useQuery({
    queryKey: publicKeys.albums(params),
    queryFn: () => publicService.listAlbums(params),
    ...options,
  });

export const useAlbum = (id, options) =>
  useQuery({
    queryKey: publicKeys.album(id),
    queryFn: () => publicService.getAlbum(id),
    enabled: Boolean(id),
    ...options,
  });

export const useResources = (params, options) =>
  useQuery({
    queryKey: publicKeys.resources(params),
    queryFn: () => publicService.listResources(params),
    ...options,
  });

export const useResourceCategories = (options) =>
  useQuery({
    queryKey: publicKeys.resourceCategories(),
    queryFn: publicService.getResourceCategories,
    ...options,
  });

export const useResource = (id, options) =>
  useQuery({
    queryKey: publicKeys.resource(id),
    queryFn: () => publicService.getResource(id),
    enabled: Boolean(id),
    ...options,
  });

export const useSacraments = (params, options) =>
  useQuery({
    queryKey: publicKeys.sacraments(params),
    queryFn: () => publicService.listSacraments(params),
    ...options,
  });

export const useSacrament = (id, options) =>
  useQuery({
    queryKey: publicKeys.sacrament(id),
    queryFn: () => publicService.getSacrament(id),
    enabled: Boolean(id),
    ...options,
  });

export const useAbout = (options) =>
  useQuery({
    queryKey: publicKeys.about(),
    queryFn: publicService.getAbout,
    staleTime: 5 * 60 * 1000,
    ...options,
  });

export const useActiveLeadership = (params, options) =>
  useQuery({
    queryKey: publicKeys.leadership(params),
    queryFn: () => publicService.getActiveLeadership(params),
    ...options,
  });

export const useSubmitContact = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload) => publicService.submitContact(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: publicKeys.all });
    },
  });
};

export const useSubmitPrayerRequest = () =>
  useMutation({
    mutationFn: (payload) => publicService.submitPrayerRequest(payload),
  });

export const useRsvpEvent = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, payload }) => publicService.rsvpEvent(id, payload),
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: publicKeys.event(variables.id) });
    },
  });
};

export const useSermonDownload = () =>
  useMutation({
    mutationFn: (id) => publicService.incrementSermonDownload(id),
  });

export const useResourceDownload = () =>
  useMutation({
    mutationFn: (id) => publicService.incrementResourceDownload(id),
  });

export const usePublicError = (error) => getErrorMessage(error);
