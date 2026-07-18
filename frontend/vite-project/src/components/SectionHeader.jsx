import { motion } from 'framer-motion';
import Divider from './Divider';

export default function SectionHeader({
  subtitle,
  title,
  description,
  align = 'center',
  light = false,
  className = '',
}) {
  const alignment = align === 'center' ? 'text-center items-center' : 'text-left items-start';

  return (
    <motion.div
      className={`flex flex-col gap-4 max-w-3xl ${alignment} mb-16 ${className}`}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
    >
      {subtitle && (
        <span
          className={`text-xs font-semibold tracking-[0.2em] uppercase ${
            light ? 'text-secondary-light' : 'text-secondary'
          }`}
        >
          {subtitle}
        </span>
      )}
      <h2
        className={`text-3xl sm:text-4xl md:text-5xl font-bold leading-tight ${
          light ? 'text-white' : 'text-text'
        }`}
      >
        {title}
      </h2>
      {align === 'center' && <Divider />}
      {description && (
        <p
          className={`text-base sm:text-lg leading-relaxed max-w-2xl ${
            light ? 'text-gray-300' : 'text-muted'
          }`}
        >
          {description}
        </p>
      )}
    </motion.div>
  );
}
