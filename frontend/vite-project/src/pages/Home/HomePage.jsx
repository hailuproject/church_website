import HeroSlider from './HeroSlider';
import WelcomeSection from './WelcomeSection';
import Highlights from './Highlights';
import EventsPreview from './EventsPreview';
import ScriptureSection from './ScriptureSection';
import SermonsPreview from './SermonsPreview';
import SacramentsOverview from './SacramentsOverview';
import Ministries from './Ministries';
import GalleryPreview from './GalleryPreview';
import Testimonials from './Testimonials';
import Statistics from './Statistics';
import Announcements from './Announcements';
import ServiceSchedule from './ServiceSchedule';
import FAQSection from './FAQSection';
import NewsletterSection from './NewsletterSection';
import CTASection from './CTASection';

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <HeroSlider />
      <WelcomeSection />
      <Highlights />
      <EventsPreview />
      <ScriptureSection />
      <SermonsPreview />
      <SacramentsOverview />
      <Ministries />
      <GalleryPreview />
      <Testimonials />
      <Statistics />
      <Announcements />
      <ServiceSchedule />
      <FAQSection />
      <NewsletterSection />
      <CTASection />
    </main>
  );
}
