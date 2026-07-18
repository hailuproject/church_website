import { memo } from 'react';
import { motion } from 'framer-motion';
import {
  FiCrosshair,
  FiBookOpen,
  FiUsers,
  FiStar,
  FiHeart,
  FiBook,
} from 'react-icons/fi';

const iconMap = {
  church: FiCrosshair,
  bible: FiBookOpen,
  youth: FiUsers,
  feast: FiStar,
  prayer: FiHeart,
  history: FiBook,
};

const CategoryCard = memo(function CategoryCard({ category, delay = 0 }) {
  const IconComponent = iconMap[category.icon] || FiBookOpen;

  return (
    <motion.a
      href={`#${category.id}`}
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -3 }}
      className="group flex flex-col items-center text-center bg-white rounded-xs border border-border p-6 hover:border-primary/20 hover:shadow-md hover:shadow-primary/5 transition-all duration-500"
    >
      <div className="w-12 h-12 bg-primary/5 rounded-xs flex items-center justify-center mb-4 group-hover:bg-primary/10 transition-all duration-300">
        <IconComponent className="text-xl text-primary" />
      </div>
      <h3 className="text-sm font-semibold text-text mb-1 group-hover:text-primary transition-colors duration-300">
        {category.title}
      </h3>
      <p className="text-xs text-muted mb-2">{category.description}</p>
      <span className="text-xs font-medium text-secondary bg-secondary/5 px-2.5 py-1 rounded-xs">
        {category.count} sermons
      </span>
    </motion.a>
  );
});

export default CategoryCard;
