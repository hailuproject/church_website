import { localeTag, pickAm } from './localize';

export const mediaUrl = (media) => {
  if (!media) return '';
  if (typeof media === 'string') return media;
  if (typeof media === 'object' && media.url) return media.url;
  return '';
};

export const formatDate = (value, { fallback = '', locale = 'en-US' } = {}) => {
  if (!value) return fallback;
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return fallback;
  return date.toLocaleDateString(locale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

export const formatTimeRange = (start, end, { fallback = '' } = {}) => {
  if (!start && !end) return fallback;
  if (start && end) return `${start} – ${end}`;
  return start || end;
};

export const mapHero = (hero = {}, language = 'en') => {
  if (!hero || (!hero.heading && !hero.tagline && !mediaUrl(hero.image))) return null;
  return {
    heading: hero.heading || '',
    headingAm: hero.headingAm || '',
    tagline: language === 'am' && hero.taglineAm ? hero.taglineAm : hero.tagline || '',
    image: mediaUrl(hero.image),
    primaryCta: mapCta(hero.primaryCta, language),
    secondaryCta: mapCta(hero.secondaryCta, language),
  };
};

export const mapCta = (cta = null, language = 'en') => {
  if (!cta) return null;
  return {
    ...cta,
    label: language === 'am' && cta.labelAm ? cta.labelAm : cta.label || '',
  };
};

export const mapIntro = (intro = {}, language = 'en') => {
  if (!intro || (!intro.title && !intro.content)) return null;
  return {
    title: pickAm(intro, 'title', language) || '',
    content: pickAm(intro, 'content', language) || '',
  };
};

export const mapHomeCta = (cta = {}, language = 'en') => {
  if (!cta || (!cta.title && !cta.content)) return null;
  return {
    title: pickAm(cta, 'title', language) || '',
    content: pickAm(cta, 'content', language) || '',
    buttonLabel: pickAm(cta, 'buttonLabel', language) || (language === 'am' ? 'ያግኙን' : 'Contact Us'),
    buttonHref: cta.buttonHref || '/contact',
  };
};

export const mapFeaturedEvents = (events = [], limit = 3, language = 'en') => {
  if (!events.length) return null;
  return events.slice(0, limit).map((event, index) => ({
    id: event._id || event.id || index,
    image: mediaUrl(event.coverImage),
    badge: event.category || 'Event',
    date: formatDate(event.date, { fallback: '', locale: localeTag(language) }),
    title: pickAm(event, 'title', language),
    description: pickAm(event, 'description', language),
    time: formatTimeRange(event.startTime, event.endTime),
    location: pickAm(event, 'location', language),
    rsvpCount: event.rsvpCount ?? event.registeredCount ?? 0,
  }));
};

export const mapFeaturedSermons = (sermons = [], limit = 3, language = 'en') => {
  if (!sermons.length) return null;
  return sermons.slice(0, limit).map((sermon, index) => ({
    id: sermon._id || sermon.id || index,
    thumbnail: mediaUrl(sermon.thumbnail),
    title: pickAm(sermon, 'title', language),
    priest: pickAm(sermon, 'speaker', language) || 'Clergy',
    date: formatDate(sermon.publishedAt || sermon.date, { locale: localeTag(language) }),
    duration: sermon.duration ? `${sermon.duration} ${language === 'am' ? 'ደቂቃ' : 'min'}` : '',
    category: sermon.category || 'Sermon',
    hasAudio: Boolean(mediaUrl(sermon.audioUrl)),
    hasVideo: Boolean(mediaUrl(sermon.videoUrl)),
  }));
};

export const mapGalleryPreview = (albums = [], limit = 6, language = 'en') => {
  if (!albums.length) return null;
  return albums.slice(0, limit).map((album, index) => ({
    id: album._id || album.id || index,
    image: mediaUrl(album.coverImage) || mediaUrl(album.images?.[0]),
    title: pickAm(album, 'albumName', language) || `Gallery ${index + 1}`,
  }));
};

export const stripHtml = (html = '') =>
  String(html)
    .replace(/<[^>]*>/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/\s+/g, ' ')
    .trim();

export const formatAddress = (address) => {
  if (!address) return '';
  if (typeof address === 'string') return address;
  if (typeof address === 'object') {
    return [address.street, address.city, address.region, address.country, address.postalCode]
      .filter(Boolean)
      .join(', ');
  }
  return '';
};

export const mapChurch = (church = {}, language = 'en') => {
  const addressAm = church.addressAm || {};
  const name = pickAm(church, 'churchName', language) || pickAm(church, 'name', language) || '';
  return {
    name,
    nameAm: church.nameAm || church.churchNameAm || '',
    tagline: language === 'am' && church.taglineAm ? church.taglineAm : church.tagline || '',
    taglineAm: church.taglineAm || '',
    address: language === 'am' ? formatAddress(addressAm) || formatAddress(church.address) : formatAddress(church.address),
    addressAm: formatAddress(addressAm),
    phone: church.phone || '',
    email: church.email || '',
    footerText: language === 'am' && church.footerTextAm ? church.footerTextAm : church.footerText || '',
    footerTextAm: church.footerTextAm || '',
    logo: mediaUrl(church.logo),
    liveStreamURL: church.liveStreamURL || '',
    socialLinks: church.socialLinks || {},
  };
};

export const mapSocialLinks = (social = {}) => [
  { label: 'Facebook', key: 'facebook', href: social.facebook || '' },
  { label: 'Twitter', key: 'twitter', href: social.twitter || '' },
  { label: 'Instagram', key: 'instagram', href: social.instagram || '' },
  { label: 'YouTube', key: 'youtube', href: social.youtube || '' },
  { label: 'Telegram', key: 'telegram', href: social.telegram || '' },
  { label: 'TikTok', key: 'tiktok', href: social.tiktok || '' },
].filter((link) => link.href);
