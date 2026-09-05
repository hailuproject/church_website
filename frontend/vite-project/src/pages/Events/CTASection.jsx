import CtaSection from '../../components/CTASection';
import { FiArrowRight } from 'react-icons/fi';
import { useTranslation } from '../../i18n/LanguageContext';

export default function CTASection() {
  const { t } = useTranslation();
  return (
    <CtaSection
      eyebrow={t('pages.events.ctaEyebrow')}
      title={t('pages.events.ctaTitle')}
      description={t('pages.events.ctaDescription')}
      ctas={[
        { label: t('pages.events.visitUs'), href: '/visit', variant: 'secondary', icon: <FiArrowRight className="text-lg" /> },
        { label: t('common.contactUs'), href: '/contact', variant: 'outline' },
      ]}
    />
  );
}