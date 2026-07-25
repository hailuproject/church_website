import { motion } from 'framer-motion';
import { FiCalendar, FiImage, FiArrowRight } from 'react-icons/fi';

export default function AlbumCard({ album, index }) {
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
      <div className="relative overflow-hidden">
        <img
          src={album.coverImage}
          alt={album.imageAlt}
          className="w-full aspect-[3/2] object-cover group-hover:scale-105 transition-transform duration-700"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        <div className="absolute top-3 left-3 bg-primary text-white text-xs font-semibold px-2.5 py-1 rounded-xs">
          {album.category}
        </div>
        <div className="absolute bottom-3 right-3 bg-black/60 backdrop-blur-sm text-white text-xs font-medium px-2.5 py-1 rounded-xs flex items-center gap-1.5">
          <FiImage className="w-3.5 h-3.5" />
          {album.photoCount} photos
        </div>
      </div>

      <div className="p-5 flex flex-col gap-3">
        <div className="flex items-center gap-2 text-xs text-muted">
          <FiCalendar className="w-3.5 h-3.5" />
          {album.date}
        </div>

        <h3 className="text-base font-bold text-text group-hover:text-primary transition-colors duration-300">
          {album.title}
        </h3>

        <p className="text-sm text-muted leading-relaxed line-clamp-2">
          {album.description}
        </p>

        <a
          href="#"
          className="inline-flex items-center gap-2 text-xs font-semibold text-primary hover:text-primary-dark transition-colors duration-300 pt-2"
        >
          View Album
          <FiArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform duration-300" />
        </a>
      </div>
    </motion.div>
  );
}
