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
  const query = useResources(params);
  const items = query.data?.items || [];
  const { language } = useLanguage();
  return {
    items: items.map((resource) => mapResource(resource, language)),
    isLoading: query.isLoading || query.isFetching,
    isError: query.isError,
    isEmpty: query.isSuccess && !(query.data?.items || []).length,
    refetch: query.refetch,
  };
}

export function useResourcesList() {
  return useMappedResources({ limit: 20 });
}

export function useDownloads() {
  const { items, ...rest } = useMappedResources({ limit: 20 });
  return {
    items: items.filter((r) => DOWNLOAD_CATEGORIES.includes(r.category)),
    ...rest,
  };
}

export function useLiturgicalResources() {
  const { items, ...rest } = useMappedResources({ limit: 20 });
  return {
    items: items.filter((r) => LITURGICAL_CATEGORIES.includes(r.category)),
    ...rest,
  };
}

export function useFeaturedResource() {
  const { language } = useLanguage();
  const query = useResources({ limit: 1 });
  const items = query.data?.items || [];
  if (!items.length) {
    return {
      resource: null,
      isLoading: query.isLoading,
      isError: query.isError,
      isEmpty: query.isSuccess && !items.length,
      refetch: query.refetch,
    };
  }
  const resource = items[0];
  const title = pickAm(resource, 'title', language);
  return {
    resource: {
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
    },
    isLoading: query.isLoading,
    isError: query.isError,
    isEmpty: false,
    refetch: query.refetch,
  };
}

const RESOURCE_CATEGORY_ICONS = {
  Books: 'bible',
  Prayer: 'prayer',
  Prayers: 'prayer',
  Liturgy: 'liturgy',
  Hymns: 'liturgy',
  Music: 'liturgy',
  Scripture: 'bible',
  Scriptures: 'bible',
  Theology: 'theology',
  'Bible Study': 'study',
  Study: 'study',
  Fasting: 'fasting',
  Saints: 'saints',
  Downloads: 'downloads',
};

export function useResourceCategoriesList() {
  const query = useResourceCategories();
  const data = query.data;
  return {
    items: (Array.isArray(data) ? data : []).map((cat) => ({
      id: cat._id,
      icon: RESOURCE_CATEGORY_ICONS[cat._id] || 'bible',
      title: cat._id,
      description: '',
      count: cat.count || 0,
    })),
    isLoading: query.isLoading || query.isFetching,
    isError: query.isError,
    isEmpty: query.isSuccess && !(Array.isArray(data) && data.length),
    refetch: query.refetch,
  };
}
