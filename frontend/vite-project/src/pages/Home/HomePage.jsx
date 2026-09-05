import HeroSlider from '../../components/home/HeroSlider';
import WelcomeIntro from '../../components/home/WelcomeIntro';
import FeaturedEvents from '../../components/home/FeaturedEvents';
import FeaturedSermons from '../../components/home/FeaturedSermons';
import GalleryPreview from '../../components/home/GalleryPreview';
import PrayerRequestSection from '../../components/home/PrayerRequestSection';
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
      <WelcomeIntro />
      {showLatestSermons && <FeaturedSermons />}
      {showUpcomingEvents && <FeaturedEvents />}
      {showGalleryPreview && <GalleryPreview />}
      <PrayerRequestSection />
      <ChurchInformation />
      <CTASection />
    </main>
  );
}
