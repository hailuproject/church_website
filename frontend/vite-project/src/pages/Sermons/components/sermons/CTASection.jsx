import CtaSection from '../../../../components/CTASection';
import { FiArrowRight, FiMapPin } from 'react-icons/fi';
import { useTranslation } from '../../../../i18n/LanguageContext';

export default function CTASection() {
  const { t } = useTranslation();
  return (
    <CtaSection
      title={t('pages.sermons.ctaTitle')}
      description={t('pages.sermons.ctaDescription')}
      background="dark"
      ctas={[
        { label: t('pages.sermons.visitChurch'), href: '/contact', variant: 'primary', icon: <FiMapPin className="text-lg" /> },
        { label: t('pages.sermons.viewEvents'), href: '/events', variant: 'outline', icon: <FiArrowRight className="text-lg" /> },
      ]}
    />
  );
}