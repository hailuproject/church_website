import { useResourceCategories, useResources } from './usePublicData';
import { mediaUrl } from '../lib/publicMappers';
import { pickAm } from '../lib/localize';
import { useLanguage } from '../i18n/LanguageContext';

export function useResourcesList() {
  const { data } = useResources({ limit: 20 });
  const items = data?.items || [];
  const { language } = useLanguage();
  return items.map((resource) => {
    const title = pickAm(resource, 'title', language);
    return {
      id: resource._id,
      image: mediaUrl(resource.thumbnail),
      imageAlt: title,
      category: resource.category || 'Resources',
      fileType: (resource.file?.format || 'PDF').toUpperCase(),
      title,
      description: pickAm(resource, 'description', language),
      language: resource.language || 'English',
      downloads: resource.downloads || 0,
      fileUrl: mediaUrl(resource.file),
    };
  });
}

export function useFeaturedResource() {
  const { data } = useResources({ limit: 1 });
  const items = data?.items || [];
  if (!items.length) return null;
  const resource = items[0];
  const { language } = useLanguage();
  const title = pickAm(resource, 'title', language);
  return {
    title,
    description: pickAm(resource, 'description', language),
    image: mediaUrl(resource.thumbnail) || '',
    imageAlt: title,
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
  const { data } = useResourceCategories();
  if (!Array.isArray(data) || !data.length) return [];
  return data.map((cat) => ({
    id: cat._id,
    icon: 'book',
    title: cat._id,
    description: '',
    count: cat.count || 0,
  }));
}
