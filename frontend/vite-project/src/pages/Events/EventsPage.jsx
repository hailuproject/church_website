import Container from '../../components/Container';
import Section from '../../components/Section';
import SectionHeader from '../../components/SectionHeader';
import HeroBanner from './HeroBanner';
import FeaturedEvent from './FeaturedEvent';
import CalendarSection from './CalendarSection';
import EventCard from './EventCard';
import FeastCard from './FeastCard';
import ServiceTimeline from './ServiceTimeline';
import MinistryCard from './MinistryCard';
import CategoryCard from './CategoryCard';
import VisitSection from './VisitSection';
import CTASection from './CTASection';
import { events, feastDays, ministries, categories } from '../../data/eventsData';

function UpcomingEvents() {
  return (
    <Section id="upcoming" className="bg-surface">
      <Container>
        <SectionHeader
          subtitle="Upcoming"
          title="Events & Gatherings"
          description="Stay connected with our church community through these upcoming events and programs."
        />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {events.map((event, i) => (
            <EventCard key={event.id} event={event} delay={i * 0.1} />
          ))}
        </div>
      </Container>
    </Section>
  );
}

function MajorFeastDays() {
  return (
    <Section id="feasts" className="bg-white">
      <Container>
        <SectionHeader
          subtitle="Celebrations"
          title="Major Feast Days"
          description="The great liturgical celebrations of the Ethiopian Orthodox Tewahedo Church calendar."
        />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {feastDays.map((feast, i) => (
            <FeastCard key={feast.id} feast={feast} delay={i * 0.1} />
          ))}
        </div>
      </Container>
    </Section>
  );
}

function ChurchMinistries() {
  return (
    <Section id="ministries" className="bg-surface">
      <Container>
        <SectionHeader
          subtitle="Get Involved"
          title="Church Ministries"
          description="Discover ways to serve and grow within our church community."
        />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {ministries.map((ministry, i) => (
            <MinistryCard key={ministry.id} ministry={ministry} delay={i * 0.1} />
          ))}
        </div>
      </Container>
    </Section>
  );
}

function EventCategories() {
  return (
    <Section id="categories" className="bg-white">
      <Container>
        <SectionHeader
          subtitle="Browse"
          title="Event Categories"
          description="Find events by type and interest."
        />
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {categories.map((category, i) => (
            <CategoryCard key={category.id} category={category} delay={i * 0.06} />
          ))}
        </div>
      </Container>
    </Section>
  );
}

export default function EventsPage() {
  return (
    <main className="min-h-screen">
      <HeroBanner />
      <FeaturedEvent />
      <CalendarSection />
      <UpcomingEvents />
      <MajorFeastDays />
      <ServiceTimeline />
      <ChurchMinistries />
      <EventCategories />
      <VisitSection />
      <CTASection />
    </main>
  );
}
