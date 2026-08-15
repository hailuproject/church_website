import { motion } from 'framer-motion';
import { useLanguage } from '../../i18n/LanguageContext';

export default function SaintCard({ saint, index }) {
  const { language } = useLanguage();
  const am = language === 'am';
  const name = am && saint.nameAm ? saint.nameAm : saint.name;
  const subtitle = am && saint.subtitleAm ? saint.subtitleAm : saint.subtitle;
  const description = am && saint.descriptionAm ? saint.descriptionAm : saint.description;

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
          src={saint.image}
          alt={saint.imageAlt}
          className="w-full aspect-[3/2] object-cover group-hover:scale-105 transition-transform duration-700"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
        <div className="absolute bottom-3 left-3 right-3">
          <p className="text-xs text-secondary-light font-semibold">{subtitle}</p>
        </div>
      </div>

      <div className="p-5">
        <h3 className="text-lg font-bold text-text mb-2 group-hover:text-primary transition-colors duration-300">
          {name}
        </h3>
        <p className="text-sm text-muted leading-relaxed line-clamp-3 mb-4">
          {description}
        </p>
      </div>
    </motion.div>
  );
}
