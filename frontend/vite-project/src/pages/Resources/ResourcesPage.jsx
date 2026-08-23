import { useState } from 'react';
import { motion } from 'framer-motion';
import Container from '../../components/Container';
import Section from '../../components/Section';
import SectionHeader from '../../components/SectionHeader';
import Accordion from '../../components/common/Accordion';
import HeroBanner from './HeroBanner';
import ResourceCategoryCard from './ResourceCategoryCard';
import ResourceCard from './ResourceCard';
import DownloadCard from './DownloadCard';
import CTASection from './CTASection';
import { resourceFilters, faqs } from '../../data/resourcesData';
import {
  useResourceCategoriesList,
  useResourcesList,
  useDownloads,
} from '../../hooks/useResourcesSections';
import { useSeo } from '../../hooks/useSeo';
import { useTranslation, useLanguage } from '../../i18n/LanguageContext';
import { pickAm } from '../../lib/localize';

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
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
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
            r.category === activeFilter ||
            (activeFilter === 'Audio' && r.fileType === 'MP3')
        );

  return (
    <Section id="library" className="bg-surface">
      <Container>
        <SectionHeader
          subtitle={t('pages.resources.digitalCollection')}
          title={t('pages.resources.digitalLibrary')}
          description={t('pages.resources.libraryDescription')}
        />

        <div className="flex items-center gap-2 mb-10 md:mb-12 overflow-x-auto pb-2 -mx-1 px-1 md:flex-wrap md:justify-center md:overflow-visible md:mx-0 md:px-0 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {resourceFilters.map((filter) => (
            <motion.button
              key={filter.id}
              onClick={() => setActiveFilter(filter.id)}
              className={`px-3.5 sm:px-5 py-2 rounded-xs text-xs sm:text-sm font-medium whitespace-nowrap transition-all duration-300 cursor-pointer ${
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

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
          {filteredResources.map((resource, i) => (
            <ResourceCard key={resource.id} resource={resource} index={i} />
          ))}
        </div>
      </Container>
    </Section>
  );
}

function Downloads() {
  const { t } = useTranslation();
  const downloads = useDownloads();
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
        </div>      </Container>
    </Section>
  );
}

function FAQ() {
  const { t, language } = useLanguage();
  if (!faqs.length) return null;
  const items = faqs.map((faq) => ({
    question: pickAm(faq, 'question', language),
    answer: pickAm(faq, 'answer', language),
  }));
  return (
    <Section id="faq" className="bg-surface">
      <Container>
        <SectionHeader
          subtitle={t('pages.resources.haveQuestions')}
          title={t('pages.resources.faqTitle')}
          description={t('pages.resources.faqDescription')}
        />
        <div className="max-w-3xl mx-auto">
          <Accordion items={items} defaultOpen={-1} />
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
      <ResourceCategories />
      <DigitalLibrary />
      <Downloads />
      <FAQ />
      <CTASection />
    </main>
  );
}
