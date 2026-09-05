import { useContent } from './usePublicData';
import { pickAm } from '../lib/localize';
import { useLanguage } from '../i18n/LanguageContext';

export function useAboutContent() {
  const { data } = useContent('about');
  return data?.data || {};
}

export function useAboutIntro() {
  const about = useAboutContent();
  const { language } = useLanguage();
  const intro = about.intro || null;
  if (!intro) return null;
  return {
    title: pickAm(intro, 'title', language),
    content: pickAm(intro, 'content', language),
  };
}

export function useHistoryBlocks() {
  const { language } = useLanguage();
  const about = useAboutContent();
  const history = about.history || {};
  if (!history.title && !history.content) return [];
  const title = pickAm(history, 'title', language);
  const content = pickAm(history, 'content', language);
  return [
    {
      title: title || 'Our History',
      paragraphs: content ? content.split(/\n+/).filter(Boolean) : [],
      image: '',
      imageAlt: language === 'am' ? 'የቤተክርስቲያን ታሪክ' : language === 'ti' ? 'ታሪኽ ቤተ ክርስትያን' : 'Church history',
      imageLabel: '',
    },
  ];
}

export function useAboutLocation() {
  const about = useAboutContent();
  const { language } = useLanguage();
  const location = about.location || null;
  if (!location) return null;
  return {
    title: pickAm(location, 'title', language),
    address: pickAm(location, 'address', language),
    mapQuery: location.mapQuery || '',
  };
}
