import { motion } from 'framer-motion';
import { FiArrowRight, FiPhone } from 'react-icons/fi';
import Container from '../../components/Container';
import Section from '../../components/Section';
import Button from '../../components/Button';
import { useTranslation } from '../../i18n/LanguageContext';

export default function ShareSection() {
  const { t } = useTranslation();
  return (
    <Section id="share" className="bg-white">
      <Container>
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <motion.div
            className="relative overflow-hidden rounded-xs shadow-lg group order-2 lg:order-1"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="w-full aspect-[4/3] bg-linear-to-br from-primary to-primary-dark" />
          </motion.div>

          <motion.div
            className="flex flex-col gap-6 order-1 lg:order-2"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <div>
              <span className="text-xs font-semibold tracking-[0.2em] uppercase text-secondary">
                {t('pages.gallery.contribute')}
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold text-text mt-4 leading-tight">
                {t('pages.gallery.shareTitle')}
              </h2>
            </div>

            <p className="text-muted text-base leading-[1.8]">
              {t('pages.gallery.shareDescription')}
            </p>

            <div className="bg-surface rounded-xs p-6 border border-border">
              <h3 className="text-sm font-bold text-text uppercase tracking-wider mb-3">
                {t('pages.gallery.whatToShare')}
              </h3>
              <ul className="flex flex-col gap-2 text-sm text-muted">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-secondary flex-shrink-0" />
                  {t('pages.gallery.shareItem1')}
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-secondary flex-shrink-0" />
                  {t('pages.gallery.shareItem2')}
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-secondary flex-shrink-0" />
                  {t('pages.gallery.shareItem3')}
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-secondary flex-shrink-0" />
                  {t('pages.gallery.shareItem4')}
                </li>
              </ul>
            </div>

            <div className="flex flex-col sm:flex-row items-start gap-4 mt-2">
              <Button href="/contact" variant="primary" size="md">
                {t('pages.gallery.submitPhotos')}
                <FiArrowRight className="text-lg" />
              </Button>
              <Button href="/contact" variant="outline-dark" size="md">
                <FiPhone className="text-lg" />
                {t('pages.gallery.contactChurch')}
              </Button>
            </div>
          </motion.div>
        </div>
      </Container>
    </Section>
  );
}
