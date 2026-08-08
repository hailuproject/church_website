import HeroSlider from '../../components/home/HeroSlider';
import FeaturedEvents from '../../components/home/FeaturedEvents';
import FeaturedSermons from '../../components/home/FeaturedSermons';
import GalleryPreview from '../../components/home/GalleryPreview';
import ChurchInformation from '../../components/home/ChurchInformation';
import CTASection from '../../components/home/CTASection';
import { useHomeFlags } from '../../hooks/useHomeSections';
import { useSeo } from '../../hooks/useSeo';

export default function HomePage() {
  const { showUpcomingEvents, showLatestSermons, showGalleryPreview } = useHomeFlags();
  useSeo({
    title: 'Home',
    description:
      'Holy Trinity – Gebre Christos Ethiopian Orthodox Tewahedo Church in Inglewood, CA. Join us for worship and fellowship.',
  });
  return (
    <main className="min-h-screen">
      <HeroSlider />
      {showUpcomingEvents && <FeaturedEvents />}
      {showLatestSermons && <FeaturedSermons />}
      {showGalleryPreview && <GalleryPreview />}
      <ChurchInformation />
      <CTASection />
    </main>
  );
}
