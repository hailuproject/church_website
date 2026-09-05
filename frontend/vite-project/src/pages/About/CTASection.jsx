import CtaSection from '../../components/CTASection';
import { FiArrowRight } from 'react-icons/fi';
import { useTranslation } from '../../i18n/LanguageContext';

export default function CTASection() {
  const { t } = useTranslation();
  return (
    <CtaSection
      eyebrow={t('pages.about.welcome')}
      title={t('pages.about.ctaTitle')}
      description={t('pages.about.ctaDescription')}
      ctas={[
        { label: t('pages.about.visitChurch'), href: '/contact', variant: 'secondary', icon: <FiArrowRight className="text-lg" /> },
        { label: t('common.contactUs'), href: '/contact', variant: 'outline' },
      ]}
    />
  );
}