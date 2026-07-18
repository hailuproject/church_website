import { motion } from 'framer-motion';
import { FiArrowRight } from 'react-icons/fi';
import Button from '../../../components/Button';

export default function RequestCard({ card, index }) {
  const Icon = card.icon;

  return (
    <motion.div
      className="flex flex-col items-center text-center gap-4 p-8 bg-white rounded-xs border border-border shadow-sm hover:shadow-lg transition-all duration-500"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{
        duration: 0.6,
        delay: index * 0.08,
        ease: [0.22, 1, 0.36, 1],
      }}
      whileHover={{ y: -4 }}
    >
      <div className="w-14 h-14 flex items-center justify-center rounded-xs bg-primary/5">
        <Icon className="text-primary text-2xl" aria-hidden="true" />
      </div>
      <h4 className="text-lg font-bold text-text">{card.title}</h4>
      <p className="text-muted text-sm leading-relaxed">{card.description}</p>
      <Button href={card.link} variant="outline-dark" size="sm">
        Request This Sacrament
        <FiArrowRight className="text-sm" />
      </Button>
    </motion.div>
  );
}
