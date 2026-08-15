import { motion } from 'framer-motion';
import { FiPlay, FiCalendar } from 'react-icons/fi';
import { useTranslation } from '../../i18n/LanguageContext';

export default function VideoCard({ video, index, onPlay }) {
  const { t } = useTranslation();
  return (
    <motion.div
      className="group bg-white rounded-xs overflow-hidden border border-border hover:border-primary/20 transition-all duration-500 hover:shadow-lg"
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
      <div
        className="relative overflow-hidden cursor-pointer"
        onClick={() => onPlay(video)}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            onPlay(video);
          }
        }}
        tabIndex={0}
        role="button"
        aria-label={t('pages.gallery.playVideo', { title: video.title })}
      >
        <img
          src={video.thumbnail}
          alt={video.title}
          className="w-full aspect-video object-cover group-hover:scale-105 transition-transform duration-700"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-500" />
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            className="w-14 h-14 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-500"
            whileHover={{ scale: 1.1 }}
          >
            <FiPlay className="w-6 h-6 text-primary ml-0.5" />
          </motion.div>
        </div>
        <div className="absolute bottom-3 right-3 bg-black/70 backdrop-blur-sm text-white text-xs font-medium px-2.5 py-1 rounded-xs">
          {video.duration}
        </div>
      </div>

      <div className="p-5">
        <div className="flex items-center gap-2 text-xs text-muted mb-2">
          <FiCalendar className="w-3.5 h-3.5" />
          {video.date}
        </div>
        <h3 className="text-base font-bold text-text group-hover:text-primary transition-colors duration-300 mb-1">
          {video.title}
        </h3>
        <p className="text-sm text-muted">{video.event}</p>
      </div>
    </motion.div>
  );
}
