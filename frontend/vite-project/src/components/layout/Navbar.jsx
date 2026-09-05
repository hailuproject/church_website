import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiMenu, FiHeart } from 'react-icons/fi';
import Logo from './Logo';
import NavLinks from './NavLinks';
import LanguageSwitcher from './LanguageSwitcher';
import MobileMenu from './MobileMenu';
import Button from '../Button';
import { useTranslation } from '../../i18n/LanguageContext';

export default function Navbar() {
  const { t } = useTranslation();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  return (
    <>
      <motion.header
        className={`fixed top-0 inset-x-0 z-30 transition-all duration-300 ${
          scrolled
            ? 'bg-white/80 backdrop-blur-xl shadow-sm border-b border-border/50'
            : 'bg-white/40 backdrop-blur-sm'
        }`}
        initial={{ y: -64 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14 md:h-16">
            {/* Left - Logo */}
            <Logo />

            {/* Center - Desktop nav */}
            <div className="hidden lg:flex items-center">
              <NavLinks />
            </div>

            {/* Right - Desktop actions */}
            <div className="hidden lg:flex items-center gap-2">
              <LanguageSwitcher />
              <Button href="/donate" variant="secondary" size="sm">
                <FiHeart className="text-sm" />
                {t('nav.give')}
              </Button>
            </div>

            {/* Mobile - Hamburger */}
            <button
              className="lg:hidden w-9 h-9 flex items-center justify-center rounded-xs hover:bg-black/5 text-text transition-colors duration-200"
              onClick={() => setMobileOpen(true)}
              aria-label={t('nav.openMenu')}
              aria-expanded={mobileOpen}
              aria-controls="mobile-menu"
              aria-haspopup="dialog"
            >
              <FiMenu className="text-lg" />
            </button>
          </div>
        </div>
      </motion.header>

      <MobileMenu isOpen={mobileOpen} onClose={() => setMobileOpen(false)} />
    </>
  );
}
