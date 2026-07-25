import { useState } from 'react';
import Container from '../../components/Container';
import Section from '../../components/Section';
import SectionHeader from '../../components/SectionHeader';
import HeroBanner from './HeroBanner';
import ContactCard from './ContactCard';
import ContactForm from './ContactForm';
import GoogleMapSection from './GoogleMapSection';
import ServiceTimeline from './ServiceTimeline';
import DepartmentCard from './DepartmentCard';
import FAQAccordion from './FAQAccordion';
import SocialCard from './SocialCard';
import VisitSection from './VisitSection';
import CTASection from './CTASection';
import {
  contactInfo,
  departments,
  socialLinks,
  faqs,
} from '../../data/contactData';

function ContactInformation() {
  return (
    <Section id="info" className="bg-surface">
      <Container>
        <SectionHeader
          subtitle="Reach Out"
          title="Contact Information"
          description="Multiple ways to connect with our church community. We are here to serve you."
        />
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {contactInfo.map((info, i) => (
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

function ChurchDepartments() {
  return (
    <Section id="departments" className="bg-surface">
      <Container>
        <SectionHeader
          subtitle="Our Teams"
          title="Church Departments"
          description="Connect with the right ministry team for your needs."
        />
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {departments.map((dept, i) => (
            <DepartmentCard key={dept.id} department={dept} index={i} />
          ))}
        </div>
      </Container>
    </Section>
  );
}

function FAQSection() {
  const [openIndex, setOpenIndex] = useState(null);

  const handleToggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <Section id="faq" className="bg-white">
      <Container>
        <SectionHeader
          subtitle="Common Questions"
          title="Frequently Asked Questions"
          description="Find quick answers to the most common questions about visiting and joining our church."
        />
        <div className="max-w-3xl mx-auto flex flex-col gap-4">
          {faqs.map((item, i) => (
            <FAQAccordion
              key={i}
              item={item}
              index={i}
              isOpen={openIndex === i}
              onToggle={() => handleToggle(i)}
            />
          ))}
        </div>
      </Container>
    </Section>
  );
}

function ConnectWithUs() {
  return (
    <Section id="social" className="bg-surface">
      <Container>
        <SectionHeader
          subtitle="Stay Connected"
          title="Connect With Us"
          description="Follow us on social media for event updates, live services, and community news."
        />
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {socialLinks.map((link, i) => (
            <SocialCard key={link.id} link={link} index={i} />
          ))}
        </div>
      </Container>
    </Section>
  );
}

export default function ContactPage() {
  return (
    <main className="min-h-screen">
      <HeroBanner />
      <ContactInformation />
      <ContactFormSection />
      <GoogleMapSection />
      <ServiceTimeline />
      <ChurchDepartments />
      <FAQSection />
      <ConnectWithUs />
      <VisitSection />
      <CTASection />
    </main>
  );
}
