import CtaSection from '../../components/CTASection';
import { FiArrowRight } from 'react-icons/fi';
import { useTranslation } from '../../i18n/LanguageContext';

export default function CTASection() {
  const { t } = useTranslation();
  return (
    <CtaSection
      eyebrow={t('pages.resources.ctaEyebrow')}
      title={t('pages.resources.ctaTitle')}
      description={t('pages.resources.ctaDescription')}
      ctas={[
        { label: t('pages.resources.exploreResources'), href: '#library', variant: 'secondary', icon: <FiArrowRight className="text-lg" /> },
        { label: t('common.contactUs'), href: '/contact', variant: 'outline' },
      ]}
    />
  );
}