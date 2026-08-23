import { motion } from 'framer-motion';
import { FiChevronDown } from 'react-icons/fi';
import Button from '../Button';
import { useChurch } from '../../hooks/useHomeSections';
import { HERO_IMAGE, HERO_IMAGE_FALLBACK } from '../../lib/images';

const DEFAULT_IMAGE = HERO_IMAGE;
const FALLBACK_IMAGE = HERO_IMAGE_FALLBACK;

const ease = [0.22, 1, 0.36, 1];

const CrossOrnament = ({ className = '' }) => (
  <svg viewBox="0 0 48 48" className={className} fill="currentColor" aria-hidden="true">
    <path d="M20 4h8v16h16v8H28v16h-8V28H4v-8h16z" />
  </svg>
);

const TEXTURE = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 48 48' fill='%23ffffff'%3E%3Cpath d='M20 4h8v16h16v8H28v16h-8V28H4v-8h16z'/%3E%3C/svg%3E")`;

const PageHero = ({
  eyebrow,
  title,
  subtitle,
  breadcrumb = [],
  ctas = [],
  image,
  align = 'left',
  size = 'page',
  scrollHint = false,
  children,
}) => {
  const church = useChurch();
  const label = eyebrow || church.name || 'Ethiopian Orthodox Tewahedo Church';
  const centered = align === 'center';

  return (
    <section
      className={`relative flex items-center overflow-hidden ${
        size === 'full' ? 'min-h-[92vh] md:min-h-screen' : 'min-h-[62vh] md:min-h-[68vh]'
      }`}
      aria-label="Page hero"
    >
      {/* Background image */}
      <picture className="absolute inset-0">
        {!image && <source srcSet={DEFAULT_IMAGE} type="image/webp" />}
        <img
          src={image || FALLBACK_IMAGE}
          alt=""
          className="h-full w-full object-cover"
          loading="eager"
        />
      </picture>

      {/* Brand-tinted overlays */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#1a0606]/90 via-primary-dark/60 to-primary/45" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/25 to-black/45" />
      <div
        className="absolute inset-0 opacity-[0.05]"
        style={{ backgroundImage: TEXTURE, backgroundSize: '48px 48px' }}
        aria-hidden="true"
      />

      {/* Decorative glows */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute -top-1/4 left-[10%] h-80 w-80 rounded-full bg-secondary/10 blur-3xl"
          animate={{ y: [0, -25, 0], x: [0, 12, 0] }}
          transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute bottom-1/4 right-[8%] h-64 w-64 rounded-full bg-primary-light/10 blur-3xl"
          animate={{ y: [0, 18, 0], x: [0, -10, 0] }}
          transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 pt-24 pb-20 lg:px-8">
        {breadcrumb.length > 0 && !centered && (
          <motion.nav
            aria-label="Breadcrumb"
            className="mb-8"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <ol className="flex flex-wrap items-center gap-2 text-sm text-white/60">
              {breadcrumb.map((crumb, i) => (
                <li key={crumb.href || crumb.label} className="flex items-center gap-2">
                  {i > 0 && <span aria-hidden="true" className="text-white/30">/</span>}
                  <a href={crumb.href} className="transition-colors duration-300 hover:text-secondary">
                    {crumb.label}
                  </a>
                </li>
              ))}
            </ol>
          </motion.nav>
        )}

        <div
          className={`flex max-w-3xl flex-col gap-5 ${
            centered ? 'mx-auto items-center text-center' : 'items-start text-left'
          }`}
        >
          <motion.span
            className="inline-flex items-center gap-3 text-secondary text-xs font-semibold tracking-[0.25em] uppercase"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <CrossOrnament className="h-4 w-4 shrink-0" />
            {label}
            <CrossOrnament className="h-4 w-4 shrink-0 rotate-90" />
          </motion.span>

          <motion.h1
            className="text-4xl font-bold leading-[1.08] text-white sm:text-5xl md:text-6xl lg:text-7xl"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.35, ease }}
          >
            {title}
          </motion.h1>

          {subtitle && (
            <motion.p
              className="max-w-xl text-lg leading-relaxed text-gray-200/90 sm:text-xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.55 }}
            >
              {subtitle}
            </motion.p>
          )}

          {ctas.length > 0 && (
            <motion.div
              className={`mt-2 flex flex-col gap-4 sm:flex-row ${
                centered ? 'sm:items-center sm:justify-center' : 'sm:items-start'
              }`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.75 }}
            >
              {ctas.map((cta, i) => (
                <Button
                  key={cta.href || cta.label || i}
                  href={cta.href}
                  variant={cta.variant || (i === 0 ? 'primary' : 'outline')}
                  size="lg"
                >
                  {cta.icon}
                  {cta.label}
                </Button>
              ))}
            </motion.div>
          )}

          {children}
        </div>
      </div>

      {/* Scroll hint */}
      {scrollHint && (
        <motion.a
          href="#content"
          aria-label="Scroll to content"
          className="absolute bottom-6 left-1/2 z-10 -translate-x-1/2 text-white/70 transition-colors duration-300 hover:text-white"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, y: [0, 8, 0] }}
          transition={{ opacity: { delay: 1.2, duration: 0.6 }, y: { duration: 2, repeat: Infinity, ease: 'easeInOut' } }}
        >
          <FiChevronDown className="h-8 w-8" />
        </motion.a>
      )}

      {/* Bottom fade */}
      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-surface to-transparent" />
    </section>
  );
};

export default PageHero;
