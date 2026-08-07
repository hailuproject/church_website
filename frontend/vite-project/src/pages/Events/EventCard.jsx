import { memo } from 'react';
import { motion } from 'framer-motion';
import { FiClock, FiMapPin } from 'react-icons/fi';

const EventCard = memo(function EventCard({ event, delay = 0 }) {
  const dateObj = new Date(event.date + 'T00:00:00');
  const day = dateObj.getDate();
  const month = dateObj.toLocaleDateString('en-US', { month: 'short' }).toUpperCase();

  return (
    <motion.article
      className="group bg-white rounded-xs border border-border overflow-hidden shadow-sm hover:shadow-lg transition-all duration-500"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -6 }}
    >
      <div className="relative overflow-hidden aspect-[3/2]">
        <img
          src={event.image}
          alt={event.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />

        <div className="absolute top-4 left-4 bg-primary text-white rounded-xs px-3 py-2 shadow-lg text-center min-w-[52px]">
          <span className="text-[10px] font-semibold tracking-wider uppercase block leading-none">
            {month}
          </span>
          <span className="text-xl font-bold leading-none block mt-0.5">
            {day}
          </span>
        </div>

        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-xs px-3 py-1.5">
          <span className="text-xs font-semibold text-primary">{event.category}</span>
        </div>
      </div>

      <div className="p-6">
        <h3 className="text-lg font-bold text-text mb-2 group-hover:text-primary transition-colors duration-300">
          {event.title}
        </h3>
        <p className="text-sm text-muted leading-relaxed mb-4 line-clamp-2">
          {event.description}
        </p>

        <div className="flex flex-col gap-2 mb-5">
          <div className="flex items-center gap-2 text-xs text-muted">
            <FiClock className="text-secondary flex-shrink-0" />
            <span>{event.time}</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-muted">
            <FiMapPin className="text-secondary flex-shrink-0" />
            <span>{event.location}</span>
          </div>
        </div>
      </div>
    </motion.article>
  );
});

export default EventCard;
