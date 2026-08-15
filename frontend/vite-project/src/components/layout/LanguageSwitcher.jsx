import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiGlobe } from 'react-icons/fi';
import { languages } from '../../data/navigation';
import { useLanguage } from '../../i18n/LanguageContext';

export default function LanguageSwitcher() {
  const [isOpen, setIsOpen] = useState(false);
  const { language, setLanguage, t } = useLanguage();
  const ref = useRef(null);

  useEffect(() => {
    function handleClickOutside(e) {
      if (ref.current && !ref.current.contains(e.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1.5 px-3 py-2 text-sm font-medium text-muted hover:text-text rounded-xs hover:bg-black/5 transition-colors duration-200"
        aria-label={t('lang.switchLabel')}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
      >
        <FiGlobe className="text-base" />
        <span className="hidden sm:inline">{languages.find((l) => l.code === language)?.native}</span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="absolute right-0 top-full mt-2 w-40 bg-white rounded-xs shadow-lg border border-border overflow-hidden z-50"
            initial={{ opacity: 0, y: -8, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            role="listbox"
            aria-label={t('lang.selectLabel')}
          >
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => {
                  setLanguage(lang.code);
                  setIsOpen(false);
                }}
                className={`w-full text-left px-4 py-2.5 text-sm flex items-center justify-between transition-colors duration-150 ${
                  language === lang.code
                    ? 'bg-primary/5 text-primary font-medium'
                    : 'text-text hover:bg-surface'
                }`}
                role="option"
                aria-selected={language === lang.code}
              >
                <span>{lang.native}</span>
                {language === lang.code && (
                  <span className="w-1.5 h-1.5 rounded-full bg-secondary" />
                )}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
