import PageHero from '../../components/common/PageHero';
import { FiArrowRight, FiMapPin } from 'react-icons/fi';
import { useTranslation } from '../../i18n/LanguageContext';

export default function HeroBanner() {
  const { t } = useTranslation();
  return (
    <PageHero
      title={t('pages.contact.title')}
      subtitle={t('pages.contact.heroSubtitle')}
      breadcrumb={[
        { label: t('common.home'), href: '/' },
        { label: t('nav.contact'), href: '/contact' },
      ]}
      ctas={[
        { label: t('common.planYourVisit'), href: '#visit', icon: <FiArrowRight className="text-lg" /> },
        { label: t('common.getDirections'), href: '#location', icon: <FiMapPin className="text-lg" /> },
      ]}
      size="full"
      ariaLabel="Contact page hero"
    />
  );
}