import Container from '../../components/Container';
import Section from '../../components/Section';
import HeroBanner from './HeroBanner';
import DonationForm from './DonationForm';
import CTASection from './CTASection';
import { useContent } from '../../hooks/usePublicData';
import { useSeo } from '../../hooks/useSeo';
import { useLanguage, useTranslation } from '../../i18n/LanguageContext';
import { pickAm } from '../../lib/localize';

function DonationIntro() {
  const { data } = useContent('donate');
  const { language } = useLanguage();
  const intro = data?.data?.intro || {};
  if (!intro.title && !intro.content) return null;
  return (
    <Section id="intro" className="bg-surface">
      <Container>
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-text mb-6">{pickAm(intro, 'title', language)}</h2>
          <p className="text-lg text-muted leading-relaxed">{pickAm(intro, 'content', language)}</p>
        </div>
      </Container>
    </Section>
  );
}

function DonationFormSection() {
  return (
    <Section id="donate" className="bg-white">
      <Container>
        <DonationForm />
      </Container>
    </Section>
  );
}

export default function DonatePage() {
  const { t } = useTranslation();
  useSeo({ title: t('pages.donate.title') });
  return (
    <main className="min-h-screen">
      <HeroBanner />
      <DonationIntro />
      <DonationFormSection />
      <CTASection />
    </main>
  );
}
