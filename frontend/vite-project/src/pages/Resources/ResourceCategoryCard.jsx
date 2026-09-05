import { motion } from 'framer-motion';
import {
  FiBook,
  FiBookOpen,
  FiCalendar,
  FiDownload,
  FiHeart,
  FiMusic,
  FiSearch,
  FiUsers,
} from 'react-icons/fi';
import { useLanguage } from '../../i18n/LanguageContext';

const iconMap = {
  bible: FiBook,
  prayer: FiHeart,
  liturgy: FiMusic,
  theology: FiBookOpen,
  study: FiSearch,
  fasting: FiCalendar,
  saints: FiUsers,
  downloads: FiDownload,
};

export default function ResourceCategoryCard({ category, index }) {
  const IconComponent = iconMap[category.icon] || FiBook;
  const { t, language } = useLanguage();
  const title =
    (language === 'am' && category.titleAm) ||
    (language === 'ti' && (category.titleTi || category.titleAm)) ||
    category.title;
  const description =
    (language === 'am' && category.descriptionAm) ||
    (language === 'ti' && (category.descriptionTi || category.descriptionAm)) ||
    category.description;

  return (
    <motion.div
      className="group relative bg-white rounded-xs p-6 sm:p-8 border border-border hover:border-primary/20 transition-all duration-500 hover:shadow-lg cursor-pointer"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{
        duration: 0.5,
        delay: index * 0.08,
        ease: [0.22, 1, 0.36, 1],
      }}
      whileHover={{ y: -4 }}
    >
      <div className="flex items-start justify-between mb-5">
        <div className="w-12 h-12 rounded-xs bg-primary/10 flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all duration-500">
          <IconComponent className="w-5.5 h-5.5 text-primary group-hover:text-white transition-colors duration-500" />
        </div>
        <span className="text-xs font-semibold text-muted bg-surface rounded-xs px-2.5 py-1">
          {t('pages.resources.resourcesCount', { count: category.count })}
        </span>
      </div>

      <h3 className="text-lg font-bold text-text mb-2 group-hover:text-primary transition-colors duration-300">
        {title}
      </h3>
      <p className="text-sm text-muted leading-relaxed">{description}</p>

      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left rounded-b-xs" />
    </motion.div>
  );
}
