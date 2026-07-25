import { useState } from 'react';
import Container from '../../components/Container';
import Section from '../../components/Section';
import SectionHeader from '../../components/SectionHeader';
import HeroBanner from './HeroBanner';
import WhyGivingMatters from './WhyGivingMatters';
import GivingCard from './GivingCard';
import DonationForm from './DonationForm';
import ImpactCard from './ImpactCard';
import CampaignCard from './CampaignCard';
import StatisticsSection from './StatisticsSection';
import GivingMethodCard from './GivingMethodCard';
import FAQAccordion from './FAQAccordion';
import TestimonialCard from './TestimonialCard';
import ScriptureSection from './ScriptureSection';
import CTASection from './CTASection';
import {
  givingOptions,
  impacts,
  givingMethods,
  testimonials,
  faqs,
} from '../../data/donationData';

function GivingOptions() {
  return (
    <Section id="options" className="bg-white">
      <Container>
        <SectionHeader
          subtitle="How to Give"
          title="Giving Options"
          description="Choose the giving option that best suits your heart and circumstances. Every gift makes a difference."
        />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {givingOptions.map((option, i) => (
            <GivingCard key={option.id} option={option} index={i} />
          ))}
        </div>
      </Container>
    </Section>
  );
}

function DonationFormSection() {
  return (
    <Section id="donate" className="bg-surface">
      <Container>
        <DonationForm />
      </Container>
    </Section>
  );
}

function DonationImpact() {
  return (
    <Section id="impact" className="bg-white">
      <Container>
        <SectionHeader
          subtitle="Your Impact"
          title="Where Your Gift Goes"
          description="See the tangible difference your donation makes in the lives of individuals and our community."
        />
        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {impacts.map((impact, i) => (
            <ImpactCard key={impact.amount} impact={impact} index={i} />
          ))}
        </div>
      </Container>
    </Section>
  );
}

function GivingMethods() {
  return (
    <Section id="methods" className="bg-surface">
      <Container>
        <SectionHeader
          subtitle="Payment Options"
          title="Ways to Give"
          description="Multiple convenient and secure methods to make your donation."
        />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {givingMethods.map((method, i) => (
            <GivingMethodCard key={method.id} method={method} index={i} />
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
          description="Find answers to common questions about giving and donations."
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

function DonorTestimonials() {
  return (
    <Section id="testimonials" className="bg-surface">
      <Container>
        <SectionHeader
          subtitle="Donor Stories"
          title="Donor Testimonials"
          description="Hear from members of our community about the joy of giving."
        />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial, i) => (
            <TestimonialCard key={testimonial.id} testimonial={testimonial} index={i} />
          ))}
        </div>
      </Container>
    </Section>
  );
}

export default function DonatePage() {
  return (
    <main className="min-h-screen">
      <HeroBanner />
      <WhyGivingMatters />
      <GivingOptions />
      <DonationFormSection />
      <DonationImpact />
      <CampaignCard />
      <StatisticsSection />
      <GivingMethods />
      <FAQSection />
      <DonorTestimonials />
      <ScriptureSection />
      <CTASection />
    </main>
  );
}
