import PageHero from '../../components/common/PageHero';
import { FiArrowRight } from 'react-icons/fi';
import { useTranslation } from '../../i18n/LanguageContext';

export default function HeroBanner() {
  const { t } = useTranslation();
  return (
    <PageHero
      title={t('pages.about.title')}
      subtitle={t('pages.about.heroSubtitle')}
      breadcrumb={[
        { label: t('common.home'), href: '/' },
        { label: t('nav.about'), href: '/about' },
      ]}
      ctas={[
        { label: t('pages.about.visitUsBtn'), href: '/contact', icon: <FiArrowRight className="text-lg" /> },
        { label: t('pages.about.contactChurchBtn'), href: '/contact' },
      ]}
      size="full"
      ariaLabel="About page hero"
    />
  );
}