import { motion } from 'framer-motion';

export default function GalleryCard({ image, title, category, delay = 0 }) {
  return (
    <motion.div
      className="group relative aspect-square rounded-2xl overflow-hidden cursor-pointer shadow-sm"
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ scale: 1.02 }}
    >
      <img
        src={image}
        alt={title}
        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
        loading="lazy"
      />

      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      <div className="absolute bottom-0 left-0 right-0 p-5 translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500">
        <span className="text-[11px] font-semibold tracking-wider uppercase text-secondary mb-1 block">
          {category}
        </span>
        <h4 className="text-white text-lg font-semibold">{title}</h4>
      </div>
    </motion.div>
  );
}
