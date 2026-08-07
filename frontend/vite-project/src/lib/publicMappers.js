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

export const mapHeroSlides = (home) => {
  const slides = home?.hero?.slides || [];
  const active = slides.filter((slide) => slide.isActive !== false);
  if (!active.length) return null;
  return active.map((slide) => ({
    image: mediaUrl(slide.image),
    title: slide.title,
    subtitle: slide.subtitle,
    ctaText: slide.ctaText,
    ctaLink: slide.ctaLink,
  }));
};

export const mapWelcome = (home, fallback) => {
  const welcome = home?.welcome;
  if (!welcome || (!welcome.title && !welcome.content && !mediaUrl(welcome.image))) return null;
  return {
    title: welcome.title || fallback?.title || '',
    description: welcome.content || fallback?.description || '',
    image: mediaUrl(welcome.image) || fallback?.image || '',
    scripture: welcome.scripture || '',
    features: fallback?.features || [],
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

export const mapAnnouncements = (announcements = []) => {
  if (!announcements.length) return null;
  return announcements.map((announcement, index) => ({
    id: announcement._id || announcement.id || index,
    title: announcement.title,
    description: announcement.description,
    startDate: announcement.startDate,
    endDate: announcement.endDate,
  }));
};

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
  name: church.churchName || 'Ethiopian Orthodox',
  nameAm: church.churchNameAm || '',
  tagline: church.tagline || 'Tewahedo Church',
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
