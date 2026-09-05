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
    headingTi: hero.headingTi || '',
    tagline: pickHeroTagline(hero, language),
    image: mediaUrl(hero.image),
    primaryCta: mapCta(hero.primaryCta, language),
    secondaryCta: mapCta(hero.secondaryCta, language),
  };
};

const pickHeroTagline = (hero, language) =>
  (language === 'am' && hero.taglineAm) ? hero.taglineAm :
  (language === 'ti' && (hero.taglineTi || hero.taglineAm)) ? (hero.taglineTi || hero.taglineAm) : hero.tagline || '';

export const mapCta = (cta = null, language = 'en') => {
  if (!cta) return null;
  return {
    ...cta,
    label:
      (language === 'am' && cta.labelAm) ? cta.labelAm :
      (language === 'ti' && (cta.labelTi || cta.labelAm)) ? (cta.labelTi || cta.labelAm) : cta.label || '',
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
    buttonLabel: pickAm(cta, 'buttonLabel', language) || (language === 'am' ? 'ያግኙን' : language === 'ti' ? 'ተዓዘዙና' : 'Contact Us'),
    buttonHref: cta.buttonHref || '/contact',
  };
};

export const mapServiceTimes = (data = {}, language = 'en') => {
  const raw = Array.isArray(data?.serviceTimes) ? data.serviceTimes : data?.services;
  if (!Array.isArray(raw) || !raw.length) return [];
  return raw
    .map((s) => ({
      label: pickAm(s, 'label', language) || '',
      day: pickAm(s, 'day', language) || pickAm(s, 'days', language) || '',
      time: pickAm(s, 'time', language) || pickAm(s, 'startTime', language) || '',
    }))
    .filter((s) => s.day && s.time);
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
    priest: pickAm(sermon, 'speaker', language) || (language === 'ti' ? 'ቀሳውስት' : 'Clergy'),
    date: formatDate(sermon.publishedAt || sermon.date, { locale: localeTag(language) }),
    duration: sermon.duration
      ? `${sermon.duration} ${language === 'am' ? 'ደቂቃ' : language === 'ti' ? 'ደቒቕ' : 'min'}`
      : '',
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
  const addressTi = church.addressTi || {};
  const name = pickAm(church, 'churchName', language) || pickAm(church, 'name', language) || '';
  return {
    name,
    nameAm: church.nameAm || church.churchNameAm || '',
    nameTi: church.nameTi || church.churchNameTi || '',
    tagline: pickChurchText(church, 'tagline', language),
    taglineAm: church.taglineAm || '',
    taglineTi: church.taglineTi || '',
    address: pickChurchAddress(church, addressAm, addressTi, language),
    addressAm: formatAddress(addressAm),
    addressTi: formatAddress(addressTi),
    phone: church.phone || '',
    email: church.email || '',
    footerText: pickChurchText(church, 'footerText', language),
    footerTextAm: church.footerTextAm || '',
    footerTextTi: church.footerTextTi || '',
    logo: mediaUrl(church.logo),
    liveStreamURL: church.liveStreamURL || '',
    socialLinks: church.socialLinks || {},
  };
};

const pickChurchText = (church, field, language) =>
  (language === 'am' && church[`${field}Am`]) ? church[`${field}Am`] :
  (language === 'ti' && (church[`${field}Ti`] || church[`${field}Am`])) ? (church[`${field}Ti`] || church[`${field}Am`]) : church[field] || '';

const pickChurchAddress = (church, addressAm, addressTi, language) => {
  if (language === 'am' && Object.keys(addressAm).length) return formatAddress(addressAm);
  if (language === 'ti') {
    if (Object.keys(addressTi).length) return formatAddress(addressTi);
    if (Object.keys(addressAm).length) return formatAddress(addressAm);
  }
  return formatAddress(church.address);
};

export const mapSocialLinks = (social = {}) => [
  { label: 'Facebook', key: 'facebook', href: social.facebook || '' },
  { label: 'Twitter', key: 'twitter', href: social.twitter || '' },
  { label: 'Instagram', key: 'instagram', href: social.instagram || '' },
  { label: 'YouTube', key: 'youtube', href: social.youtube || '' },
  { label: 'Telegram', key: 'telegram', href: social.telegram || '' },
  { label: 'TikTok', key: 'tiktok', href: social.tiktok || '' },
].filter((link) => link.href);
