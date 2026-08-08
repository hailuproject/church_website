import { useContent } from './usePublicData';

export function useAboutContent() {
  const { data } = useContent('about');
  return data?.data || {};
}

export function useAboutIntro() {
  const about = useAboutContent();
  return about.intro || null;
}

export function useHistoryBlocks() {
  const about = useAboutContent();
  const history = about.history || {};
  if (!history.title && !history.content) return [];
  return [
    {
      title: history.title || 'Our History',
      paragraphs: history.content ? history.content.split(/\n+/).filter(Boolean) : [],
      image: '',
      imageAlt: 'Church history',
      imageLabel: '',
    },
  ];
}

export function useAboutLocation() {
  const about = useAboutContent();
  return about.location || null;
}
