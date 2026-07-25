import { motion } from 'framer-motion';
import { FiDownload, FiBookOpen } from 'react-icons/fi';

export default function ResourceCard({ resource, index }) {
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
          src={resource.image}
          alt={resource.imageAlt}
          className="w-full aspect-[3/2] object-cover group-hover:scale-105 transition-transform duration-700"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        <div className="absolute top-3 left-3 bg-primary text-white text-xs font-semibold px-2.5 py-1 rounded-xs">
          {resource.category}
        </div>
        <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm text-text text-xs font-medium px-2.5 py-1 rounded-xs">
          {resource.fileType}
        </div>
      </div>

      <div className="p-5 flex flex-col gap-3">
        <h3 className="text-base font-bold text-text group-hover:text-primary transition-colors duration-300 line-clamp-1">
          {resource.title}
        </h3>
        <p className="text-sm text-muted leading-relaxed line-clamp-2">
          {resource.description}
        </p>

        <div className="flex items-center gap-2 text-xs text-muted">
          <span className="bg-surface rounded-xs px-2 py-0.5 font-medium">
            {resource.language}
          </span>
          <span className="text-border">|</span>
          <span>{resource.downloads.toLocaleString()} downloads</span>
        </div>

        <div className="flex items-center gap-3 pt-2 border-t border-border mt-1">
          <a
            href="#"
            className="flex items-center gap-1.5 text-xs font-semibold text-primary hover:text-primary-dark transition-colors duration-300"
          >
            <FiBookOpen className="w-3.5 h-3.5" />
            Read
          </a>
          <a
            href="#"
            className="flex items-center gap-1.5 text-xs font-semibold text-muted hover:text-primary transition-colors duration-300"
          >
            <FiDownload className="w-3.5 h-3.5" />
            Download
          </a>
        </div>
      </div>
    </motion.div>
  );
}
