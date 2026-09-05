import { memo } from 'react';
import { motion } from 'framer-motion';
import {
  FiStar, FiSunrise, FiBookOpen, FiHeart,
  FiUsers, FiGlobe, FiClock, FiCalendar,
} from 'react-icons/fi';
import { useLanguage } from '../../i18n/LanguageContext';

const iconMap = {
  FiStar,
  FiSunrise,
  FiBookOpen,
  FiHeart,
  FiUsers,
  FiGlobe,
  FiClock,
  FiCalendar,
};

const CategoryCard = memo(function CategoryCard({ category, delay = 0 }) {
  const Icon = iconMap[category.icon] || FiCalendar;
  const { language } = useLanguage();
  const title =
    (language === 'am' && category.titleAm) ||
    (language === 'ti' && (category.titleTi || category.titleAm)) ||
    category.title;

  return (
    <motion.div
      className="group relative bg-white rounded-xs p-6 border border-border shadow-sm hover:shadow-lg cursor-pointer transition-all duration-500 text-center"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -4, scale: 1.02 }}
    >
      <div className={`w-12 h-12 rounded-xs ${category.color} flex items-center justify-center mx-auto mb-4 transition-transform duration-300 group-hover:scale-110`}>
        <Icon className="text-xl" />
      </div>
      <h4 className="text-sm font-bold text-text group-hover:text-primary transition-colors duration-300">
        {title}
      </h4>
    </motion.div>
  );
});

export default CategoryCard;
