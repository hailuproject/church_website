import { lazy, Suspense, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation, Link } from 'react-router-dom';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import AdminEntry from './components/layout/AdminEntry';
import ScrollToTopButton from './components/layout/ScrollToTop';
import { useLanguage } from './i18n/LanguageContext';

const AdminApp = lazy(() => import('./admin/AdminApp'));

const AboutPage = lazy(() => import('./pages/About/AboutPage'));
const SermonsPage = lazy(() => import('./pages/Sermons/SermonsPage'));
const EventsPage = lazy(() => import('./pages/Events/EventsPage'));
const ResourcesPage = lazy(() => import('./pages/Resources/ResourcesPage'));
const GalleryPage = lazy(() => import('./pages/Gallery/GalleryPage'));
const ContactPage = lazy(() => import('./pages/Contact/ContactPage'));
const DonatePage = lazy(() => import('./pages/Donate/DonatePage'));
const HomePage = lazy(() => import('./pages/Home/HomePage'));
const VisitPage = lazy(() => import('./pages/Visit/VisitPage'));

function Loading() {
  const { language } = useLanguage();
  return (
    <div className="min-h-screen flex items-center justify-center bg-surface" role="status" aria-live="polite">
      <div className="flex flex-col items-center gap-4">
        <div className="w-12 h-12 border-4 border-secondary/30 border-t-secondary rounded-full animate-spin" aria-hidden="true" />
        <p className="text-muted text-sm">
          {language === 'am' ? 'በመጫን ላይ...' : language === 'ti' ? 'ይጽዕን ኣሎ...' : 'Loading...'}
        </p>
      </div>
    </div>
  );
}

function NotFound() {
  const { language } = useLanguage();
  const notFoundText =
    language === 'am' ? 'ገጹ አልተገኘም' : language === 'ti' ? 'እቲ ገጽ ኣይተረኽበን' : 'Page not found';
  const returnHomeText =
    language === 'am' ? 'ወደ መነሻ ተመለስ' : language === 'ti' ? 'ናብ መእተዊ ተመለስ' : 'Return Home';
  return (
    <div className="min-h-screen flex items-center justify-center bg-surface pt-20">
      <div className="text-center">
        <h1 className="text-7xl font-bold text-primary mb-4">404</h1>
        <p className="text-muted mb-6">{notFoundText}</p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 bg-primary text-white px-7 py-3 rounded-xs font-medium hover:bg-primary-dark transition-colors duration-300"
        >
          {returnHomeText}
        </Link>
      </div>
    </div>
  );
}

function SkipToContent() {
  const { language } = useLanguage();
  return (
    <a href="#main-content" className="skip-to-content">
      {language === 'am' ? 'ወደ ይዘት ዘልለው ይግቡ' : language === 'ti' ? 'ናብ ዕላማ ሓልፍ' : 'Skip to content'}
    </a>
  );
}

function ScrollToTopOnRouteChange() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (hash) {
      const el = document.getElementById(hash.slice(1));
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        return;
      }
    }
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [pathname, hash]);
  return null;
}

function PublicSite() {
  return (
    <>
      <SkipToContent />
      <AdminEntry />
      <Header />
      <ScrollToTopOnRouteChange />
      <ScrollToTopButton />
      <Suspense fallback={<Loading />}>
        <main id="main-content">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/visit" element={<VisitPage />} />
            <Route path="/sermons" element={<SermonsPage />} />
            <Route path="/events" element={<EventsPage />} />
            <Route path="/resources" element={<ResourcesPage />} />
            <Route path="/gallery" element={<GalleryPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/donate" element={<DonatePage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
      </Suspense>
      <Footer />
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/admin/*"
          element={
            <Suspense fallback={<Loading />}>
              <AdminApp />
            </Suspense>
          }
        />
        <Route path="/*" element={<PublicSite />} />
      </Routes>
    </BrowserRouter>
  );
}
