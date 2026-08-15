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
import CTASection from './CTASection';
import { feastDays, ministries, categories } from '../../data/eventsData';
import { useUpcomingEventsList } from '../../hooks/useEventsSections';
import { useSeo } from '../../hooks/useSeo';
import { useTranslation } from '../../i18n/LanguageContext';

function UpcomingEvents() {
  const { t } = useTranslation();
  const events = useUpcomingEventsList();
  return (
    <Section id="upcoming" className="bg-surface">
      <Container>
        <SectionHeader
          subtitle={t('pages.events.upcoming')}
          title={t('pages.events.eventsAndGatherings')}
          description={t('pages.events.eventsDescription')}
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
  const { t } = useTranslation();
  return (
    <Section id="feasts" className="bg-white">
      <Container>
        <SectionHeader
          subtitle={t('pages.events.celebrations')}
          title={t('pages.events.majorFeastDays')}
          description={t('pages.events.feastDescription')}
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
  const { t } = useTranslation();
  if (!ministries.length) return null;
  return (
    <Section id="ministries" className="bg-surface">
      <Container>
        <SectionHeader
          subtitle={t('pages.events.getInvolved')}
          title={t('pages.events.churchMinistries')}
          description={t('pages.events.ministriesDescription')}
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
  const { t } = useTranslation();
  const events = useUpcomingEventsList();
  if (!events.length) return null;
  return (
    <Section id="categories" className="bg-white">
      <Container>
        <SectionHeader
          subtitle={t('pages.events.browse')}
          title={t('pages.events.eventCategories')}
          description={t('pages.events.categoriesDescription')}
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
  const { t } = useTranslation();
  useSeo({ title: t('pages.events.title') });
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
      <CTASection />
    </main>
  );
}
