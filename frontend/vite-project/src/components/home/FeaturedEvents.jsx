import { memo } from 'react';
import { motion } from 'framer-motion';
import { FiClock, FiMapPin, FiArrowRight } from 'react-icons/fi';
import Container from '../Container';
import Section from '../Section';
import SectionHeader from '../SectionHeader';
import Button from '../Button';
import { useFeaturedEvents } from '../../hooks/useHomeSections';

const EventCard = memo(function EventCard({ event, index }) {
  return (
    <motion.article
      className="group bg-white rounded-xs overflow-hidden border border-border shadow-sm hover:shadow-lg transition-all duration-500"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.6, delay: index * 0.15, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -6 }}
    >
      <div className="relative h-52 overflow-hidden">
        <img
          src={event.image}
          alt={event.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
          loading="lazy"
        />
        <div className="absolute top-4 left-4 bg-white rounded-xs px-3 py-2 shadow-md text-center min-w-[60px]">
          <div className="text-[10px] font-bold text-secondary uppercase tracking-wider">
            {event.badge}
          </div>
          <div className="text-xs font-semibold text-text">{event.date}</div>
        </div>
      </div>

      <div className="p-6">
        <h3 className="text-lg font-bold text-text mb-2 group-hover:text-primary transition-colors duration-300">
          {event.title}
        </h3>
        <p className="text-sm text-muted leading-relaxed mb-4">{event.description}</p>

        <div className="flex flex-col gap-2 mb-5">
          <div className="flex items-center gap-2 text-sm text-muted">
            <FiClock className="text-secondary shrink-0" />
            <span>{event.time}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted">
            <FiMapPin className="text-secondary shrink-0" />
            <span>{event.location}</span>
          </div>
        </div>

        <a
          href="/events"
          className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:text-primary-dark transition-colors duration-200"
        >
          Learn More
          <FiArrowRight className="text-sm group-hover:translate-x-1 transition-transform duration-200" />
        </a>
      </div>
    </motion.article>
  );
});

export default function FeaturedEvents() {
  const featuredEvents = useFeaturedEvents();
  if (!featuredEvents?.length) return null;
  return (
    <Section id="events" className="bg-white">
      <Container>
        <SectionHeader
          subtitle="Events"
          title="Upcoming Events"
          description="Join us in celebration, worship, and community fellowship."
        />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredEvents.map((event, i) => (
            <EventCard key={event.id} event={event} index={i} />
          ))}
        </div>
        <div className="text-center mt-12">
          <Button href="/events" variant="outline-dark">
            View Full Calendar
          </Button>
        </div>
      </Container>
    </Section>
  );
}
