import Container from '../../components/Container';
import Section from '../../components/Section';
import HeroBanner from './HeroBanner';
import ContactCard from './ContactCard';
import ContactForm from './ContactForm';
import GoogleMapSection from './GoogleMapSection';
import CTASection from './CTASection';
import { useChurch } from '../../hooks/useHomeSections';
import { useSeo } from '../../hooks/useSeo';

function ContactInformation() {
  const church = useChurch();
  const cards = [
    {
      id: 'address',
      title: 'Visit Us',
      icon: 'location',
      details: [{ label: 'Address', value: church.address }].filter((d) => d.value),
    },
    {
      id: 'phone',
      title: 'Call Us',
      icon: 'phone',
      details: [{ label: 'Church Office', value: church.phone }].filter((d) => d.value),
    },
    {
      id: 'email',
      title: 'Email Us',
      icon: 'email',
      details: [{ label: 'General', value: church.email }].filter((d) => d.value),
    },
  ].filter((card) => card.details.length);

  if (!cards.length) return null;

  return (
    <Section id="info" className="bg-surface">
      <Container>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {cards.map((info, i) => (
            <ContactCard key={info.id} info={info} index={i} />
          ))}
        </div>
      </Container>
    </Section>
  );
}

function ContactFormSection() {
  return (
    <Section id="form" className="bg-white">
      <Container>
        <ContactForm />
      </Container>
    </Section>
  );
}

export default function ContactPage() {
  useSeo({ title: 'Contact Us' });
  return (
    <main className="min-h-screen">
      <HeroBanner />
      <ContactInformation />
      <ContactFormSection />
      <GoogleMapSection />
      <CTASection />
    </main>
  );
}
