import { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX, FiHeart, FiMapPin } from 'react-icons/fi';
import Logo from './Logo';
import NavLinks from './NavLinks';
import LanguageSwitcher from './LanguageSwitcher';
import Button from '../Button';
import { socialLinks } from '../../data/navigation';
import { useTranslation } from '../../i18n/LanguageContext';

const overlay = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

const drawer = {
  hidden: { x: '100%' },
  visible: { x: 0, transition: { type: 'spring', damping: 30, stiffness: 300 } },
  exit: { x: '100%', transition: { duration: 0.25, ease: 'easeIn' } },
};

const FOCUSABLE_SELECTOR =
  'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

export default function MobileMenu({ isOpen, onClose }) {
  const { t } = useTranslation();
  const drawerRef = useRef(null);
  const closeBtnRef = useRef(null);

  useEffect(() => {
    if (!isOpen) return;
    const previouslyFocused = document.activeElement;
    closeBtnRef.current?.focus();

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
        return;
      }
      if (e.key !== 'Tab' || !drawerRef.current) return;
      const focusables = drawerRef.current.querySelectorAll(FOCUSABLE_SELECTOR);
      if (!focusables.length) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      if (previouslyFocused && typeof previouslyFocused.focus === 'function') {
        previouslyFocused.focus();
      }
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
            variants={overlay}
            initial="hidden"
            animate="visible"
            exit="hidden"
            onClick={onClose}
            aria-hidden="true"
          />

          {/* Drawer */}
          <motion.div
            id="mobile-menu"
            ref={drawerRef}
            className="fixed top-0 right-0 bottom-0 w-full max-w-sm bg-white shadow-2xl z-50 flex flex-col"
            variants={drawer}
            initial="hidden"
            animate="visible"
            exit="exit"
            role="dialog"
            aria-modal="true"
            aria-label={t('nav.mobileNav')}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-border">
              <Logo collapsed />
              <button
                ref={closeBtnRef}
                onClick={onClose}
                className="w-9 h-9 flex items-center justify-center rounded-xs hover:bg-surface text-muted hover:text-text transition-colors duration-200"
                aria-label={t('common.close')}
              >
                <FiX className="text-xl" />
              </button>
            </div>

            {/* Navigation */}
            <div className="flex-1 overflow-y-auto px-4 py-6">
              <NavLinks vertical onNavigate={onClose} />
            </div>

            {/* Footer */}
            <div className="px-6 py-4 border-t border-border">
              <div className="flex items-center justify-between mb-4">
                <LanguageSwitcher />
              </div>

              <div className="grid grid-cols-1 gap-3 mb-4">
                <Button href="/visit" variant="primary" size="md" className="w-full">
                  <FiMapPin className="text-base" />
                  {t('common.planYourVisit')}
                </Button>
                <Button href="/donate" variant="secondary" size="md" className="w-full">
                  <FiHeart className="text-base" />
                  {t('nav.give')}
                </Button>
              </div>

              {/* Social */}
              <div className="flex items-center gap-3">
                {socialLinks.map((link) => {
                  const Icon = link.icon;
                  return (
                    <a
                      key={link.label}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-9 h-9 flex items-center justify-center rounded-xs bg-surface hover:bg-primary/10 text-muted hover:text-primary transition-colors duration-200"
                      aria-label={link.label}
                    >
                      <Icon className="text-base" />
                    </a>
                  );
                })}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}