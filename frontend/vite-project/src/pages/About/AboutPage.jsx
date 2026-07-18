import Container from '../../components/Container';
import Section from '../../components/Section';
import SectionHeader from '../../components/SectionHeader';
import AnimatedSection from '../../components/AnimatedSection';
import ImageTextSection from '../../components/ImageTextSection';
import HeroBanner from './HeroBanner';
import Timeline from './Timeline';
import InfoCard from './InfoCard';
import BeliefCard from './BeliefCard';
import LeaderCard from './LeaderCard';
import GalleryCard from './GalleryCard';
import CounterCard from './CounterCard';
import CTASection from './CTASection';
import LocationCard from './LocationCard';
import ServiceHours from './ServiceHours';
import {
  historyBlocks,
  historyTimeline,
  missionVisionValues,
  beliefsData,
  leadersData,
  statsData,
  galleryData,
  scheduleData,
  contactData,
} from '../../data/aboutData';

function ChurchHistory() {
  return (
    <Section id="history" className="bg-surface">
      <Container>
        <SectionHeader
          subtitle="Heritage"
          title="Our History"
          description="A journey spanning nearly two millennia of unwavering faith."
        />

        <div className="flex flex-col gap-20 lg:gap-28">
          {historyBlocks.map((block, i) => (
            <ImageTextSection
              key={i}
              title={block.title}
              paragraphs={block.paragraphs}
              image={block.image}
              imageAlt={block.imageAlt}
              imageLabel={block.imageLabel}
              reversed={i % 2 !== 0}
            />
          ))}
        </div>

        <div className="mt-24 lg:mt-32">
          <SectionHeader subtitle="Timeline" title="Through the Ages" />
          <Timeline events={historyTimeline} />
        </div>
      </Container>
    </Section>
  );
}

function MissionVisionValues() {
  return (
    <Section id="mission" className="bg-white">
      <Container>
        <SectionHeader
          subtitle="Purpose"
          title="Mission, Vision & Values"
          description="The pillars that guide our community in faith and service."
        />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {missionVisionValues.map((item, i) => (
            <InfoCard key={i} icon={item.icon} title={item.title} description={item.description} delay={i * 0.12} />
          ))}
        </div>
      </Container>
    </Section>
  );
}

function OurBeliefs() {
  return (
    <Section id="beliefs" className="bg-surface">
      <Container>
        <SectionHeader
          subtitle="Doctrine"
          title="Our Faith & Beliefs"
          description="Rooted in the ancient truths of the apostolic faith, preserved unbroken for centuries."
        />
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {beliefsData.map((belief, i) => (
            <BeliefCard key={belief.title} icon={belief.icon} title={belief.title} description={belief.description} delay={i * 0.08} />
          ))}
        </div>
      </Container>
    </Section>
  );
}

function Leadership() {
  return (
    <Section id="leadership" className="bg-white">
      <Container>
        <SectionHeader
          subtitle="Shepherds"
          title="Our Leadership"
          description="Dedicated clergy and leaders guiding our community with wisdom and devotion."
        />
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {leadersData.map((leader, i) => (
            <LeaderCard key={leader.name} {...leader} delay={i * 0.1} />
          ))}
        </div>
      </Container>
    </Section>
  );
}

function Statistics() {
  return (
    <section className="relative py-24 md:py-32 overflow-hidden" aria-label="Church statistics">
      <div className="absolute inset-0 bg-gradient-to-br from-stone-900 via-primary-dark to-stone-900" />
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 opacity-5 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMSI+PHBhdGggZD0iTTM2IDM0djItSDI0di0yaDEyeiIvPjwvZz48L2c+PC9zdmc+')]" />
      </div>
      <Container className="relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4">
          {statsData.map((stat, i) => (
            <CounterCard key={stat.label} value={stat.value} suffix={stat.suffix} label={stat.label} icon={stat.icon} delay={i * 0.15} />
          ))}
        </div>
      </Container>
    </section>
  );
}

function Gallery() {
  return (
    <Section id="gallery" className="bg-surface">
      <Container>
        <SectionHeader
          subtitle="Moments"
          title="Gallery Preview"
          description="Glimpses of our worship, community, and celebrations."
        />
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
          {galleryData.map((item, i) => (
            <GalleryCard key={item.title} image={item.image} title={item.title} category={item.category} delay={i * 0.08} />
          ))}
        </div>
      </Container>
    </Section>
  );
}

function LocationAndServices() {
  return (
    <Section id="location" className="bg-white">
      <Container>
        <SectionHeader
          subtitle="Visit Us"
          title="Location & Service Hours"
          description="Join us for worship. All are welcome in our church family."
        />
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          <AnimatedSection direction="left">
            <div className="relative rounded-xs overflow-hidden shadow-sm border border-border h-80 lg:h-full min-h-[320px]">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.9663095343008!2d-74.00425878428698!3d40.74076794379132!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c259bf5c1654f3%3A0xc80f9cfce5383d5d!2sGoogle!5e0!3m2!1sen!2sus!4v1234567890"
                width="100%"
                height="100%"
                style={{ border: 0, position: 'absolute', inset: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Church location on Google Maps"
              />
              <div className="absolute inset-0 pointer-events-none border border-border rounded-xs" />
            </div>
          </AnimatedSection>

          <div className="flex flex-col gap-6">
            <ServiceHours schedule={scheduleData} />
            <LocationCard contactInfo={contactData} />
          </div>
        </div>
      </Container>
    </Section>
  );
}

export default function AboutPage() {
  return (
    <main className="min-h-screen">
      <HeroBanner />
      <ChurchHistory />
      <MissionVisionValues />
      <OurBeliefs />
      <Leadership />
      <Statistics />
      <Gallery />
      <LocationAndServices />
      <CTASection />
    </main>
  );
}
