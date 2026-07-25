import { motion } from 'framer-motion';
import { FiArrowRight } from 'react-icons/fi';
import Container from '../../components/Container';
import Section from '../../components/Section';
import SectionHeader from '../../components/SectionHeader';
import Button from '../../components/Button';
import { announcements } from '../../data/homeData';

const badgeColors = {
  'Feast Day': 'bg-secondary/10 text-secondary',
  Youth: 'bg-primary/10 text-primary',
  Outreach: 'bg-green-500/10 text-green-600',
};

function AnnouncementCard({ announcement, index }) {
  return (
    <motion.div
      className="group bg-white rounded-xs p-6 border border-border shadow-sm hover:shadow-lg transition-all duration-500"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.6, delay: index * 0.15, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -4 }}
    >
      <div className="flex items-center gap-3 mb-4">
        <span
          className={`text-[11px] font-semibold px-3 py-1 rounded-xs ${
            badgeColors[announcement.badge] || 'bg-surface text-muted'
          }`}
        >
          {announcement.badge}
        </span>
        <span className="text-xs text-muted">{announcement.date}</span>
      </div>

      <h3 className="text-lg font-bold text-text mb-3 group-hover:text-primary transition-colors duration-300">
        {announcement.title}
      </h3>
      <p className="text-sm text-muted leading-relaxed mb-5">{announcement.description}</p>

      <a
        href="/events"
        className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:text-primary-dark transition-colors duration-200"
      >
        Read More
        <FiArrowRight className="text-sm group-hover:translate-x-1 transition-transform duration-200" />
      </a>
    </motion.div>
  );
}

export default function Announcements() {
  return (
    <Section id="announcements" className="bg-white">
      <Container>
        <SectionHeader
          subtitle="News"
          title="Latest Announcements"
          description="Stay informed about upcoming events, feast days, and community activities."
        />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {announcements.map((item, i) => (
            <AnnouncementCard key={item.id} announcement={item} index={i} />
          ))}
        </div>
        <div className="text-center mt-12">
          <Button href="/events" variant="outline-dark">
            View All Announcements
          </Button>
        </div>
      </Container>
    </Section>
  );
}
