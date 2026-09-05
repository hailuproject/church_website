import { memo } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../../i18n/LanguageContext';
import { withFallback } from '../../lib/images';

const FeastCard = memo(function FeastCard({ feast, delay = 0 }) {
  const { language } = useLanguage();
  const month =
    (language === 'am' && feast.monthAm) ||
    (language === 'ti' && (feast.monthTi || feast.monthAm)) ||
    feast.month;
  const description =
    (language === 'am' && feast.descriptionAm) ||
    (language === 'ti' && (feast.descriptionTi || feast.descriptionAm)) ||
    feast.description;
  const feastName =
    (language === 'am' && feast.amharic) ||
    (language === 'ti' && (feast.tigrigna || feast.amharic)) ||
    feast.name;

  return (
    <motion.article
      className="group relative overflow-hidden rounded-xs shadow-sm hover:shadow-lg border border-border transition-all duration-500"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -6 }}
    >
      <div className="relative overflow-hidden aspect-[3/2]">
        <img
          src={withFallback(feast.image)}
          alt={`${feast.name} celebration`}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

        <div className="absolute top-4 right-4 bg-secondary/90 backdrop-blur-sm rounded-xs px-3 py-1.5">
          <span className="text-xs font-semibold text-white">{month}</span>
        </div>

        <div className="absolute bottom-0 left-0 right-0 p-5">
          <h3 className="text-lg font-bold text-white mb-0.5">
            {feastName}
          </h3>
          <span className="text-secondary-light text-sm font-medium">
            {language === 'ti' ? feast.tigrigna || feast.amharic : feast.amharic}
          </span>
        </div>
      </div>

      <div className="p-5 bg-white">
        <p className="text-sm text-muted leading-relaxed">
          {description}
        </p>
      </div>

      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 group-hover:w-16 h-0.5 bg-gradient-to-r from-transparent via-secondary to-transparent transition-all duration-500" />
    </motion.article>
  );
});

export default FeastCard;
