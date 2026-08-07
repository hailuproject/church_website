import { useResourceCategories, useResources } from './usePublicData';
import {
  resources as staticResources,
  featuredResource as staticFeatured,
  resourceCategories as staticCategories,
} from '../data/resourcesData';
import { mediaUrl } from '../lib/publicMappers';

export function useResourcesList() {
  const { data } = useResources({ limit: 20 });
  const items = data?.items || [];
  if (!items.length) return staticResources;
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
  const { data } = useResources({ limit: 1 });
  const items = data?.items || [];
  if (!items.length) return staticFeatured;
  const resource = items[0];
  return {
    ...staticFeatured,
    title: resource.title || staticFeatured.title,
    description: resource.description || staticFeatured.description,
    image: mediaUrl(resource.thumbnail) || staticFeatured.image,
    imageAlt: resource.title || staticFeatured.imageAlt,
    category: resource.category || staticFeatured.category,
    language: resource.language || staticFeatured.language,
    downloads: resource.downloads || 0,
    pages: staticFeatured.pages,
    author: staticFeatured.author,
    updatedDate: resource.updatedAt || resource.createdAt || staticFeatured.updatedDate,
    fileUrl: mediaUrl(resource.file),
  };
}

export function useResourceCategoriesList() {
  const { data } = useResourceCategories();
  if (!Array.isArray(data) || !data.length) return staticCategories;
  return data.map((cat) => ({
    id: cat._id,
    icon: 'book',
    title: cat._id,
    description: '',
    count: cat.count || 0,
  }));
}
