import { memo } from 'react';
import { motion } from 'framer-motion';
import { FiClock, FiArrowRight } from 'react-icons/fi';
import Container from '../Container';
import Section from '../Section';
import SectionHeader from '../SectionHeader';
import Button from '../Button';
import { useFeaturedSermons } from '../../hooks/useHomeSections';

const SermonCard = memo(function SermonCard({ sermon, index }) {
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
          src={sermon.thumbnail}
          alt={sermon.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
          <div className="w-14 h-14 rounded-full bg-white/90 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="w-0 h-0 border-t-[8px] border-t-transparent border-b-[8px] border-b-transparent border-l-[12px] border-l-primary ml-1" />
          </div>
        </div>
        <div className="absolute top-4 left-4 bg-primary text-white text-[11px] font-semibold px-3 py-1 rounded-xs">
          {sermon.category}
        </div>
      </div>

      <div className="p-6">
        <h3 className="text-lg font-bold text-text mb-3 group-hover:text-primary transition-colors duration-300">
          {sermon.title}
        </h3>
        <p className="text-sm text-muted mb-4">{sermon.priest}</p>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4 text-xs text-muted">
            <span>{sermon.date}</span>
            <span className="flex items-center gap-1">
              <FiClock className="text-secondary" />
              {sermon.duration}
            </span>
          </div>
          <a
            href="/sermons"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:text-primary-dark transition-colors duration-200"
          >
            Watch
            <FiArrowRight className="text-sm group-hover:translate-x-1 transition-transform duration-200" />
          </a>
        </div>
      </div>
    </motion.article>
  );
});

export default function FeaturedSermons() {
  const featuredSermons = useFeaturedSermons();
  if (!featuredSermons?.length) return null;
  return (
    <Section id="sermons" className="bg-surface">
      <Container>
        <SectionHeader
          subtitle="Sermons"
          title="Featured Sermons"
          description="Deepen your faith through the inspiring teachings of our clergy."
        />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredSermons.map((sermon, i) => (
            <SermonCard key={sermon.id} sermon={sermon} index={i} />
          ))}
        </div>
        <div className="text-center mt-12">
          <Button href="/sermons" variant="outline-dark">
            View All Sermons
          </Button>
        </div>
      </Container>
    </Section>
  );
}
