import { useState } from 'react';
import { motion } from 'framer-motion';
import Container from '../../components/Container';
import Section from '../../components/Section';
import SectionHeader from '../../components/SectionHeader';
import Accordion from '../../components/common/Accordion';
import HeroBanner from './HeroBanner';
import FeaturedResource from './FeaturedResource';
import ResourceCategoryCard from './ResourceCategoryCard';
import ResourceCard from './ResourceCard';
import BibleStudySection from './BibleStudySection';
import PrayerCard from './PrayerCard';
import LiturgicalTimeline from './LiturgicalTimeline';
import FastingCalendar from './FastingCalendar';
import SaintCard from './SaintCard';
import DownloadCard from './DownloadCard';
import VisitSection from './VisitSection';
import CTASection from './CTASection';
import {
  resourceFilters,
  prayerResources,
  saints,
  downloads,
  faqs,
} from '../../data/resourcesData';
import {
  useResourceCategoriesList,
  useResourcesList,
} from '../../hooks/useResourcesSections';

function ResourceCategories() {
  const resourceCategories = useResourceCategoriesList();
  return (
    <Section id="categories" className="bg-white">
      <Container>
        <SectionHeader
          subtitle="Browse By Category"
          title="Resource Categories"
          description="Find exactly what you need across our carefully organized collection of spiritual resources."
        />
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {resourceCategories.map((category, i) => (
            <ResourceCategoryCard key={category.id} category={category} index={i} />
          ))}
        </div>
      </Container>
    </Section>
  );
}

function DigitalLibrary() {
  const [activeFilter, setActiveFilter] = useState('All');
  const resources = useResourcesList();

  const filteredResources =
    activeFilter === 'All'
      ? resources
      : resources.filter(
          (r) =>
            r.fileType === activeFilter ||
            r.category === activeFilter
        );

  return (
    <Section id="library" className="bg-surface">
      <Container>
        <SectionHeader
          subtitle="Digital Collection"
          title="Digital Library"
          description="Browse our curated collection of spiritual resources available for reading and download."
        />

        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {resourceFilters.map((filter) => (
            <motion.button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-5 py-2 rounded-xs text-sm font-medium transition-all duration-300 cursor-pointer ${
                activeFilter === filter
                  ? 'bg-primary text-white shadow-md'
                  : 'bg-white text-muted border border-border hover:border-primary/30 hover:text-primary'
              }`}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              {filter}
            </motion.button>
          ))}
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredResources.map((resource, i) => (
            <ResourceCard key={resource.id} resource={resource} index={i} />
          ))}
        </div>
      </Container>
    </Section>
  );
}

function PrayerLibrary() {
  return (
    <Section id="prayers" className="bg-white">
      <Container>
        <SectionHeader
          subtitle="Commune with God"
          title="Prayer Library"
          description="A collection of prayers for every moment of your spiritual life, from morning devotions to family gatherings."
        />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {prayerResources.map((prayer, i) => (
            <PrayerCard key={prayer.id} prayer={prayer} index={i} />
          ))}
        </div>
      </Container>
    </Section>
  );
}

function EthiopianSaints() {
  return (
    <Section id="saints" className="bg-surface">
      <Container>
        <SectionHeader
          subtitle="Holy Ones"
          title="Ethiopian Orthodox Saints"
          description="Explore the inspiring lives of the saints who shaped the faith, monasticism, and liturgical traditions of the Ethiopian Orthodox Church."
        />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {saints.map((saint, i) => (
            <SaintCard key={saint.id} saint={saint} index={i} />
          ))}
        </div>
      </Container>
    </Section>
  );
}

function Downloads() {
  return (
    <Section id="downloads" className="bg-white">
      <Container>
        <SectionHeader
          subtitle="Free Materials"
          title="Downloads"
          description="Free printable and downloadable materials for personal study, church use, and sharing with your community."
        />
        <div className="grid sm:grid-cols-2 gap-4">
          {downloads.map((item, i) => (
            <DownloadCard key={item.id} item={item} index={i} />
          ))}
        </div>
      </Container>
    </Section>
  );
}

function FAQ() {
  return (
    <Section id="faq" className="bg-surface">
      <Container>
        <SectionHeader
          subtitle="Have Questions?"
          title="Frequently Asked Questions"
          description="Find answers to common questions about our resources and how to use them."
        />
        <div className="max-w-3xl mx-auto">
          <Accordion items={faqs} defaultOpen={-1} />
        </div>
      </Container>
    </Section>
  );
}

export default function ResourcesPage() {
  return (
    <main className="min-h-screen">
      <HeroBanner />
      <FeaturedResource />
      <ResourceCategories />
      <DigitalLibrary />
      <BibleStudySection />
      <PrayerLibrary />
      <LiturgicalTimeline />
      <FastingCalendar />
      <EthiopianSaints />
      <Downloads />
      <FAQ />
      <VisitSection />
      <CTASection />
    </main>
  );
}
