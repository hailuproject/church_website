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
import { useSeo } from '../../hooks/useSeo';
import { useLanguage } from '../../i18n/LanguageContext';

function ResourceCategories() {
  const { t } = useTranslation();
  const resourceCategories = useResourceCategoriesList();
  return (
    <Section id="categories" className="bg-white">
      <Container>
        <SectionHeader
          subtitle={t('pages.resources.browseByCategory')}
          title={t('pages.resources.resourceCategories')}
          description={t('pages.resources.categoriesDescription')}
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
  const { t, language } = useLanguage();
  const [activeFilter, setActiveFilter] = useState('All');
  const resources = useResourcesList();
  if (!resources.length) return null;

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
          subtitle={t('pages.resources.digitalCollection')}
          title={t('pages.resources.digitalLibrary')}
          description={t('pages.resources.libraryDescription')}
        />

        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {resourceFilters.map((filter) => (
            <motion.button
              key={filter.id}
              onClick={() => setActiveFilter(filter.id)}
              className={`px-5 py-2 rounded-xs text-sm font-medium transition-all duration-300 cursor-pointer ${
                activeFilter === filter.id
                  ? 'bg-primary text-white shadow-md'
                  : 'bg-white text-muted border border-border hover:border-primary/30 hover:text-primary'
              }`}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              {language === 'am' ? filter.am : filter.en}
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
  const { t } = useTranslation();
  if (!prayerResources.length) return null;
  return (
    <Section id="prayers" className="bg-white">
      <Container>
        <SectionHeader
          subtitle={t('pages.resources.communeWithGod')}
          title={t('pages.resources.prayerLibrary')}
          description={t('pages.resources.prayersDescription')}
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
  const { t } = useTranslation();
  return (
    <Section id="saints" className="bg-surface">
      <Container>
        <SectionHeader
          subtitle={t('pages.resources.holyOnes')}
          title={t('pages.resources.saintsTitle')}
          description={t('pages.resources.saintsDescription')}
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
  const { t } = useTranslation();
  if (!downloads.length) return null;
  return (
    <Section id="downloads" className="bg-white">
      <Container>
        <SectionHeader
          subtitle={t('pages.resources.freeMaterials')}
          title={t('pages.resources.downloadsTitle')}
          description={t('pages.resources.downloadsDescription')}
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
  const { t } = useTranslation();
  if (!faqs.length) return null;
  return (
    <Section id="faq" className="bg-surface">
      <Container>
        <SectionHeader
          subtitle={t('pages.resources.haveQuestions')}
          title={t('pages.resources.faqTitle')}
          description={t('pages.resources.faqDescription')}
        />
        <div className="max-w-3xl mx-auto">
          <Accordion items={faqs} defaultOpen={-1} />
        </div>
      </Container>
    </Section>
  );
}

export default function ResourcesPage() {
  const { t } = useTranslation();
  useSeo({ title: t('pages.resources.title') });
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
      <CTASection />
    </main>
  );
}
