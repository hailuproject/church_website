import { useGalleryAlbums } from './usePublicData';
import { formatDate, mediaUrl } from '../lib/publicMappers';
import { localeTag, pickAm } from '../lib/localize';
import { useLanguage } from '../i18n/LanguageContext';

const masonryHeights = [240, 320, 280, 360, 300, 260, 340, 220];

export function useAlbums() {
  const { data } = useGalleryAlbums({ limit: 6 });
  const items = data?.items || [];
  const { language } = useLanguage();
  return items.map((album) => {
    const title = pickAm(album, 'albumName', language);
    return {
      id: album._id,
      coverImage: mediaUrl(album.coverImage) || mediaUrl(album.images?.[0]),
      imageAlt: title || 'Album',
      category: album.category || 'Gallery',
      photoCount: (album.images?.length || 0) + (album.videos?.length || 0),
      date: formatDate(album.createdAt, { locale: localeTag(language) }),
      title,
      description: pickAm(album, 'description', language),
    };
  });
}

export function useFeaturedAlbum() {
  const { data } = useGalleryAlbums({ limit: 1 });
  const items = data?.items || [];
  if (!items.length) return null;
  const album = items[0];
  const { language } = useLanguage();
  const title = pickAm(album, 'albumName', language);
  return {
    title,
    description: pickAm(album, 'description', language),
    image: mediaUrl(album.coverImage) || mediaUrl(album.images?.[0]) || '',
    imageAlt: title,
    category: album.category || 'Gallery',
    photos: album.images?.length || 0,
    videos: album.videos?.length || 0,
    eventDate: formatDate(album.createdAt, { locale: localeTag(language) }),
    location: '',
    countdown: null,
  };
}

export function useMasonryImages() {
  const { data } = useGalleryAlbums({ limit: 8 });
  const albums = data?.items || [];
  const { language } = useLanguage();
  const images = albums.flatMap((album) =>
    (album.images || []).map((image, i) => ({
      id: `${album._id}-${i}`,
      src: mediaUrl(image),
      alt: pickAm(album, 'albumName', language) || 'Gallery image',
      height: masonryHeights[(i + (albums.indexOf(album) || 0)) % masonryHeights.length],
      category: album.category || 'Gallery',
    }))
  );
  return images;
}

export function useVideoItems() {
  const { data } = useGalleryAlbums({ limit: 6 });
  const albums = data?.items || [];
  const { language } = useLanguage();
  const videos = albums.flatMap((album) =>
    (album.videos || []).map((video, i) => ({
      id: `${album._id}-v${i}`,
      thumbnail: mediaUrl(album.coverImage),
      title: pickAm(album, 'albumName', language) || 'Video',
      event: album.category || 'Gallery',
      date: formatDate(album.createdAt, { locale: localeTag(language) }),
      duration: 'Video',
      url: mediaUrl(video),
    }))
  );
  return videos;
}
