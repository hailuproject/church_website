export const mediaUrl = (media) => {
  if (!media) return '';
  if (typeof media === 'string') return media;
  if (typeof media === 'object' && media.url) return media.url;
  return '';
};

export const formatDate = (value, { fallback = '' } = {}) => {
  if (!value) return fallback;
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return fallback;
  return date.toLocaleDateString('en-US', {
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

export const mapHero = (hero = {}) => {
  if (!hero || (!hero.heading && !hero.tagline && !mediaUrl(hero.image))) return null;
  return {
    heading: hero.heading || '',
    tagline: hero.tagline || '',
    image: mediaUrl(hero.image),
    primaryCta: hero.primaryCta || null,
    secondaryCta: hero.secondaryCta || null,
  };
};

export const mapIntro = (intro = {}) => {
  if (!intro || (!intro.title && !intro.content)) return null;
  return {
    title: intro.title || '',
    content: intro.content || '',
  };
};

export const mapHomeCta = (cta = {}) => {
  if (!cta || (!cta.title && !cta.content)) return null;
  return {
    title: cta.title || '',
    content: cta.content || '',
    buttonLabel: cta.buttonLabel || 'Contact Us',
    buttonHref: cta.buttonHref || '/contact',
  };
};

export const mapFeaturedEvents = (events = [], limit = 3) => {
  if (!events.length) return null;
  return events.slice(0, limit).map((event, index) => ({
    id: event._id || event.id || index,
    image: mediaUrl(event.coverImage),
    badge: event.category || 'Event',
    date: formatDate(event.date, { fallback: '' }),
    title: event.title,
    description: event.description,
    time: formatTimeRange(event.startTime, event.endTime),
    location: event.location,
    rsvpCount: event.rsvpCount ?? event.registeredCount ?? 0,
  }));
};

export const mapFeaturedSermons = (sermons = [], limit = 3) => {
  if (!sermons.length) return null;
  return sermons.slice(0, limit).map((sermon, index) => ({
    id: sermon._id || sermon.id || index,
    thumbnail: mediaUrl(sermon.thumbnail),
    title: sermon.title,
    priest: sermon.speaker || 'Clergy',
    date: formatDate(sermon.publishedAt || sermon.date),
    duration: sermon.duration ? `${sermon.duration} min` : '',
    category: sermon.category || 'Sermon',
    hasAudio: Boolean(mediaUrl(sermon.audioUrl)),
    hasVideo: Boolean(mediaUrl(sermon.videoUrl)),
  }));
};

export const mapGalleryPreview = (albums = [], limit = 6) => {
  if (!albums.length) return null;
  return albums.slice(0, limit).map((album, index) => ({
    id: album._id || album.id || index,
    image: mediaUrl(album.coverImage) || mediaUrl(album.images?.[0]),
    title: album.albumName || `Gallery ${index + 1}`,
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

export const mapChurch = (church = {}) => ({
  name: church.name || church.churchName || '',
  nameAm: church.nameAm || church.churchNameAm || '',
  tagline: church.tagline || '',
  taglineAm: church.taglineAm || '',
  address: formatAddress(church.address),
  phone: church.phone || '',
  email: church.email || '',
  footerText: church.footerText || '',
  logo: mediaUrl(church.logo),
  liveStreamURL: church.liveStreamURL || '',
  socialLinks: church.socialLinks || {},
});

export const mapSocialLinks = (social = {}) => [
  { label: 'Facebook', key: 'facebook', href: social.facebook || '' },
  { label: 'Twitter', key: 'twitter', href: social.twitter || '' },
  { label: 'Instagram', key: 'instagram', href: social.instagram || '' },
  { label: 'YouTube', key: 'youtube', href: social.youtube || '' },
  { label: 'Telegram', key: 'telegram', href: social.telegram || '' },
  { label: 'TikTok', key: 'tiktok', href: social.tiktok || '' },
].filter((link) => link.href);
