import { motion } from 'framer-motion';
import Container from './Container';
import Button from './Button';
import { useTranslation } from '../i18n/LanguageContext';
import { HERO_IMAGE_FALLBACK } from '../lib/images';

const backgrounds = {
  maroon: 'bg-linear-to-r from-primary/95 via-primary-dark/90 to-primary/80',
  dark: 'bg-linear-to-br from-stone-900/95 via-primary-dark/90 to-stone-900/90',
};

export default function CTASection({
  eyebrow,
  title,
  description,
  ctas = [],
  image = HERO_IMAGE_FALLBACK,
  background = 'maroon',
  ariaLabel,
  className = '',
  children,
}) {
  const { t } = useTranslation();
  const label = ariaLabel || t('common.callToAction');
  return (
    <section className={`relative py-24 md:py-36 overflow-hidden ${className}`} aria-label={label}>
      <img src={image} alt="" className="absolute inset-0 w-full h-full object-cover" loading="lazy" decoding="async" />
      <div className={`absolute inset-0 ${backgrounds[background] || backgrounds.maroon}`} />

      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-10 right-[15%] w-72 h-72 rounded-full bg-secondary/10 blur-3xl"
          animate={{ y: [0, -18, 0], scale: [1, 1.05, 1] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>

      <Container className="relative z-10">
        <motion.div
          className="flex flex-col items-center text-center gap-7 max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          {eyebrow && (
            <span className="text-secondary text-xs font-semibold tracking-[0.25em] uppercase">
              {eyebrow}
            </span>
          )}

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-tight text-balance">
            {title}
          </h2>

          {description && (
            <p className="text-lg text-gray-300/80 max-w-xl leading-relaxed">
              {description}
            </p>
          )}

          {ctas.length > 0 && (
            <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 mt-1">
              {ctas.map((cta, i) => (
                <Button
                  key={cta.href || cta.label || i}
                  href={cta.href}
                  variant={cta.variant || 'secondary'}
                  size="lg"
                  className={cta.className}
                >
                  {cta.icon}
                  {cta.label}
                </Button>
              ))}
            </div>
          )}

          {children}
        </motion.div>
      </Container>
    </section>
  );
}