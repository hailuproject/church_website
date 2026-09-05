import PageHero from '../../components/common/PageHero';
import { FiArrowRight } from 'react-icons/fi';
import { useTranslation } from '../../i18n/LanguageContext';

export default function HeroBanner() {
  const { t } = useTranslation();
  return (
    <PageHero
      title={t('pages.resources.title')}
      subtitle={t('pages.resources.heroSubtitle')}
      breadcrumb={[
        { label: t('common.home'), href: '/' },
        { label: t('nav.resources'), href: '/resources' },
      ]}
      ctas={[
        { label: t('pages.resources.exploreLibrary'), href: '#library', icon: <FiArrowRight className="text-lg" /> },
        { label: t('pages.resources.downloadResources'), href: '#downloads' },
      ]}
      size="full"
      ariaLabel={t('pages.resources.heroLabel')}
    />
  );
}