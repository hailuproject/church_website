import { useState } from 'react';
import { motion } from 'framer-motion';
import Container from '../../components/Container';
import Section from '../../components/Section';
import SectionHeader from '../../components/SectionHeader';
import HeroBanner from './components/HeroBanner';
import SacramentCard from './components/SacramentCard';
import FeaturedSacrament from './components/FeaturedSacrament';
import PreparationCard from './components/PreparationCard';
import RequestCard from './components/RequestCard';
import FAQAccordion from './components/FAQAccordion';
import ScriptureHighlight from './components/ScriptureHighlight';
import CTASection from './components/CTASection';
import {
  introductionData,
  sacraments,
  preparationGuidelines,
  requestCards,
  faqData,
} from '../../data/sacramentsData';

function Introduction() {
  return (
    <Section id="introduction" className="bg-surface">
      <Container>
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <motion.div
            className="relative overflow-hidden rounded-xs shadow-lg group order-2 lg:order-1"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <img
              src={introductionData.image}
              alt={introductionData.imageAlt}
              className="w-full aspect-[4/3] object-cover group-hover:scale-105 transition-transform duration-700"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
          </motion.div>

          <div className="flex flex-col justify-center gap-6 max-w-xl order-1 lg:order-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              <span className="text-xs font-semibold tracking-[0.2em] uppercase text-secondary mb-4 block">
                Sacred Traditions
              </span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-text leading-tight">
                {introductionData.title}
              </h2>
            </motion.div>

            {introductionData.paragraphs.map((paragraph, i) => (
              <motion.p
                key={i}
                className="text-muted text-base leading-[1.8] max-w-[65ch]"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{
                  duration: 0.6,
                  delay: (i + 1) * 0.1,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                {paragraph}
              </motion.p>
            ))}
          </div>
        </div>
      </Container>
    </Section>
  );
}

function SevenSacraments() {
  return (
    <Section id="sacraments-grid" className="bg-white">
      <Container>
        <SectionHeader
          subtitle="Holy Mysteries"
          title="The Seven Sacraments"
          description="Each Holy Mystery is a channel of God's grace, established by Christ and preserved by the Church."
        />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {sacraments.map((sacrament, i) => (
            <SacramentCard
              key={sacrament.id}
              sacrament={sacrament}
              index={i}
            />
          ))}
        </div>
      </Container>
    </Section>
  );
}

function PreparationGuidelines() {
  return (
    <Section id="preparation" className="bg-surface">
      <Container>
        <SectionHeader
          subtitle="Preparation"
          title="How to Prepare"
          description="Approaching the Holy Mysteries requires spiritual readiness and sincere devotion."
        />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {preparationGuidelines.map((guideline, i) => (
            <PreparationCard
              key={guideline.title}
              guideline={guideline}
              index={i}
            />
          ))}
        </div>
      </Container>
    </Section>
  );
}

function SacramentRequest() {
  return (
    <Section id="request" className="bg-white">
      <Container>
        <SectionHeader
          subtitle="Request"
          title="Request a Sacrament"
          description="We are here to guide you through the process of receiving the Holy Sacraments."
        />
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {requestCards.map((card, i) => (
            <RequestCard key={card.id} card={card} index={i} />
          ))}
        </div>
      </Container>
    </Section>
  );
}

function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <Section id="faq" className="bg-surface">
      <Container>
        <SectionHeader
          subtitle="Questions"
          title="Frequently Asked Questions"
          description="Find answers to common questions about the Holy Sacraments."
        />
        <div className="flex flex-col gap-3 max-w-3xl mx-auto">
          {faqData.map((item, i) => (
            <FAQAccordion
              key={i}
              item={item}
              index={i}
              isOpen={openIndex === i}
              onToggle={() => setOpenIndex(openIndex === i ? null : i)}
            />
          ))}
        </div>
      </Container>
    </Section>
  );
}

export default function SacramentsPage() {
  return (
    <main className="min-h-screen">
      <HeroBanner />
      <Introduction />
      <SevenSacraments />
      <FeaturedSacrament />
      <PreparationGuidelines />
      <SacramentRequest />
      <FAQ />
      <ScriptureHighlight />
      <CTASection />
    </main>
  );
}
