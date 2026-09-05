import PageHero from '../../../../components/common/PageHero';
import { FiArrowRight, FiPlay } from 'react-icons/fi';
import { useTranslation } from '../../../../i18n/LanguageContext';

export default function HeroBanner() {
  const { t } = useTranslation();
  return (
    <PageHero
      title={t('pages.sermons.title')}
      subtitle={t('pages.sermons.heroSubtitle')}
      breadcrumb={[
        { label: t('common.home'), href: '/' },
        { label: t('nav.sermons'), href: '/sermons' },
      ]}
      ctas={[
        { label: t('pages.sermons.watchLive'), href: '#live', icon: <FiPlay className="text-base" />, size: 'md' },
        { label: t('pages.sermons.browseSermons'), href: '#sermons', icon: <FiArrowRight className="text-base" />, size: 'md' },
      ]}
      size="page"
      bottomFadeColor="from-white"
      ariaLabel={t('pages.sermons.heroLabel')}
    />
  );
}