import Container from '../Container';
import AnimatedSection from '../AnimatedSection';
import Button from '../Button';
import { useTranslation } from '../../i18n/LanguageContext';

export default function CTASection() {
  const { t } = useTranslation();
  return (
    <section className="relative py-24 md:py-32 overflow-hidden" aria-label={t('common.callToAction')}>
      <div className="absolute inset-0 bg-linear-to-r from-primary to-primary-dark" />

      <Container className="relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <AnimatedSection>
            <span className="text-xs font-semibold tracking-[0.2em] uppercase text-secondary mb-6 block">
              {t('common.joinUs')}
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
              {t('common.joinOurFamily')}
            </h2>
            <p className="text-lg text-gray-300 mb-10 leading-relaxed max-w-2xl mx-auto">
              {t('common.joinOurFamilyDescription')}
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button href="/contact" variant="primary" size="lg">
                {t('common.planYourVisit')}
              </Button>
              <Button href="/contact" variant="outline" size="lg">
                {t('common.contactUs')}
              </Button>
            </div>
          </AnimatedSection>
        </div>
      </Container>
    </section>
  );
}
