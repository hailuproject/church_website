import PageHero from '../../components/common/PageHero';
import { FiCamera, FiPlay } from 'react-icons/fi';
import { useTranslation } from '../../i18n/LanguageContext';

export default function HeroBanner() {
  const { t } = useTranslation();
  return (
    <PageHero
      title={t('pages.gallery.title')}
      subtitle={t('pages.gallery.heroSubtitle')}
      breadcrumb={[
        { label: t('common.home'), href: '/' },
        { label: t('nav.gallery'), href: '/gallery' },
      ]}
      ctas={[
        { label: t('pages.gallery.viewPhotos'), href: '#photos', icon: <FiCamera className="text-lg" /> },
        { label: t('pages.gallery.watchVideos'), href: '#videos', icon: <FiPlay className="text-lg" /> },
      ]}
      size="full"
      ariaLabel="Gallery page hero"
    />
  );
}