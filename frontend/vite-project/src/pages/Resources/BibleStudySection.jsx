import { motion } from 'framer-motion';
import { FiArrowRight, FiBookOpen, FiHelpCircle, FiBookmark, FiCalendar } from 'react-icons/fi';
import Container from '../../components/Container';
import Section from '../../components/Section';
import Button from '../../components/Button';
import { bibleStudyFeatures } from '../../data/resourcesData';
import { useLanguage } from '../../i18n/LanguageContext';
import { pickAm } from '../../lib/localize';

const featureIcons = {
  weekly: FiBookOpen,
  discussion: FiHelpCircle,
  memory: FiBookmark,
  reading: FiCalendar,
};

export default function BibleStudySection() {
  const { t, language } = useLanguage();
  return (
    <Section id="bible-study" className="bg-white">
      <Container>
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-20 items-center">
          <motion.div
            className="relative overflow-hidden rounded-xs shadow-lg group"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="w-full aspect-[4/3] bg-linear-to-br from-primary to-primary-dark" />
          </motion.div>

          <motion.div
            className="flex flex-col gap-6"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <div>
              <span className="text-xs font-semibold tracking-[0.2em] uppercase text-secondary">
                {t('pages.resources.bibleStudyEyebrow')}
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold text-text mt-4 leading-tight">
                {t('pages.resources.bibleStudyTitle')}
              </h2>
            </div>

            <p className="text-muted text-base leading-[1.8]">
              {t('pages.resources.bibleStudyDescription')}
            </p>

            <div className="grid sm:grid-cols-2 gap-4 mt-2">
              {bibleStudyFeatures.length > 0 &&
                bibleStudyFeatures.map((feature, i) => {
                const FeatureIcon = featureIcons[feature.icon] || FiBookOpen;
                return (
                  <motion.div
                    key={feature.title}
                    className="bg-surface rounded-xs p-4 sm:p-5 border border-border"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: i * 0.1 }}
                  >
                    <FeatureIcon className="w-5 h-5 text-primary mb-3" />
                    <h4 className="text-sm font-bold text-text mb-1">{pickAm(feature, 'title', language)}</h4>
                    <p className="text-xs text-muted leading-relaxed">{pickAm(feature, 'description', language)}</p>
                  </motion.div>
                );
              })}
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-start gap-3 sm:gap-4 mt-4">
              <Button href="#library" variant="primary" size="md" className="w-full sm:w-auto justify-center">
                {t('pages.resources.startReading')}
                <FiArrowRight className="text-lg" />
              </Button>
              <Button href="#library" variant="outline-dark" size="md" className="w-full sm:w-auto justify-center">
                {t('pages.resources.viewAllStudies')}
              </Button>
            </div>
          </motion.div>
        </div>
      </Container>
    </Section>
  );
}
