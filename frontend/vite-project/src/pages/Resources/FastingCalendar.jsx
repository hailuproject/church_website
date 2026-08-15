import Container from '../../components/Container';
import Section from '../../components/Section';
import SectionHeader from '../../components/SectionHeader';
import FastingCard from './FastingCard';
import { fastingPeriods } from '../../data/resourcesData';
import { useTranslation } from '../../i18n/LanguageContext';

export default function FastingCalendar() {
  const { t } = useTranslation();
  return (
    <Section id="fasting" className="bg-white">
      <Container>
        <SectionHeader
          subtitle={t('pages.resources.spiritualDiscipline')}
          title={t('pages.resources.fastingCalendar')}
          description={t('pages.resources.fastingDescription')}
        />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {fastingPeriods.map((period, i) => (
            <FastingCard key={period.id} period={period} index={i} />
          ))}
        </div>
      </Container>
    </Section>
  );
}
