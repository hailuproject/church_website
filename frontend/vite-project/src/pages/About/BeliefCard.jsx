import { motion } from 'framer-motion';
import {
  FiBookOpen,
  FiBook,
  FiLayers,
  FiClock,
  FiHash,
  FiHeart,
  FiCoffee,
  FiStar,
} from 'react-icons/fi';

const iconMap = {
  trinity: FiStar,
  scriptures: FiBookOpen,
  books: FiLayers,
  tradition: FiClock,
  prayer: FiHeart,
  sacraments: FiBook,
  fasting: FiCoffee,
  love: FiHeart,
};

const colorMap = {
  trinity: 'from-primary/10 to-primary/5',
  scriptures: 'from-secondary/10 to-secondary/5',
  books: 'from-primary/10 to-primary/5',
  tradition: 'from-secondary/10 to-secondary/5',
  prayer: 'from-primary/10 to-primary/5',
  sacraments: 'from-secondary/10 to-secondary/5',
  fasting: 'from-primary/10 to-primary/5',
  love: 'from-secondary/10 to-secondary/5',
};

export default function BeliefCard({ icon, title, description, delay = 0 }) {
  const Icon = iconMap[icon] || FiBookOpen;
  const gradient = colorMap[icon] || 'from-secondary/10 to-secondary/5';

  return (
    <motion.div
      className="group relative bg-white rounded-xs p-6 shadow-sm hover:shadow-lg border border-border hover:border-primary/20 transition-all duration-500 overflow-hidden"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -4 }}
    >
      <div className={`absolute top-0 right-0 w-28 h-28 bg-gradient-to-bl ${gradient} rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

      <div className="relative z-10">
        <div className="w-11 h-11 rounded-xs bg-surface group-hover:bg-primary/5 flex items-center justify-center mb-4 transition-colors duration-300">
          <Icon className="text-lg text-primary" />
        </div>
        <h3 className="text-base font-bold text-text mb-2">{title}</h3>
        <p className="text-sm text-muted leading-relaxed">{description}</p>
      </div>
    </motion.div>
  );
}
