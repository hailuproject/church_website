import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FiClock, FiMapPin, FiInfo, FiArrowRight } from 'react-icons/fi';
import { useHeroData, useServiceTimes, useChurch } from '../../hooks/useHomeSections';
import Button from '../Button';
import { useLanguage } from '../../i18n/LanguageContext';
import { HERO_IMAGE, HERO_IMAGE_FALLBACK } from '../../lib/images';

function InfoTile({ icon: Icon, title, to, href, children }) {
  const inner = (
    <>
      <Icon className="text-2xl text-secondary shrink-0 mt-0.5" aria-hidden="true" />
      <div className="min-w-0 text-left">
        <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-white/70">
          {title}
        </p>
        <div className="text-sm text-white mt-1 leading-snug">{children}</div>
      </div>
    </>
  );
  const classes =
    'flex items-start gap-4 p-4 rounded-xs border border-white/15 bg-white/10 backdrop-blur-md shadow-lg transition-colors duration-300';
  if (to) {
    return (
      <Link to={to} className={`${classes} hover:bg-white/20 group`}>
        {inner}
      </Link>
    );
  }
  if (href) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={`${classes} hover:bg-white/20 group`}
      >
        {inner}
      </a>
    );
  }
  return <div className={classes}>{inner}</div>;
}

export default function HeroSlider() {
  const { t, language } = useLanguage();
  const hero = useHeroData();
  const serviceTimes = useServiceTimes();
  const church = useChurch();

  if (!hero) return null;
  const heading =
    language === 'am' ? hero.headingAm || hero.heading : language === 'ti' ? hero.headingTi || hero.headingAm || hero.heading : hero.heading;
  const mapsLink = church.address
    ? `https://maps.google.com/?q=${encodeURIComponent(church.address)}`
    : '';

  return (
    <section className="relative w-full min-h-screen pt-20 md:pt-24 pb-16 flex items-center justify-center" aria-label="Hero">
      <picture className="absolute inset-0 w-full h-full">
        <source srcSet={hero.image || HERO_IMAGE} type="image/webp" />
        <img
          src={hero.image || HERO_IMAGE_FALLBACK}
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
          loading="eager"
        />
      </picture>
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/45 to-black/80" />

      <div className="relative z-10 max-w-5xl mx-auto px-6 w-full">
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="inline-block text-secondary text-sm font-semibold tracking-[0.2em] uppercase mb-6">
            {t('common.churchName')}
          </span>
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-6">
            {heading}
          </h1>
          <p className="text-lg sm:text-xl text-gray-300 max-w-2xl mx-auto mb-8 leading-relaxed">
            {hero.tagline}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            {hero.primaryCta?.label && (
              <Button href={hero.primaryCta.href || '/visit'} variant="primary" size="lg">
                {hero.primaryCta.label}
              </Button>
            )}
            {hero.secondaryCta?.label && (
              <Button href={hero.secondaryCta.href || '/contact'} variant="outline" size="lg">
                {hero.secondaryCta.label}
              </Button>
            )}
          </div>
        </motion.div>

        {/* Service information strip */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-12"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
        >
          <InfoTile
            icon={FiClock}
            title={t('pages.home.serviceTimes')}
            to={serviceTimes.length ? undefined : '/contact'}
            href={undefined}
          >
            {serviceTimes.length ? (
              serviceTimes.slice(0, 3).map((s) => (
                <span key={`${s.day}-${s.time}`} className="flex items-center justify-between gap-3">
                  <span className="text-white/85">{s.day}</span>
                  <span className="font-medium">{s.time}</span>
                </span>
              ))
            ) : (
              <span className="flex items-center gap-1.5 text-secondary group-hover:translate-x-1 transition-transform duration-200">
                {t('common.viewSchedule')}
                <FiArrowRight aria-hidden="true" />
              </span>
            )}
          </InfoTile>

          <InfoTile
            icon={FiMapPin}
            title={t('pages.about.ourLocation')}
            to={church.address ? undefined : '/visit'}
            href={mapsLink || undefined}
          >
            {church.address ? (
              church.address
            ) : (
              <span className="flex items-center gap-1.5 text-secondary group-hover:translate-x-1 transition-transform duration-200">
                {t('common.getDirections')}
                <FiArrowRight aria-hidden="true" />
              </span>
            )}
          </InfoTile>

          <InfoTile icon={FiInfo} title={t('common.planYourVisit')} to="/visit">
            {t('pages.home.planVisitHint')}
          </InfoTile>
        </motion.div>
      </div>
    </section>
  );
}