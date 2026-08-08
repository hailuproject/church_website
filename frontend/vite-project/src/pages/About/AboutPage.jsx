import Container from '../../components/Container';
import Section from '../../components/Section';
import SectionHeader from '../../components/SectionHeader';
import HeroBanner from './HeroBanner';
import CTASection from './CTASection';
import { useAboutIntro, useAboutLocation, useHistoryBlocks } from '../../hooks/useAboutSections';
import { useSeo } from '../../hooks/useSeo';

function AboutIntro() {
  const intro = useAboutIntro();
  if (!intro || (!intro.title && !intro.content)) return null;
  return (
    <Section id="intro" className="bg-white">
      <Container>
        <div className="max-w-3xl mx-auto text-center">
          <SectionHeader subtitle="About" title={intro.title || 'About Our Church'} />
          <p className="text-lg text-muted leading-relaxed">{intro.content}</p>
        </div>
      </Container>
    </Section>
  );
}

function ChurchHistory() {
  const historyBlocks = useHistoryBlocks();
  if (!historyBlocks.length) return null;
  const block = historyBlocks[0];
  return (
    <Section id="history" className="bg-surface">
      <Container>
        <SectionHeader subtitle="Heritage" title={block.title} description="Our journey of faith and community." />
        <div className="max-w-3xl mx-auto flex flex-col gap-5">
          {block.paragraphs.map((paragraph, i) => (
            <p key={i} className="text-muted leading-relaxed">
              {paragraph}
            </p>
          ))}
        </div>
      </Container>
    </Section>
  );
}

function Location() {
  const location = useAboutLocation();
  if (!location || (!location.title && !location.address)) return null;
  return (
    <Section id="location" className="bg-white">
      <Container>
        <SectionHeader subtitle="Visit Us" title={location.title || 'Our Location'} />
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-lg text-muted leading-relaxed mb-6">{location.address}</p>
          <iframe
            title="Church location map"
            className="w-full h-80 rounded-xs border border-border"
            loading="lazy"
            src={`https://www.google.com/maps?q=${encodeURIComponent(location.mapQuery || location.address)}&output=embed`}
          />
        </div>
      </Container>
    </Section>
  );
}

export default function AboutPage() {
  useSeo({ title: 'About Us' });
  return (
    <main className="min-h-screen">
      <HeroBanner />
      <AboutIntro />
      <ChurchHistory />
      <Location />
      <CTASection />
    </main>
  );
}
