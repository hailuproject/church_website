import { FiMapPin, FiPhone, FiMail, FiClock } from 'react-icons/fi';
import Container from '../Container';
import Section from '../Section';
import SectionHeader from '../SectionHeader';
import Button from '../Button';
import { useChurch } from '../../hooks/useHomeSections';
import { useContent } from '../../hooks/usePublicData';
import { useTranslation } from '../../i18n/LanguageContext';

export default function ChurchInformation() {
  const { t } = useTranslation();
  const church = useChurch();
  const { data: contactContent } = useContent('contact');
  const contact = contactContent?.data || {};

  const items = [
    { icon: FiMapPin, label: t('footer.address'), value: church.address || contact.address },
    { icon: FiPhone, label: t('footer.phone'), value: church.phone || contact.phone },
    { icon: FiMail, label: t('footer.email'), value: church.email || contact.email },
  ].filter((item) => item.value);

  if (!items.length) return null;

  return (
    <Section id="information" className="bg-surface">
      <Container>
        <SectionHeader
          subtitle={t('pages.about.visitUs')}
          title={t('pages.home.churchInformation')}
          description={t('pages.home.churchInformationDescription')}
        />
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {items.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.label}
                className="bg-white rounded-xs p-6 border border-border shadow-sm text-center"
              >
                <Icon className="text-2xl text-secondary mx-auto mb-3" />
                <h3 className="text-sm font-semibold text-text mb-2">{item.label}</h3>
                <p className="text-sm text-muted leading-relaxed">{item.value}</p>
              </div>
            );
          })}
          <div className="bg-primary rounded-xs p-6 text-center flex flex-col items-center justify-center">
            <FiClock className="text-2xl text-white mb-3" />
            <h3 className="text-sm font-semibold text-white mb-2">{t('pages.home.serviceTimes')}</h3>
            <Button href="/contact" variant="outline" size="sm">
              {t('common.viewSchedule')}
            </Button>
          </div>
        </div>
      </Container>
    </Section>
  );
}
