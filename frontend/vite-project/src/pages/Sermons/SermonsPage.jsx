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
  sermons,
  sermonCategories,
  audioSermons,
  geEzResources,
} from '../../data/sermonsData';

export default function SermonsPage() {
  return (
    <main className="min-h-screen">
      <HeroBanner />
      <LiveStreamCard />
      <FeaturedTeaching />

      {/* Latest Sermons + Sidebar */}
      <section id="sermons" className="py-20 md:py-28 bg-surface" aria-label="Latest sermons">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-[1fr_300px] lg:gap-10">
            <div>
              <SectionHeader
                subtitle="Sermons"
                title="Latest Sermons"
                description="Explore our recent teachings and sermons from our clergy."
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

      {/* Sermon Categories */}
      <section className="py-20 md:py-28 bg-white" aria-label="Sermon categories">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <SectionHeader
            subtitle="Browse"
            title="Sermon Categories"
            description="Find teachings organized by topic and tradition."
          />
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 -mt-8">
            {sermonCategories.map((cat, i) => (
              <CategoryCard key={cat.id} category={cat} delay={i * 0.05} />
            ))}
          </div>
        </div>
      </section>

      {/* Audio Sermons */}
      <section className="py-20 md:py-28 bg-surface" aria-label="Audio sermons">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <SectionHeader
            subtitle="Listen"
            title="Audio Sermons"
            description="Listen to sermons and teachings on the go."
          />
          <div className="grid sm:grid-cols-2 gap-4 max-w-4xl mx-auto -mt-8">
            {audioSermons.map((audio, i) => (
              <AudioCard key={audio.id} audio={audio} delay={i * 0.05} />
            ))}
          </div>
        </div>
      </section>

      {/* Ge'ez Resources */}
      <section className="py-20 md:py-28 bg-white" aria-label="Ge'ez resources">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <SectionHeader
            subtitle="Resources"
            title="Ge'ez Liturgical Resources"
            description="Access ancient prayers, liturgies, and sacred texts of the Church."
          />
          <div className="grid sm:grid-cols-2 gap-4 max-w-4xl mx-auto -mt-8">
            {geEzResources.map((resource, i) => (
              <ResourceCard key={resource.id} resource={resource} delay={i * 0.05} />
            ))}
          </div>
        </div>
      </section>

      <ScriptureHighlight />
      <CTASection />
    </main>
  );
}
