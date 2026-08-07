import HeroSlider from '../../components/home/HeroSlider';
import AnnouncementsBanner from '../../components/home/AnnouncementsBanner';
import WelcomeSection from '../../components/home/WelcomeSection';
import ChurchStats from '../../components/home/ChurchStats';
import FeaturedEvents from '../../components/home/FeaturedEvents';
import ScriptureSection from '../../components/home/ScriptureSection';
import FeaturedSermons from '../../components/home/FeaturedSermons';
import LiveStreamSection from '../../components/home/LiveStreamSection';
import SacramentsOverview from '../../components/home/SacramentsOverview';
import Ministries from '../../components/home/Ministries';
import GalleryPreview from '../../components/home/GalleryPreview';
import Testimonials from '../../components/home/Testimonials';
import ServiceSchedule from '../../components/home/ServiceSchedule';
import FAQSection from '../../components/home/FAQSection';
import CTASection from '../../components/home/CTASection';
import { useHomeFlags } from '../../hooks/useHomeSections';

export default function HomePage() {
  const { showAnnouncements, showUpcomingEvents, showRecentSermons } = useHomeFlags();
  return (
    <main className="min-h-screen">
      {showAnnouncements && <AnnouncementsBanner />}
      <HeroSlider />
      <WelcomeSection />
      <ChurchStats />
      {showUpcomingEvents && <FeaturedEvents />}
      <ScriptureSection />
      {showRecentSermons && <FeaturedSermons />}
      <LiveStreamSection />
      <SacramentsOverview />
      <Ministries />
      <GalleryPreview />
      <Testimonials />
      <ServiceSchedule />
      <FAQSection />
      <CTASection />
    </main>
  );
}
