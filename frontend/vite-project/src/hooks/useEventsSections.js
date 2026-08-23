import { useEvents, useFeaturedEvents, useUpcomingEvents } from './usePublicData';
import { formatDate, formatTimeRange, mediaUrl } from '../lib/publicMappers';
import { localeTag, pickAm } from '../lib/localize';
import { useLanguage } from '../i18n/LanguageContext';

export function useUpcomingEventsList() {
  const { data } = useUpcomingEvents({ limit: 9 });
  const items = data?.items || [];
  const { language } = useLanguage();
  return items.map((event) => ({
    id: event._id,
    date: (event.date || '').slice(0, 10),
    image: mediaUrl(event.coverImage),
    category: event.category || 'Event',
    title: pickAm(event, 'title', language),
    description: pickAm(event, 'description', language),
    time: formatTimeRange(event.startTime, event.endTime),
    location: pickAm(event, 'location', language),
  }));
}

export function useFeaturedEvent() {
  const { language } = useLanguage();
  const { data } = useFeaturedEvents();
  const items = data?.items || [];
  if (!items.length) return null;
  const event = items[0];
  const dateObj = new Date(event.date);
  const diff = Math.max(0, dateObj.getTime() - Date.now());
  const days = Math.floor(diff / 86400000);
  const hours = Math.floor((diff % 86400000) / 3600000);
  const minutes = Math.floor((diff % 3600000) / 60000);
  const title = pickAm(event, 'title', language);
  return {
    title,
    image: mediaUrl(event.coverImage),
    imageAlt: title,
    description: pickAm(event, 'description', language),
    date: formatDate(event.date, { locale: localeTag(language) }),
    time: formatTimeRange(event.startTime, event.endTime),
    location: pickAm(event, 'location', language),
    countdown: { days, hours, minutes },
  };
}

export function useCalendarEvents() {
  const { data } = useEvents({ limit: 100 });
  const items = data?.items || [];
  const { language } = useLanguage();
  return items.map((event) => ({
    start: new Date(event.date),
    end: new Date(event.date),
    title: pickAm(event, 'title', language),
    location: pickAm(event, 'location', language),
    description: pickAm(event, 'description', language),
  }));
}
