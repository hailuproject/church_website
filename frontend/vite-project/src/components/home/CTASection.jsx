import CtaSection from '../CTASection';
import { useHomeCta } from '../../hooks/useHomeSections';
import { useTranslation } from '../../i18n/LanguageContext';

export default function CTASection() {
  const { t } = useTranslation();
  const cta = useHomeCta();

  const ctas = cta
    ? [
        { label: cta.buttonLabel || t('common.contactUs'), href: cta.buttonHref || '/contact', variant: 'primary' },
        { label: t('common.planYourVisit'), href: '/visit', variant: 'outline' },
      ]
    : [
        { label: t('common.planYourVisit'), href: '/visit', variant: 'primary' },
        { label: t('common.contactUs'), href: '/contact', variant: 'outline' },
      ];

  return (
    <CtaSection
      eyebrow={t('common.joinUs')}
      title={cta?.title || t('common.joinOurFamily')}
      description={cta?.content || t('common.joinOurFamilyDescription')}
      ctas={ctas}
    />
  );
}