import { motion } from 'framer-motion';
import { FiCalendar, FiClock, FiMapPin, FiArrowRight, FiCheckCircle } from 'react-icons/fi';
import Container from '../../components/Container';
import Section from '../../components/Section';
import Button from '../../components/Button';
import { useFeaturedEvent } from '../../hooks/useEventsSections';
import { useTranslation } from '../../i18n/LanguageContext';

export default function FeaturedEvent() {
  const { t } = useTranslation();
  const featuredEvent = useFeaturedEvent();
  if (!featuredEvent) return null;
  return (
    <Section id="featured" className="bg-surface">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mb-16"
        >
          <span className="text-xs font-semibold tracking-[0.2em] uppercase text-secondary">
            {t('pages.events.featuredEvent')}
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-text mt-4 leading-tight">
            {featuredEvent.title}
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <motion.div
            className="relative overflow-hidden rounded-xs shadow-lg group"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <img
              src={featuredEvent.image}
              alt={featuredEvent.imageAlt}
              className="w-full aspect-[4/3] object-cover group-hover:scale-105 transition-transform duration-700"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />

            <motion.div
              className="absolute top-4 right-4 bg-primary text-white rounded-xs px-5 py-3 shadow-lg"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <span className="text-xs font-semibold tracking-wider uppercase block">
                {t('pages.events.countdown')}
              </span>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-2xl font-bold">{featuredEvent.countdown.days}</span>
                <span className="text-xs text-gray-300">{t('pages.events.days')}</span>
                <span className="text-lg font-semibold mx-1">:</span>
                <span className="text-lg font-semibold">{featuredEvent.countdown.hours}</span>
                <span className="text-xs text-gray-300">{t('pages.events.hours')}</span>
                <span className="text-lg font-semibold mx-1">:</span>
                <span className="text-lg font-semibold">{featuredEvent.countdown.minutes}</span>
                <span className="text-xs text-gray-300">{t('pages.events.minutes')}</span>
              </div>
            </motion.div>
          </motion.div>

          <motion.div
            className="flex flex-col gap-6"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center gap-2 text-sm text-muted">
                <FiCalendar className="text-secondary" />
                <span>{featuredEvent.date}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted">
                <FiClock className="text-secondary" />
                <span>{featuredEvent.time}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted">
                <FiMapPin className="text-secondary" />
                <span>{featuredEvent.location}</span>
              </div>
            </div>

            <p className="text-muted text-base leading-[1.8]">
              {featuredEvent.description}
            </p>

            <div className="flex flex-col sm:flex-row items-start gap-4 mt-2">
              <Button href="/contact" variant="primary" size="md">
                <FiCheckCircle className="text-lg" />
                {t('pages.events.registerNow')}
              </Button>
              <Button href="#calendar" variant="outline-dark" size="md">
                {t('pages.events.viewDetails')}
                <FiArrowRight className="text-lg" />
              </Button>
            </div>
          </motion.div>
        </div>
      </Container>
    </Section>
  );
}
