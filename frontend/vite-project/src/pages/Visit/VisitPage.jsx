import { motion } from 'framer-motion';
import { FiMapPin, FiClock, FiUsers, FiMoon, FiMusic, FiMessageCircle, FiShield, FiHeart } from 'react-icons/fi';
import Container from '../../components/Container';
import Button from '../../components/Button';
import { useChurch } from '../../hooks/useHomeSections';
import { useSeo } from '../../hooks/useSeo';
import { useTranslation } from '../../i18n/LanguageContext';
import { HERO_IMAGE_FALLBACK } from '../../lib/images';

const elements = [
  { icon: FiClock, key: 'duration' },
  { icon: FiMusic, key: 'worship' },
  { icon: FiUsers, key: 'community' },
  { icon: FiMessageCircle, key: 'greeting' },
  { icon: FiMoon, key: 'language' },
  { icon: FiShield, key: 'welcome' },
];

export function VisitHero() {
  const { t } = useTranslation();
  const church = useChurch();

  return (
    <section className="relative min-h-[70vh] md:min-h-screen flex items-center justify-center overflow-hidden" aria-label="Plan Your Visit hero">
      <img src={HERO_IMAGE_FALLBACK} alt="" className="absolute inset-0 w-full h-full object-cover" loading="eager" />
      <div className="absolute inset-0 bg-linear-to-br from-stone-900/90 via-primary-dark/80 to-primary/50" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 w-full">
        <div className="flex flex-col items-start gap-5 max-w-3xl">
          <motion.span
            className="inline-block text-secondary text-xs font-semibold tracking-[0.25em] uppercase"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {church.name || t('common.churchName')}
          </motion.span>

          <motion.h1
            className="text-4xl sm:text-5xl md:text-6xl font-bold text-white leading-[1.1]"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            {t('pages.visit.title')}
          </motion.h1>

          <motion.p
            className="text-lg sm:text-xl text-gray-300/90 max-w-xl leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.6 }}
          >
            {t('pages.visit.subtitle')}
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row items-start gap-4 mt-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            {church.address && (
              <Button href={`https://maps.google.com/?q=${encodeURIComponent(church.address)}`} target="_blank" rel="noopener noreferrer" variant="primary" size="lg">
                <FiMapPin className="text-lg" />
                {t('common.getDirections')}
              </Button>
            )}
            <Button href="/contact" variant="outline" size="lg">
              {t('pages.visit.contactChurch')}
            </Button>
          </motion.div>
        </div>
      </div>

      <div className="absolute bottom-0 inset-x-0 h-32 bg-gradient-to-t from-surface to-transparent" />
    </section>
  );
}

export function WhatToExpect() {
  const { t } = useTranslation();
  return (
    <section className="py-20 md:py-28 bg-white" aria-label={t('pages.visit.whatToExpectTitle')}>
      <Container>
        <div className="max-w-3xl mx-auto text-center mb-16">
          <span className="text-xs font-semibold tracking-[0.2em] uppercase text-secondary">
            {t('pages.visit.whatToExpectEyebrow')}
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-text mt-4 leading-tight">
            {t('pages.visit.whatToExpectTitle')}
          </h2>
          <div className="flex items-center justify-center gap-4 mt-4">
            <span className="h-px w-12 bg-secondary/40" />
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" className="text-secondary" aria-hidden="true">
              <path d="M12 0l3 9h9l-7.5 5.5L18 24l-6-5-6 5 1.5-9.5L0 9h9z" />
            </svg>
            <span className="h-px w-12 bg-secondary/40" />
          </div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {elements.map((element, index) => {
            const Icon = element.icon;
            return (
              <motion.div
                key={element.key}
                className="bg-surface rounded-md p-8 border border-border hover:border-primary/20 transition-colors duration-300"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.5, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
              >
                <div className="w-12 h-12 rounded-xs bg-primary/10 flex items-center justify-center mb-5">
                  <Icon className="text-primary text-xl" />
                </div>
                <h3 className="text-lg font-bold text-text mb-2">
                  {t(`pages.visit.${element.key}Title`)}
                </h3>
                <p className="text-sm text-muted leading-relaxed">
                  {t(`pages.visit.${element.key}Description`)}
                </p>
              </motion.div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}

export function VisitLocation() {
  const { t } = useTranslation();
  const church = useChurch();
  const address = church.address || '';

  if (!address) return null;

  return (
    <section className="py-20 md:py-28 bg-surface" aria-label={t('pages.visit.locationTitle')}>
      <Container>
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div>
            <span className="text-xs font-semibold tracking-[0.2em] uppercase text-secondary">
              {t('pages.visit.locationEyebrow')}
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-text mt-4 leading-tight mb-6">
              {t('pages.visit.locationTitle')}
            </h2>
            <div className="flex items-start gap-4 bg-white rounded-xs p-6 border border-border">
              <FiMapPin className="text-primary text-xl mt-1 flex-shrink-0" />
              <div>
                <p className="text-text font-medium">{address}</p>
                <a
                  href={`https://maps.google.com/?q=${encodeURIComponent(address)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:text-primary-dark transition-colors duration-300 mt-3"
                >
                  <FiMapPin className="text-sm" />
                  {t('common.getDirections')}
                </a>
              </div>
            </div>
            {church.phone && (
              <div className="mt-6">
                <a
                  href={`tel:${church.phone.replace(/\s/g, '')}`}
                  className="inline-flex items-center gap-2 bg-white rounded-xs px-6 py-3 border border-border text-sm font-medium text-text hover:border-primary/30 transition-colors duration-300"
                >
                  <FiUsers className="text-primary" />
                  {church.phone}
                </a>
              </div>
            )}
          </div>
          <div className="relative overflow-hidden rounded-md shadow-lg">
            <iframe
              title={t('pages.visit.mapTitle')}
              src={`https://www.google.com/maps?q=${encodeURIComponent(address)}&output=embed`}
              className="w-full h-[350px] border-0"
              loading="lazy"
            />
          </div>
        </div>
      </Container>
    </section>
  );
}

export function VisitCTA() {
  const { t } = useTranslation();
  const church = useChurch();

  return (
    <section className="py-24 md:py-32 bg-primary relative overflow-hidden" aria-label={t('pages.visit.ctaEyebrow')}>
      <div className="absolute inset-0 bg-gradient-to-br from-primary to-primary-dark opacity-95" />
      <Container className="relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <span className="text-xs font-semibold tracking-[0.2em] uppercase text-secondary-light mb-6 inline-block">
            {t('pages.visit.ctaEyebrow')}
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-tight mb-6">
            {t('pages.visit.ctaTitle')}
          </h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto mb-10">
            {t('pages.visit.ctaDescription')}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button href="/contact" variant="secondary" size="lg">
              <FiHeart className="text-lg" />
              {t('pages.visit.ctaContact')}
            </Button>
            {church.phone && (
              <Button href={`tel:${church.phone.replace(/\s/g, '')}`} variant="outline" size="lg">
                {t('pages.visit.ctaCall')}
              </Button>
            )}
          </div>
        </div>
      </Container>
    </section>
  );
}

export default function VisitPage() {
  const { t } = useTranslation();
  useSeo({
    title: t('pages.visit.title'),
    description: t('pages.visit.subtitle'),
    path: '/visit',
  });

  return (
    <main className="min-h-screen">
      <VisitHero />
      <WhatToExpect />
      <VisitLocation />
      <VisitCTA />
    </main>
  );
}
