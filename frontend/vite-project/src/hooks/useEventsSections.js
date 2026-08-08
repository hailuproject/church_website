import { useEvents, useFeaturedEvents, useUpcomingEvents } from './usePublicData';
import { formatDate, formatTimeRange, mediaUrl } from '../lib/publicMappers';

export function useUpcomingEventsList() {
  const { data } = useUpcomingEvents({ limit: 9 });
  const items = data?.items || [];
  return items.map((event) => ({
    id: event._id,
    date: (event.date || '').slice(0, 10),
    image: mediaUrl(event.coverImage),
    category: event.category || 'Event',
    title: event.title,
    description: event.description,
    time: formatTimeRange(event.startTime, event.endTime),
    location: event.location,
  }));
}

export function useFeaturedEvent() {
  const { data } = useFeaturedEvents();
  const items = data?.items || [];
  if (!items.length) return null;
  const event = items[0];
  const dateObj = new Date(event.date);
  const diff = Math.max(0, dateObj.getTime() - Date.now());
  const days = Math.floor(diff / 86400000);
  const hours = Math.floor((diff % 86400000) / 3600000);
  const minutes = Math.floor((diff % 3600000) / 60000);
  return {
    title: event.title,
    image: mediaUrl(event.coverImage),
    imageAlt: event.title,
    description: event.description,
    date: formatDate(event.date),
    time: formatTimeRange(event.startTime, event.endTime),
    location: event.location,
    countdown: { days, hours, minutes },
  };
}

export function useCalendarEvents() {
  const { data } = useEvents({ limit: 100 });
  const items = data?.items || [];
  return items.map((event) => ({
    start: new Date(event.date),
    end: new Date(event.date),
    title: event.title,
    location: event.location,
    description: event.description,
  }));
}
