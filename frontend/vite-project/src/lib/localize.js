import { useLanguage } from '../i18n/LanguageContext';

export const pickAm = (item, field, language) => {
  if (!item) return '';
  if (language === 'am' && item[`${field}Am`]) return item[`${field}Am`];
  return item[field] || '';
};

export const localeTag = (language) => (language === 'am' ? 'am-ET' : 'en-US');

export const useLocale = () => {
  const { language } = useLanguage();
  return {
    language,
    pick: (item, field) => pickAm(item, field, language),
    loc: (en, am) => (language === 'am' && am ? am : en),
    localeTag: localeTag(language),
  };
};
