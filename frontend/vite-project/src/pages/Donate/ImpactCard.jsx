import { motion } from 'framer-motion';

export default function ImpactCard({ impact, index }) {
  return (
    <motion.div
      className="group bg-white rounded-xs p-6 border border-border hover:border-primary/20 transition-all duration-500 hover:shadow-lg text-center"
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
      <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4 group-hover:bg-primary transition-colors duration-500">
        <span className="text-lg font-bold text-primary group-hover:text-white transition-colors duration-500">
          $
        </span>
      </div>

      <h3 className="text-2xl font-bold text-primary mb-2">
        {impact.amount.toLocaleString()}
      </h3>
      <p className="text-sm text-muted leading-relaxed">{impact.description}</p>
    </motion.div>
  );
}
