import { useResourceCategories, useResources } from './usePublicData';
import {
  resources as staticResources,
  featuredResource as staticFeatured,
  resourceCategories as staticCategories,
} from '../data/resourcesData';
import { mediaUrl } from '../lib/publicMappers';

export function useResourcesList() {
  const { data, isError } = useResources({ limit: 20 });
  const items = data?.items || [];
  if (!items.length && isError) return staticResources;
  return items.map((resource) => ({
    id: resource._id,
    image: mediaUrl(resource.thumbnail),
    imageAlt: resource.title,
    category: resource.category || 'Resources',
    fileType: (resource.file?.format || 'PDF').toUpperCase(),
    title: resource.title,
    description: resource.description,
    language: resource.language || 'English',
    downloads: resource.downloads || 0,
    fileUrl: mediaUrl(resource.file),
  }));
}

export function useFeaturedResource() {
  const { data, isError } = useResources({ limit: 1 });
  const items = data?.items || [];
  if (!items.length && isError) return staticFeatured;
  if (!items.length) return null;
  const resource = items[0];
  return {
    title: resource.title || '',
    description: resource.description || '',
    image: mediaUrl(resource.thumbnail) || '',
    imageAlt: resource.title || '',
    category: resource.category || 'Resource',
    language: resource.language || 'English',
    downloads: resource.downloads || 0,
    pages: 0,
    author: '',
    updatedDate: resource.updatedAt || resource.createdAt || '',
    fileUrl: mediaUrl(resource.file),
  };
}

export function useResourceCategoriesList() {
  const { data, isError } = useResourceCategories();
  if (!Array.isArray(data) || !data.length) return isError ? staticCategories : [];
  return data.map((cat) => ({
    id: cat._id,
    icon: 'book',
    title: cat._id,
    description: '',
    count: cat.count || 0,
  }));
}
