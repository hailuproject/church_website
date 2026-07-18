import { motion } from 'framer-motion';

export default function TimelineItem({ event, index }) {
  const isLeft = index % 2 === 0;

  return (
    <motion.div
      className={`relative flex items-start gap-8 md:gap-0 ${
        isLeft ? 'md:flex-row' : 'md:flex-row-reverse'
      }`}
      initial={{ opacity: 0, x: isLeft ? -30 : 30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.6, delay: index * 0.12, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* Content */}
      <div className="md:w-1/2 md:px-12">
        <div className="bg-white rounded-xs p-6 shadow-sm hover:shadow-md transition-all duration-300 border border-border group">
          <span className="inline-block text-[11px] font-bold tracking-[0.15em] uppercase text-primary mb-2">
            {event.year}
          </span>
          <h4 className="text-lg font-semibold text-text mb-2">
            {event.title}
          </h4>
          <p className="text-sm text-muted leading-relaxed">
            {event.description}
          </p>
        </div>
      </div>

      {/* Center dot - desktop */}
      <div
        className="hidden md:flex absolute left-1/2 -translate-x-1/2 w-10 h-10 items-center justify-center z-10"
        aria-hidden="true"
      >
        <div className="w-4 h-4 rounded-full bg-secondary shadow-lg ring-4 ring-surface" />
      </div>

      {/* Center dot - mobile */}
      <div className="md:hidden flex items-center -ml-0.5 mt-6" aria-hidden="true">
        <div className="w-3 h-3 rounded-full bg-secondary shadow ring-4 ring-surface" />
      </div>

      {/* Empty spacer for desktop */}
      <div className="hidden md:block md:w-1/2" />
    </motion.div>
  );
}
