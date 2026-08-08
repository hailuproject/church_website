import Container from '../../components/Container';
import Section from '../../components/Section';
import HeroBanner from './HeroBanner';
import DonationForm from './DonationForm';
import CTASection from './CTASection';
import { useContent } from '../../hooks/usePublicData';
import { useSeo } from '../../hooks/useSeo';

function DonationIntro() {
  const { data } = useContent('donate');
  const intro = data?.data?.intro || {};
  if (!intro.title && !intro.content) return null;
  return (
    <Section id="intro" className="bg-surface">
      <Container>
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-text mb-6">{intro.title}</h2>
          <p className="text-lg text-muted leading-relaxed">{intro.content}</p>
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
  useSeo({ title: 'Donate & Giving' });
  return (
    <main className="min-h-screen">
      <HeroBanner />
      <DonationIntro />
      <DonationFormSection />
      <CTASection />
    </main>
  );
}
