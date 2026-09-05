import { motion } from 'framer-motion';
import Container from '../Container';
import Button from '../Button';
import { useHomeContent } from '../../hooks/useHomeSections';
import { useLocale } from '../../lib/localize';
import { useTranslation } from '../../i18n/LanguageContext';

const ease = [0.22, 1, 0.36, 1];

export default function WelcomeIntro() {
  const { t } = useTranslation();
  const { pick } = useLocale();
  const home = useHomeContent();
  const intro = home?.intro || {};
  const title = pick(intro, 'title') || t('pages.home.subtitle');
  const content = pick(intro, 'content') || t('pages.home.description');

  return (
    <section id="intro" className="py-20 md:py-28 bg-white">
      <Container>
        <motion.div
          className="max-w-3xl mx-auto text-center flex flex-col items-center gap-6"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.8, ease }}
        >
          <span className="text-secondary text-xs font-semibold tracking-[0.25em] uppercase">
            {t('pages.home.subtitle')}
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-text leading-tight text-balance">
            {title}
          </h2>
          <p className="text-lg text-muted leading-[1.8] max-w-2xl">{content}</p>
          <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 mt-2">
            <Button href="/visit" variant="primary" size="md">
              {t('common.planYourVisit')}
            </Button>
            <Button href="/about" variant="outline-dark" size="md">
              {t('common.learnMore')}
            </Button>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}