import Container from '../../components/Container';
import Section from '../../components/Section';
import SectionHeader from '../../components/SectionHeader';
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
      </Container>
    </Section>
  );
}
