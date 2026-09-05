import { useLanguage } from '../i18n/LanguageContext';

export const pickAm = (item, field, language) => {
  if (!item) return '';
  if (language === 'am' && item[`${field}Am`]) return item[`${field}Am`];
  if (language === 'ti') return item[`${field}Ti`] || item[`${field}Am`] || item[field] || '';
  return item[field] || '';
};

export const localeTag = (language) =>
  language === 'am' ? 'am-ET' : language === 'ti' ? 'ti-ET' : 'en-US';

export const useLocale = () => {
  const { language } = useLanguage();
  return {
    language,
    pick: (item, field) => pickAm(item, field, language),
    loc: (en, am, ti) =>
      (language === 'am' && am ? am : '') ||
      (language === 'ti' && ti ? ti : '') ||
      en,
    localeTag: localeTag(language),
  };
};
