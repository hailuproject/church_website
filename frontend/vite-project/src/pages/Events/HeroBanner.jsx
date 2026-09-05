import PageHero from '../../components/common/PageHero';
import { FiArrowRight } from 'react-icons/fi';
import { useTranslation } from '../../i18n/LanguageContext';

export default function HeroBanner() {
  const { t } = useTranslation();
  return (
    <PageHero
      title={t('pages.events.title')}
      subtitle={t('pages.events.heroSubtitle')}
      breadcrumb={[
        { label: t('common.home'), href: '/' },
        { label: t('nav.events'), href: '/events' },
      ]}
      ctas={[
        { label: t('pages.events.viewCalendar'), href: '#calendar', icon: <FiArrowRight className="text-lg" /> },
        { label: t('pages.events.upcomingEvents'), href: '#upcoming' },
      ]}
      size="full"
      ariaLabel="Events page hero"
    />
  );
}