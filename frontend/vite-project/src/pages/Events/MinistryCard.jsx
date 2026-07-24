import { memo } from 'react';
import { motion } from 'framer-motion';
import { FiHeart, FiBook, FiMusic, FiUsers, FiShield, FiGlobe } from 'react-icons/fi';

const iconMap = {
  FiHeart,
  FiBook,
  FiMusic,
  FiUsers,
  FiShield,
  FiGlobe,
};

const MinistryCard = memo(function MinistryCard({ ministry, delay = 0 }) {
  const Icon = iconMap[ministry.icon] || FiHeart;

  return (
    <motion.div
      className="group bg-white rounded-xs p-8 border border-border shadow-sm hover:shadow-lg transition-all duration-500"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -6 }}
    >
      <div className="w-14 h-14 rounded-xs bg-primary/10 group-hover:bg-primary/20 flex items-center justify-center mb-6 transition-colors duration-300">
        <Icon className="text-2xl text-primary" />
      </div>
      <h3 className="text-lg font-bold text-text mb-3 group-hover:text-primary transition-colors duration-300">
        {ministry.title}
      </h3>
      <p className="text-sm text-muted leading-relaxed">
        {ministry.description}
      </p>
    </motion.div>
  );
});

export default MinistryCard;
