import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import ScrollToTop from './components/layout/ScrollToTop';

const AboutPage = lazy(() => import('./pages/About/AboutPage'));

function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-surface">
      <div className="flex flex-col items-center gap-4">
        <div className="w-12 h-12 border-4 border-secondary/30 border-t-secondary rounded-full animate-spin" />
        <p className="text-muted text-sm">Loading...</p>
      </div>
    </div>
  );
}

function HomePage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-surface pt-20">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-text mb-4">
          Ethiopian Orthodox Tewahedo Church
        </h1>
        <p className="text-muted mb-6">Welcome to our church website</p>
        <a
          href="/about"
          className="inline-flex items-center gap-2 bg-primary text-white px-7 py-3 rounded-xs font-medium hover:bg-primary-dark transition-colors duration-300"
        >
          Learn About Us
        </a>
      </div>
    </div>
  );
}

function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-surface pt-20">
      <div className="text-center">
        <h1 className="text-7xl font-bold text-primary mb-4">404</h1>
        <p className="text-muted mb-6">Page not found</p>
        <a
          href="/"
          className="inline-flex items-center gap-2 bg-primary text-white px-7 py-3 rounded-xs font-medium hover:bg-primary-dark transition-colors duration-300"
        >
          Return Home
        </a>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Header />
      <ScrollToTop />
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
      <Footer />
    </BrowserRouter>
  );
}
