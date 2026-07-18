import { FiArrowRight } from 'react-icons/fi';
import Container from '../../components/Container';
import Section from '../../components/Section';
import SectionHeader from '../../components/SectionHeader';
import Button from '../../components/Button';
import ImageTextSection from '../../components/ImageTextSection';
import PageBanner from '../../components/PageBanner';
import AnimatedSection from '../../components/AnimatedSection';
import LocationCard from '../About/LocationCard';
import ServiceHours from '../About/ServiceHours';
import { visitUsData, contactData } from '../../data/aboutData';

function IntroSection() {
  return (
    <Section className="bg-white">
      <Container>
        <ImageTextSection
          title={visitUsData.intro.title}
          paragraphs={visitUsData.intro.paragraphs}
          image={visitUsData.intro.image}
          imageAlt={visitUsData.intro.imageAlt}
          imageLabel={visitUsData.intro.imageLabel}
        />
      </Container>
    </Section>
  );
}

function MapAndSchedule() {
  return (
    <Section className="bg-surface">
      <Container>
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          {/* Map */}
          <AnimatedSection direction="left">
            <div className="relative rounded-xs overflow-hidden shadow-sm border border-border h-80 lg:h-[420px]">
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

          {/* Schedule */}
          <ServiceHours schedule={visitUsData.mapSection.schedule} />
        </div>
      </Container>
    </Section>
  );
}

function ContactSection() {
  const items = visitUsData.contactSection;

  return (
    <Section className="bg-white">
      <Container>
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Contact info */}
          <div className="flex flex-col gap-8">
            <div>
              <SectionHeader
                subtitle="Contact"
                title={items.title}
                align="left"
                className="mb-0"
              />
            </div>
            <div className="flex flex-col gap-5">
              {items.items.map((item) => (
                <div key={item.label} className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xs bg-secondary/10 flex items-center justify-center shrink-0">
                    <span className="text-secondary text-sm">
                      {item.icon === 'location' ? '\uD83D\uDCCD' : item.icon === 'phone' ? '\uD83D\uDCDE' : item.icon === 'email' ? '\u2709\uFE0F' : '\uD83D\uDD52'}
                    </span>
                  </div>
                  <div>
                    <p className="text-[11px] font-semibold tracking-wider uppercase text-muted mb-0.5">{item.label}</p>
                    <p className="text-text">{item.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Image */}
          <AnimatedSection direction="right">
            <div className="relative rounded-xs overflow-hidden shadow-lg group">
              <img
                src={items.image}
                alt={items.imageAlt}
                className="w-full aspect-[4/3] object-cover group-hover:scale-105 transition-transform duration-700"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
              <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm rounded-xs px-4 py-2">
                <span className="text-sm font-semibold text-primary">{items.imageLabel}</span>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </Container>
    </Section>
  );
}

function CTAVisitSection() {
  const items = visitUsData.ctaSection;

  return (
    <Section className="bg-surface">
      <Container>
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Text */}
          <div className="flex flex-col justify-center gap-6">
            <span className="text-secondary text-xs font-semibold tracking-[0.2em] uppercase">
              Join Us
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-text leading-tight">
              {items.title}
            </h2>
            {items.paragraphs.map((p, i) => (
              <p key={i} className="text-muted text-base leading-[1.8] max-w-[65ch]">
                {p}
              </p>
            ))}
            <div className="flex flex-col sm:flex-row items-start gap-4 mt-2">
              <Button href="/contact" variant="primary" size="lg">
                Visit Church
                <FiArrowRight className="text-lg" />
              </Button>
              <Button href="/contact" variant="outline-dark" size="lg">
                Contact Us
              </Button>
            </div>
          </div>

          {/* Image */}
          <AnimatedSection direction="right">
            <div className="relative rounded-xs overflow-hidden shadow-lg group">
              <img
                src={items.image}
                alt={items.imageAlt}
                className="w-full aspect-[4/3] object-cover group-hover:scale-105 transition-transform duration-700"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
              <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm rounded-xs px-4 py-2">
                <span className="text-sm font-semibold text-primary">{items.imageLabel}</span>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </Container>
    </Section>
  );
}

export default function VisitUsPage() {
  return (
    <main className="min-h-screen">
      <PageBanner
        title={visitUsData.hero.title}
        subtitle={visitUsData.hero.subtitle}
        description={visitUsData.hero.description}
        image={visitUsData.hero.image}
      />
      <IntroSection />
      <MapAndSchedule />
      <ContactSection />
      <CTAVisitSection />
    </main>
  );
}
