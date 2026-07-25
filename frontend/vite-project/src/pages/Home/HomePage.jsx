import HeroSlider from '../../components/home/HeroSlider';
import WelcomeSection from '../../components/home/WelcomeSection';
import ChurchStats from '../../components/home/ChurchStats';
import FeaturedEvents from '../../components/home/FeaturedEvents';
import ScriptureSection from '../../components/home/ScriptureSection';
import FeaturedSermons from '../../components/home/FeaturedSermons';
import SacramentsOverview from '../../components/home/SacramentsOverview';
import Ministries from '../../components/home/Ministries';
import GalleryPreview from '../../components/home/GalleryPreview';
import Testimonials from '../../components/home/Testimonials';
import ServiceSchedule from '../../components/home/ServiceSchedule';
import FAQSection from '../../components/home/FAQSection';
import CTASection from '../../components/home/CTASection';

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <HeroSlider />
      <WelcomeSection />
      <ChurchStats />
      <FeaturedEvents />
      <ScriptureSection />
      <FeaturedSermons />
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
