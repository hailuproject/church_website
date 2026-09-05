import CtaSection from '../../components/CTASection';
import { FiArrowRight } from 'react-icons/fi';
import { useTranslation } from '../../i18n/LanguageContext';

export default function CTASection() {
  const { t } = useTranslation();
  return (
    <CtaSection
      eyebrow={t('pages.gallery.ctaEyebrow')}
      title={t('pages.gallery.ctaTitle')}
      description={t('pages.gallery.ctaDescription')}
      ctas={[
        { label: t('pages.gallery.browseGallery'), href: '#photos', variant: 'secondary', icon: <FiArrowRight className="text-lg" /> },
        { label: t('common.contactUs'), href: '/contact', variant: 'outline' },
      ]}
    />
  );
}