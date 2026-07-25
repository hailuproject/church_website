import { motion } from 'framer-motion';
import { FiExternalLink } from 'react-icons/fi';
import Container from '../../components/Container';
import Section from '../../components/Section';
import SectionHeader from '../../components/SectionHeader';
import Button from '../../components/Button';
import FastingCard from './FastingCard';
import { fastingPeriods } from '../../data/resourcesData';

export default function FastingCalendar() {
  return (
    <Section id="fasting" className="bg-white">
      <Container>
        <SectionHeader
          subtitle="Spiritual Discipline"
          title="Fasting Calendar"
          description="The Ethiopian Orthodox Church observes over 200 fasting days per year. Learn about each fasting season and how to observe them with spiritual devotion."
        />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {fastingPeriods.map((period, i) => (
            <FastingCard key={period.id} period={period} index={i} />
          ))}
        </div>
        <motion.div
          className="flex justify-center mt-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Button href="#" variant="primary" size="lg">
            <FiExternalLink className="text-lg" />
            View Full Calendar
          </Button>
        </motion.div>
      </Container>
    </Section>
  );
}
