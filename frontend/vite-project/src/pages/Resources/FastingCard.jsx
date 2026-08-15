import { motion } from 'framer-motion';
import { FiCalendar } from 'react-icons/fi';
import { useLanguage } from '../../i18n/LanguageContext';

export default function FastingCard({ period, index }) {
  const { language } = useLanguage();
  const am = language === 'am';
  const duration = am && period.durationAm ? period.durationAm : period.duration;
  const month = am && period.monthAm ? period.monthAm : (period.month || period.yearRound);
  const name = am && period.nameAm ? period.nameAm : period.name;
  const description = am && period.descriptionAm ? period.descriptionAm : period.description;

  return (
    <motion.div
      className="group bg-white rounded-xs p-6 border border-border hover:border-primary/20 transition-all duration-500 hover:shadow-lg"
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
      <div className="flex items-start justify-between mb-4">
        <div className="w-12 h-12 rounded-xs bg-primary/10 flex items-center justify-center group-hover:bg-primary transition-colors duration-500">
          <FiCalendar className="w-5.5 h-5.5 text-primary group-hover:text-white transition-colors duration-500" />
        </div>
        <div className="text-right">
          <span className="block text-xs font-semibold text-secondary">{duration}</span>
          <span className="block text-xs text-muted">{month}</span>
        </div>
      </div>

      <h3 className="text-base font-bold text-text mb-2 group-hover:text-primary transition-colors duration-300">
        {name}
      </h3>
      <p className="text-sm text-muted leading-relaxed">{description}</p>
    </motion.div>
  );
}
