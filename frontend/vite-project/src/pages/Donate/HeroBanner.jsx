import PageHero from '../../components/common/PageHero';
import { FiGift } from 'react-icons/fi';
import { useTranslation } from '../../i18n/LanguageContext';

export default function HeroBanner() {
  const { t } = useTranslation();
  return (
    <PageHero
      title={t('pages.donate.title')}
      subtitle={t('pages.donate.heroSubtitle')}
      breadcrumb={[
        { label: t('common.home'), href: '/' },
        { label: t('nav.donate'), href: '/donate' },
      ]}
      ctas={[
        { label: t('pages.donate.donateNow'), href: '#donate', icon: <FiGift className="text-lg" /> },
        { label: t('pages.donate.givingOptions'), href: '#options' },
      ]}
      size="full"
      ariaLabel="Donate page hero"
    />
  );
}