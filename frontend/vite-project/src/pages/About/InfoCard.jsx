import { motion } from 'framer-motion';
import { FiTarget, FiEye, FiHeart } from 'react-icons/fi';

const iconMap = {
  mission: FiTarget,
  vision: FiEye,
  values: FiHeart,
};

export default function InfoCard({ icon, title, description, delay = 0 }) {
  const Icon = iconMap[icon] || FiHeart;

  return (
    <motion.div
      className="group relative bg-white rounded-xs p-8 shadow-sm hover:shadow-lg border border-border hover:border-secondary/30 transition-all duration-500"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -6 }}
    >
      <div className="absolute inset-0 rounded-xs bg-gradient-to-br from-secondary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      <div className="relative z-10">
        <div className="w-14 h-14 rounded-xs bg-secondary/10 group-hover:bg-secondary/20 flex items-center justify-center mb-6 transition-colors duration-300">
          <Icon className="text-2xl text-secondary" />
        </div>
        <h3 className="text-xl font-bold text-text mb-3">{title}</h3>
        <p className="text-muted leading-relaxed text-sm">{description}</p>
      </div>

      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 group-hover:w-20 h-0.5 bg-gradient-to-r from-transparent via-secondary to-transparent transition-all duration-500" />
    </motion.div>
  );
}
