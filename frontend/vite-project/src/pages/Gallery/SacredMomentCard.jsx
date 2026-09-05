import { motion } from 'framer-motion';
import { useLocale } from '../../lib/localize';

export default function SacredMomentCard({ moment, index }) {
  const { pick } = useLocale();
  const title = pick(moment, 'title');
  const description = pick(moment, 'description');
  return (
    <motion.div
      className="group relative overflow-hidden rounded-xs cursor-pointer"
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
        {moment.image ? (
          <img
            src={moment.image}
            alt={title}
            className="w-full aspect-[3/4] object-cover group-hover:scale-110 transition-transform duration-700"
            loading="lazy"
          />
        ) : (
          <div className="w-full aspect-[3/4] bg-linear-to-br from-primary to-primary-dark" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
      </div>

      <div className="absolute bottom-0 left-0 right-0 p-6">
        <h3 className="text-lg font-bold text-white mb-2">{title}</h3>
        <p className="text-sm text-gray-200/80 leading-relaxed line-clamp-2">
          {description}
        </p>
      </div>
    </motion.div>
  );
}
