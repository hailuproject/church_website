import { motion } from 'framer-motion';
import {
  FiSunrise,
  FiSunset,
  FiHeart,
  FiActivity,
  FiClock,
  FiHome,
} from 'react-icons/fi';
import { useLanguage } from '../../i18n/LanguageContext';
import { pickAm } from '../../lib/localize';

const prayerIcons = {
  sunrise: FiSunrise,
  sunset: FiSunset,
  communion: FiHeart,
  healing: FiActivity,
  fasting: FiClock,
  family: FiHome,
};

export default function PrayerCard({ prayer, index }) {
  const { language } = useLanguage();
  const IconComponent = prayerIcons[prayer.icon] || FiHeart;
  const title = pickAm(prayer, 'title', language);
  const description = pickAm(prayer, 'description', language);

  return (
    <motion.div
      className="group bg-white rounded-xs p-5 sm:p-6 border border-border hover:border-primary/20 transition-all duration-500 hover:shadow-lg"
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
      <div className="w-12 h-12 rounded-xs bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary transition-colors duration-500">
        <IconComponent className="w-5.5 h-5.5 text-primary group-hover:text-white transition-colors duration-500" />
      </div>

      <h3 className="text-lg font-bold text-text mb-2 group-hover:text-primary transition-colors duration-300">
        {title}
      </h3>
      <p className="text-sm text-muted leading-relaxed mb-4">{description}</p>
    </motion.div>
  );
}
