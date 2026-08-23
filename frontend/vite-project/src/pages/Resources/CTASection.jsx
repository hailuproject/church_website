import { motion } from 'framer-motion';
import { FiArrowRight } from 'react-icons/fi';
import Container from '../../components/Container';
import Button from '../../components/Button';
import { useTranslation } from '../../i18n/LanguageContext';
import { HERO_IMAGE_FALLBACK } from '../../lib/images';

export default function CTASection() {
  const { t } = useTranslation();
  return (
    <section className="relative py-24 md:py-36 overflow-hidden" aria-label={t('common.callToAction')}>
      <img src={HERO_IMAGE_FALLBACK} alt="" className="absolute inset-0 w-full h-full object-cover" loading="lazy" />
      <div className="absolute inset-0 bg-linear-to-r from-primary/95 via-primary-dark/90 to-primary/80" />

      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-10 right-[15%] w-72 h-72 rounded-full bg-secondary/10 blur-3xl"
          animate={{ y: [0, -18, 0], scale: [1, 1.05, 1] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>

      <Container className="relative z-10">
        <motion.div
          className="flex flex-col items-center text-center gap-8 max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="text-secondary text-xs font-semibold tracking-[0.25em] uppercase">
            {t('pages.resources.ctaEyebrow')}
          </span>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-tight">
            {t('pages.resources.ctaTitle')}
          </h2>

          <p className="text-lg text-gray-300/80 max-w-xl leading-relaxed">
            {t('pages.resources.ctaDescription')}
          </p>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 mt-2 w-full sm:w-auto max-w-sm sm:max-w-none mx-auto sm:mx-0">
            <Button href="#library" variant="secondary" size="lg" className="w-full sm:w-auto justify-center">
              {t('pages.resources.exploreResources')}
              <FiArrowRight className="text-lg" />
            </Button>
            <Button href="/contact" variant="outline" size="lg" className="w-full sm:w-auto justify-center">
              {t('common.contactUs')}
            </Button>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
