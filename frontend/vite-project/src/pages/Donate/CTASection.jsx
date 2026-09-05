import CtaSection from '../../components/CTASection';
import { FiArrowRight } from 'react-icons/fi';
import { useTranslation } from '../../i18n/LanguageContext';

export default function CTASection() {
  const { t } = useTranslation();
  return (
    <CtaSection
      eyebrow={t('pages.donate.ctaEyebrow')}
      title={t('pages.donate.ctaTitle')}
      description={t('pages.donate.ctaDescription')}
      ctas={[
        { label: t('pages.donate.donateToday'), href: '#donate', variant: 'secondary', icon: <FiArrowRight className="text-lg" /> },
        { label: t('pages.about.contactChurchBtn'), href: '/contact', variant: 'outline' },
      ]}
    />
  );
}