import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { publicService } from '../services/publicService';
import { getErrorMessage } from '../lib/apiHelpers';

export const publicKeys = {
  all: ['public'],

  settings: () => [...publicKeys.all, 'settings'],
  content: (key) => [...publicKeys.all, 'content', key],
  events: (params = {}) => [...publicKeys.all, 'events', params],
  featuredEvents: () => [...publicKeys.all, 'events', 'featured'],
  upcomingEvents: (params = {}) => [...publicKeys.all, 'events', 'upcoming', params],
  pastEvents: (params = {}) => [...publicKeys.all, 'events', 'past', params],
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
  submitContact: () => [...publicKeys.all, 'contact', 'submit'],
  createDonation: () => [...publicKeys.all, 'donation', 'create'],
  downloadResource: () => [...publicKeys.all, 'resources', 'download'],
};

export const useSettings = (options) =>
  useQuery({
    queryKey: publicKeys.settings(),
    queryFn: publicService.getSettings,
    staleTime: 5 * 60 * 1000,
    ...options,
  });

export const useContent = (key, options) =>
  useQuery({
    queryKey: publicKeys.content(key),
    queryFn: () => publicService.getContent(key),
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

export const useSubmitContact = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload) => publicService.submitContact(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: publicKeys.all });
    },
  });
};

export const useCreateDonation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload) => publicService.createDonation(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: publicKeys.all });
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
