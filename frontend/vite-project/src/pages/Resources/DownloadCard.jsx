import { motion } from 'framer-motion';
import { FiDownload, FiBook, FiCalendar, FiMusic, FiFileText, FiBookOpen, FiGrid } from 'react-icons/fi';
import { useLanguage } from '../../i18n/LanguageContext';
import { pickAm } from '../../lib/localize';
import { useResourceDownload } from '../../hooks/usePublicData';

const fileIcons = {
  book: FiBook,
  bible: FiBookOpen,
  calendar: FiCalendar,
  children: FiGrid,
  music: FiMusic,
  magazine: FiFileText,
  liturgy: FiBookOpen,
  hymns: FiMusic,
  psalms: FiBook,
};

export default function DownloadCard({ item, index }) {
  const { t, language } = useLanguage();
  const incrementDownload = useResourceDownload();
  const IconComponent = fileIcons[item.icon] || FiFileText;
  const title = pickAm(item, 'title', language);
  const description = pickAm(item, 'description', language);
  const size = item.fileSize || item.fileType;

  const handleDownload = () => {
    if (item.id) incrementDownload.mutate(item.id);
  };

  return (
    <motion.div
      className="group flex items-center gap-3 sm:gap-5 bg-white rounded-xs p-4 sm:p-5 border border-border hover:border-primary/20 transition-all duration-500 hover:shadow-lg"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{
        duration: 0.4,
        delay: index * 0.06,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xs bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary transition-colors duration-500">
        <IconComponent className="w-5 h-5 sm:w-5.5 sm:h-5.5 text-primary group-hover:text-white transition-colors duration-500" />
      </div>

      <div className="flex-1 min-w-0">
        <h3 className="text-sm font-bold text-text group-hover:text-primary transition-colors duration-300 truncate">
          {title}
        </h3>
        <p className="text-xs text-muted leading-relaxed mt-0.5 line-clamp-1">{description}</p>
        <div className="flex items-center gap-2 sm:gap-3 mt-2 text-xs text-muted flex-wrap">
          {size && <span>{size}</span>}
          {size && <span className="text-border">|</span>}
          <span>{item.language}</span>
          {item.category && (
            <>
              <span className="text-border">|</span>
              <span>{item.category}</span>
            </>
          )}
        </div>
      </div>

      {item.fileUrl ? (
        <motion.a
          href={item.fileUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={handleDownload}
          className="flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 rounded-xs bg-surface text-primary hover:bg-primary hover:text-white transition-all duration-500 flex-shrink-0"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          aria-label={t('pages.resources.downloadItem', { title })}
        >
          <FiDownload className="w-4 h-4" />
        </motion.a>
      ) : (
        <span className="flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 rounded-xs bg-surface text-muted flex-shrink-0">
          <FiDownload className="w-4 h-4" />
        </span>
      )}
    </motion.div>
  );
}
