import { memo } from 'react';
import { motion } from 'framer-motion';
import { FiPlay, FiClock, FiUser } from 'react-icons/fi';

const SermonCard = memo(function SermonCard({ sermon, delay = 0 }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 25 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      className="group bg-white rounded-xs border border-border overflow-hidden hover:shadow-lg hover:shadow-black/5 transition-all duration-500"
    >
      <div className="relative aspect-video overflow-hidden">
        <img
          src={sermon.thumbnail}
          alt={sermon.title}
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-500" />
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="w-14 h-14 bg-white/90 backdrop-blur-sm rounded-xs flex items-center justify-center shadow-lg"
            aria-label={`Play ${sermon.title}`}
          >
            <FiPlay className="text-xl text-primary ml-0.5" />
          </motion.button>
        </div>
        <div className="absolute bottom-3 right-3 flex items-center gap-1.5 bg-black/60 backdrop-blur-sm text-white text-xs px-2.5 py-1 rounded-xs">
          <FiClock className="text-xs" />
          {sermon.duration}
        </div>
      </div>

      <div className="p-5">
        <h3 className="text-base font-semibold text-text leading-snug mb-2 line-clamp-2 group-hover:text-primary transition-colors duration-300">
          {sermon.title}
        </h3>

        <div className="flex items-center gap-2 text-sm text-muted mb-1.5">
          <FiUser className="text-xs shrink-0" />
          <span>{sermon.priest}</span>
        </div>

        <p className="text-xs text-muted mb-2">{sermon.date}</p>

        {sermon.bibleVerse && (
          <span className="inline-block text-xs font-medium text-secondary bg-secondary/5 px-2.5 py-1 rounded-xs">
            {sermon.bibleVerse}
          </span>
        )}
      </div>
    </motion.article>
  );
});

export default SermonCard;
