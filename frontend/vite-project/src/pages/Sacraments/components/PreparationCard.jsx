import { motion } from 'framer-motion';

export default function PreparationCard({ guideline, index }) {
  const Icon = guideline.icon;

  return (
    <motion.div
      className="flex flex-col gap-4 p-6 bg-white rounded-xs border border-border shadow-sm hover:shadow-lg transition-all duration-500"
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
      <div className="w-12 h-12 flex items-center justify-center rounded-xs bg-primary/5">
        <Icon className="text-primary text-xl" aria-hidden="true" />
      </div>
      <h4 className="text-lg font-bold text-text">{guideline.title}</h4>
      <p className="text-muted text-sm leading-relaxed">{guideline.description}</p>
    </motion.div>
  );
}
