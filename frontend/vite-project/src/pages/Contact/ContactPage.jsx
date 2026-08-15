import Container from '../../components/Container';
import Section from '../../components/Section';
import HeroBanner from './HeroBanner';
import ContactCard from './ContactCard';
import ContactForm from './ContactForm';
import GoogleMapSection from './GoogleMapSection';
import CTASection from './CTASection';
import { useChurch } from '../../hooks/useHomeSections';
import { useSeo } from '../../hooks/useSeo';
import { useTranslation } from '../../i18n/LanguageContext';

function ContactInformation() {
  const { t } = useTranslation();
  const church = useChurch();
  const cards = [
    {
      id: 'address',
      title: t('pages.contact.visitUs'),
      icon: 'location',
      details: [{ label: t('footer.address'), value: church.address }].filter((d) => d.value),
    },
    {
      id: 'phone',
      title: t('pages.contact.callUs'),
      icon: 'phone',
      details: [{ label: t('pages.contact.churchOffice'), value: church.phone }].filter((d) => d.value),
    },
    {
      id: 'email',
      title: t('pages.contact.emailUs'),
      icon: 'email',
      details: [{ label: t('pages.contact.general'), value: church.email }].filter((d) => d.value),
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
  const { t } = useTranslation();
  useSeo({ title: t('pages.contact.title') });
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
