import HeroBanner from './components/sermons/HeroBanner';
import LiveStreamCard from './components/sermons/LiveStreamCard';
import FeaturedTeaching from './components/sermons/FeaturedTeaching';
import SermonCard from './components/sermons/SermonCard';
import CategoryCard from './components/sermons/CategoryCard';
import AudioCard from './components/sermons/AudioCard';
import ResourceCard from './components/sermons/ResourceCard';
import ScriptureHighlight from './components/sermons/ScriptureHighlight';
import Sidebar from './components/sermons/Sidebar';
import CTASection from './components/sermons/CTASection';
import SectionHeader from '../../components/SectionHeader';
import {
  geEzResources,
} from '../../data/sermonsData';
import {
  useAudioSermons,
  useLatestSermons,
  useSermonCategoriesList,
} from '../../hooks/useSermonsSections';
import { useSeo } from '../../hooks/useSeo';
import { useTranslation } from '../../i18n/LanguageContext';

export default function SermonsPage() {
  const { t } = useTranslation();
  useSeo({ title: t('pages.sermons.title') });
  const sermons = useLatestSermons();
  const sermonCategories = useSermonCategoriesList();
  const audioSermons = useAudioSermons();
  return (
    <main className="min-h-screen">
      <HeroBanner />
      <LiveStreamCard />
      <FeaturedTeaching />

      {/* Latest Sermons + Sidebar */}
      {sermons.length > 0 && (
        <section id="sermons" className="py-20 md:py-28 bg-surface" aria-label={t('pages.sermons.latestSermons')}>
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="lg:grid lg:grid-cols-[1fr_300px] lg:gap-10">
              <div>
                <SectionHeader
                  subtitle={t('pages.sermons.sermons')}
                  title={t('pages.sermons.latestSermons')}
                  description={t('pages.sermons.latestSermonsDescription')}
                  align="left"
                />
                <div className="grid sm:grid-cols-2 lg:grid-cols-2 gap-5 -mt-8">
                  {sermons.map((sermon, i) => (
                    <SermonCard key={sermon.id} sermon={sermon} delay={i * 0.05} />
                  ))}
                </div>
              </div>
              <div className="hidden lg:block">
                <Sidebar />
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Sermon Categories */}
      {sermonCategories.length > 0 && (
        <section className="py-20 md:py-28 bg-white" aria-label={t('pages.sermons.categories')}>
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <SectionHeader
              subtitle={t('pages.sermons.browse')}
              title={t('pages.sermons.categories')}
              description={t('pages.sermons.categoriesDescription')}
            />
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 -mt-8">
              {sermonCategories.map((cat, i) => (
                <CategoryCard key={cat.id} category={cat} delay={i * 0.05} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Audio Sermons */}
      {audioSermons.length > 0 && (
        <section className="py-20 md:py-28 bg-surface" aria-label={t('pages.sermons.audioSermons')}>
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <SectionHeader
              subtitle={t('pages.sermons.listen')}
              title={t('pages.sermons.audioSermons')}
              description={t('pages.sermons.audioSermonsDescription')}
            />
            <div className="grid sm:grid-cols-2 gap-4 max-w-4xl mx-auto -mt-8">
              {audioSermons.map((audio, i) => (
                <AudioCard key={audio.id} audio={audio} delay={i * 0.05} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Ge'ez Resources */}
      {geEzResources.length > 0 && (
        <section className="py-20 md:py-28 bg-white" aria-label={t('pages.sermons.geezResources')}>
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <SectionHeader
              subtitle={t('pages.sermons.resources')}
              title={t('pages.sermons.geezResources')}
              description={t('pages.sermons.geezResourcesDescription')}
            />
            <div className="grid sm:grid-cols-2 gap-4 max-w-4xl mx-auto -mt-8">
              {geEzResources.map((resource, i) => (
                <ResourceCard key={resource.id} resource={resource} delay={i * 0.05} />
              ))}
            </div>
          </div>
        </section>
      )}

      <ScriptureHighlight />
      <CTASection />
    </main>
  );
}
