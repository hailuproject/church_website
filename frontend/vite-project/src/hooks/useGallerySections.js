import { useGalleryAlbums } from './usePublicData';
import {
  albums as staticAlbums,
  featuredGallery as staticFeatured,
  galleryImages as staticImages,
  videos as staticVideos,
} from '../data/galleryData';
import { formatDate, mediaUrl } from '../lib/publicMappers';

const masonryHeights = [240, 320, 280, 360, 300, 260, 340, 220];

export function useAlbums() {
  const { data, isError } = useGalleryAlbums({ limit: 6 });
  const items = data?.items || [];
  if (!items.length && isError) return staticAlbums;
  return items.map((album) => ({
    id: album._id,
    coverImage: mediaUrl(album.coverImage) || mediaUrl(album.images?.[0]),
    imageAlt: album.albumName || 'Album',
    category: album.category || 'Gallery',
    photoCount: (album.images?.length || 0) + (album.videos?.length || 0),
    date: formatDate(album.createdAt),
    title: album.albumName,
    description: album.description,
  }));
}

export function useFeaturedAlbum() {
  const { data, isError } = useGalleryAlbums({ limit: 1 });
  const items = data?.items || [];
  if (!items.length && isError) return staticFeatured;
  if (!items.length) return null;
  const album = items[0];
  return {
    title: album.albumName || '',
    description: album.description || '',
    image: mediaUrl(album.coverImage) || mediaUrl(album.images?.[0]) || '',
    imageAlt: album.albumName || '',
    category: album.category || 'Gallery',
    photos: album.images?.length || 0,
    videos: album.videos?.length || 0,
    eventDate: formatDate(album.createdAt),
    location: '',
    countdown: null,
  };
}

export function useMasonryImages() {
  const { data, isError } = useGalleryAlbums({ limit: 8 });
  const albums = data?.items || [];
  const images = albums.flatMap((album) =>
    (album.images || []).map((image, i) => ({
      id: `${album._id}-${i}`,
      src: mediaUrl(image),
      alt: album.albumName || 'Gallery image',
      height: masonryHeights[(i + (albums.indexOf(album) || 0)) % masonryHeights.length],
      category: album.category || 'Gallery',
    }))
  );
  if (!images.length && isError) return staticImages;
  return images;
}

export function useVideoItems() {
  const { data, isError } = useGalleryAlbums({ limit: 6 });
  const albums = data?.items || [];
  const videos = albums.flatMap((album) =>
    (album.videos || []).map((video, i) => ({
      id: `${album._id}-v${i}`,
      thumbnail: mediaUrl(album.coverImage),
      title: album.albumName || 'Video',
      event: album.category || 'Gallery',
      date: formatDate(album.createdAt),
      duration: 'Video',
      url: mediaUrl(video),
    }))
  );
  if (!videos.length && isError) return staticVideos;
  return videos;
}
