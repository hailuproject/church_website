import { motion } from 'framer-motion';
import {
  FiSunrise,
  FiSunset,
  FiHeart,
  FiActivity,
  FiClock,
  FiHome,
} from 'react-icons/fi';

const prayerIcons = {
  sunrise: FiSunrise,
  sunset: FiSunset,
  communion: FiHeart,
  healing: FiActivity,
  fasting: FiClock,
  family: FiHome,
};

export default function PrayerCard({ prayer, index }) {
  const IconComponent = prayerIcons[prayer.icon] || FiHeart;

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
      <div className="w-12 h-12 rounded-xs bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary transition-colors duration-500">
        <IconComponent className="w-5.5 h-5.5 text-primary group-hover:text-white transition-colors duration-500" />
      </div>

      <h3 className="text-lg font-bold text-text mb-2 group-hover:text-primary transition-colors duration-300">
        {prayer.title}
      </h3>
      <p className="text-sm text-muted leading-relaxed mb-4">{prayer.description}</p>

      <a
        href="#"
        className="inline-flex items-center gap-2 text-xs font-semibold text-primary hover:text-primary-dark transition-colors duration-300"
      >
        Read Prayer
        <svg
          className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform duration-300"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
      </a>
    </motion.div>
  );
}
