import CtaSection from '../../components/CTASection';
import { FiArrowRight } from 'react-icons/fi';
import { useTranslation } from '../../i18n/LanguageContext';

export default function CTASection() {
  const { t } = useTranslation();
  return (
    <CtaSection
      eyebrow={t('pages.contact.comeWorship')}
      title={t('pages.contact.ctaTitle')}
      description={t('pages.contact.ctaDescription')}
      ctas={[
        { label: t('pages.contact.viewServiceTimes'), href: '/events', variant: 'secondary', icon: <FiArrowRight className="text-lg" /> },
        { label: t('common.getDirections'), href: '#location', variant: 'outline' },
      ]}
    />
  );
}