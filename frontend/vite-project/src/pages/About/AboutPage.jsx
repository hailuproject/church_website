import Container from '../../components/Container';
import Section from '../../components/Section';
import SectionHeader from '../../components/SectionHeader';
import HeroBanner from './HeroBanner';
import CTASection from './CTASection';
import { useAboutIntro, useAboutLocation, useHistoryBlocks } from '../../hooks/useAboutSections';
import { useSeo } from '../../hooks/useSeo';
import { useTranslation } from '../../i18n/LanguageContext';

function AboutIntro() {
  const { t } = useTranslation();
  const intro = useAboutIntro();
  if (!intro || (!intro.title && !intro.content)) return null;
  return (
    <Section id="intro" className="bg-white">
      <Container>
        <div className="max-w-3xl mx-auto text-center">
          <SectionHeader subtitle={t('pages.about.intro')} title={intro.title || t('pages.about.introTitle')} />
          <p className="text-lg text-muted leading-relaxed">{intro.content}</p>
        </div>
      </Container>
    </Section>
  );
}

function ChurchHistory() {
  const { t } = useTranslation();
  const historyBlocks = useHistoryBlocks();
  if (!historyBlocks.length) return null;
  const block = historyBlocks[0];
  return (
    <Section id="history" className="bg-surface">
      <Container>
        <SectionHeader subtitle={t('pages.about.heritage')} title={block.title} description={t('pages.about.journeyDescription')} />
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
  const { t } = useTranslation();
  const location = useAboutLocation();
  if (!location || (!location.title && !location.address)) return null;
  return (
    <Section id="location" className="bg-white">
      <Container>
        <SectionHeader subtitle={t('pages.about.visitUs')} title={location.title || t('pages.about.ourLocation')} />
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-lg text-muted leading-relaxed mb-6">{location.address}</p>
          <iframe
            title={t('pages.about.mapTitle')}
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
  const { t } = useTranslation();
  useSeo({ title: t('pages.about.title') });
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
