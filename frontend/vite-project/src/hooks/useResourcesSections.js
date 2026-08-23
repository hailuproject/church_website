import { useResourceCategories, useResources } from './usePublicData';
import { mediaUrl } from '../lib/publicMappers';
import { pickAm } from '../lib/localize';
import { useLanguage } from '../i18n/LanguageContext';

const CATEGORY_ICONS = {
  Books: 'book',
  Prayers: 'bible',
  Hymns: 'hymns',
  Scriptures: 'psalms',
  Liturgy: 'liturgy',
  Music: 'music',
  Other: 'magazine',
};

const DOWNLOAD_CATEGORIES = ['Books', 'Prayers', 'Music'];
const LITURGICAL_CATEGORIES = ['Liturgy', 'Hymns', 'Scriptures'];

const formatFileSize = (bytes) => {
  if (!bytes || Number(bytes) <= 0) return '';
  const units = ['B', 'KB', 'MB', 'GB'];
  let value = Number(bytes);
  let i = 0;
  while (value >= 1024 && i < units.length - 1) {
    value /= 1024;
    i += 1;
  }
  return `${value.toFixed(value >= 10 || i === 0 ? 0 : 1)} ${units[i]}`;
};

const mapResource = (resource, language) => {
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
    fileSize: formatFileSize(resource.file?.size),
    icon: CATEGORY_ICONS[resource.category] || 'book',
  };
};

function useMappedResources(params) {
  const { data } = useResources(params);
  const items = data?.items || [];
  const { language } = useLanguage();
  return items.map((resource) => mapResource(resource, language));
}

export function useResourcesList() {
  return useMappedResources({ limit: 20 });
}

export function useDownloads() {
  return useMappedResources({ limit: 20 }).filter((r) =>
    DOWNLOAD_CATEGORIES.includes(r.category)
  );
}

export function useLiturgicalResources() {
  return useMappedResources({ limit: 20 }).filter((r) =>
    LITURGICAL_CATEGORIES.includes(r.category)
  );
}

export function useFeaturedResource() {
  const { language } = useLanguage();
  const { data } = useResources({ limit: 1 });
  const items = data?.items || [];
  if (!items.length) return null;
  const resource = items[0];
  const title = pickAm(resource, 'title', language);
  return {
    id: resource._id,
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
