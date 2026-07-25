import { motion } from 'framer-motion';
import { FiDownload, FiBook, FiCalendar, FiMusic, FiFileText, FiBookOpen, FiGrid } from 'react-icons/fi';

const fileIcons = {
  book: FiBook,
  bible: FiBookOpen,
  calendar: FiCalendar,
  children: FiGrid,
  music: FiMusic,
  magazine: FiFileText,
};

export default function DownloadCard({ item, index }) {
  const IconComponent = fileIcons[item.icon] || FiFileText;

  return (
    <motion.div
      className="group flex items-center gap-5 bg-white rounded-xs p-5 border border-border hover:border-primary/20 transition-all duration-500 hover:shadow-lg"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{
        duration: 0.4,
        delay: index * 0.06,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      <div className="w-12 h-12 rounded-xs bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary transition-colors duration-500">
        <IconComponent className="w-5.5 h-5.5 text-primary group-hover:text-white transition-colors duration-500" />
      </div>

      <div className="flex-1 min-w-0">
        <h3 className="text-sm font-bold text-text group-hover:text-primary transition-colors duration-300 truncate">
          {item.title}
        </h3>
        <p className="text-xs text-muted leading-relaxed mt-0.5 line-clamp-1">{item.description}</p>
        <div className="flex items-center gap-3 mt-2 text-xs text-muted">
          <span>{item.fileSize}</span>
          <span className="text-border">|</span>
          <span>{item.language}</span>
        </div>
      </div>

      <motion.a
        href="#"
        className="flex items-center justify-center w-10 h-10 rounded-xs bg-surface text-primary hover:bg-primary hover:text-white transition-all duration-500 flex-shrink-0"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        aria-label={`Download ${item.title}`}
      >
        <FiDownload className="w-4 h-4" />
      </motion.a>
    </motion.div>
  );
}
