import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiArrowUp } from 'react-icons/fi';
import { useLanguage } from '../../i18n/LanguageContext';

export default function ScrollToTop() {
  const [visible, setVisible] = useState(false);
  const { language } = useLanguage();

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 z-50 w-11 h-11 rounded-xs bg-primary text-white shadow-lg hover:bg-primary-dark flex items-center justify-center transition-colors duration-300"
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 20 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          aria-label={language === 'am' ? 'ወደ ላይ ይውጡ' : 'Scroll to top'}
        >
          <FiArrowUp className="text-lg" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
