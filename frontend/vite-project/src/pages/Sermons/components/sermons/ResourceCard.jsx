import { memo } from 'react';
import { motion } from 'framer-motion';
import {
  FiCrosshair,
  FiSun,
  FiMoon,
  FiBookOpen,
  FiFeather,
  FiDownload,
  FiHeadphones,
  FiFileText,
} from 'react-icons/fi';
import { useTranslation } from '../../../../i18n/LanguageContext';

const iconMap = {
  cross: FiCrosshair,
  sun: FiSun,
  moon: FiMoon,
  book: FiBookOpen,
  scroll: FiFeather,
};

const ResourceCard = memo(function ResourceCard({ resource, delay = 0 }) {
  const { t } = useTranslation();
  const IconComponent = iconMap[resource.icon] || FiBookOpen;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] }}
      className="group bg-white rounded-xs border border-border p-6 hover:shadow-lg hover:shadow-black/5 hover:border-primary/20 transition-all duration-500"
    >
      <div className="flex items-start gap-4 mb-4">
        <div className="w-11 h-11 bg-secondary/10 rounded-xs flex items-center justify-center shrink-0 group-hover:bg-secondary/20 transition-all duration-300">
          <IconComponent className="text-lg text-secondary" />
        </div>
        <div className="min-w-0">
          <h3 className="text-base font-semibold text-text">{resource.title}</h3>
          {resource.subtitle && (
            <p className="text-sm text-secondary font-medium">{resource.subtitle}</p>
          )}
        </div>
      </div>

      <p className="text-sm text-muted leading-relaxed mb-5 line-clamp-3">
        {resource.description}
      </p>

      <div className="flex items-center gap-2 pt-4 border-t border-border">
        <motion.a
          href={resource.pdfUrl}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          className="flex items-center gap-1.5 text-xs font-medium bg-primary/10 text-primary px-3 py-2 rounded-xs hover:bg-primary hover:text-white transition-all duration-300"
          aria-label={t('pages.resources.downloadPdf')}
        >
          <FiDownload className="text-xs" />
          {t('pages.resources.download')}
        </motion.a>
        <motion.a
          href={resource.audioUrl}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          className="flex items-center gap-1.5 text-xs font-medium bg-surface text-text px-3 py-2 rounded-xs hover:bg-border transition-all duration-300"
          aria-label={t('pages.sermons.listenTo', { title: resource.title })}
        >
          <FiHeadphones className="text-xs" />
          {t('pages.sermons.listen')}
        </motion.a>
        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          className="flex items-center gap-1.5 text-xs font-medium bg-surface text-text px-3 py-2 rounded-xs hover:bg-border transition-all duration-300 ml-auto"
          aria-label={t('pages.sermons.readResource', { title: resource.title })}
        >
          <FiFileText className="text-xs" />
          {t('pages.sermons.read')}
        </motion.button>
      </div>
    </motion.div>
  );
});

export default ResourceCard;
