import { motion, AnimatePresence } from 'framer-motion';
import { FiX, FiLock } from 'react-icons/fi';
import Logo from './Logo';
import NavLinks from './NavLinks';
import LanguageSwitcher from './LanguageSwitcher';
import Button from '../Button';
import { socialLinks } from '../../data/navigation';

const overlay = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

const drawer = {
  hidden: { x: '100%' },
  visible: { x: 0, transition: { type: 'spring', damping: 30, stiffness: 300 } },
  exit: { x: '100%', transition: { duration: 0.25, ease: 'easeIn' } },
};

export default function MobileMenu({ isOpen, onClose }) {
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
            className="fixed top-0 right-0 bottom-0 w-full max-w-sm bg-white shadow-2xl z-50 flex flex-col"
            variants={drawer}
            initial="hidden"
            animate="visible"
            exit="exit"
            role="dialog"
            aria-modal="true"
            aria-label="Mobile navigation"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-border">
              <Logo collapsed />
              <button
                onClick={onClose}
                className="w-9 h-9 flex items-center justify-center rounded-xs hover:bg-surface text-muted hover:text-text transition-colors duration-200"
                aria-label="Close menu"
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

              <div className="mb-4">
                <Button href="/admin/login" variant="outline-dark" size="sm" className="w-full" ariaLabel="Admin Login">
                  <FiLock className="text-sm" />
                  Admin Login
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
