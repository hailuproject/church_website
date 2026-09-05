import { motion } from 'framer-motion';
import { FiDownload } from 'react-icons/fi';
import {
  FiBookOpen,
  FiMusic,
  FiBook,
  FiCalendar,
  FiHash,
  FiClock,
} from 'react-icons/fi';
import Container from '../../components/Container';
import Section from '../../components/Section';
import Button from '../../components/Button';
import { useLanguage } from '../../i18n/LanguageContext';
import { pickAm } from '../../lib/localize';
import { useLiturgicalResources } from '../../hooks/useResourcesSections';

const liturgicalIcons = {
  liturgy: FiBookOpen,
  hymns: FiMusic,
  psalms: FiBook,
  feast: FiCalendar,
  holyweek: FiHash,
  lent: FiClock,
};

export default function LiturgicalTimeline() {
  const { t, language } = useLanguage();
  const { items: liturgicalResources } = useLiturgicalResources();
  if (!liturgicalResources.length) return null;
  return (
    <Section id="liturgical" className="bg-surface">
      <Container>
        <motion.div
          className="flex flex-col gap-4 max-w-3xl text-center items-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="text-xs font-semibold tracking-[0.2em] uppercase text-secondary">
            {t('pages.resources.sacredTexts')}
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-text leading-tight">
            {t('pages.resources.liturgicalResources')}
          </h2>
          <p className="text-base sm:text-lg leading-relaxed max-w-2xl text-muted">
            {t('pages.resources.liturgicalDescription')}
          </p>
        </motion.div>

        <div className="relative">
          <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-border -translate-x-1/2" />

          <div className="flex flex-col gap-8">
            {liturgicalResources.map((resource, i) => {
              const ResourceIcon = liturgicalIcons[resource.icon] || FiBookOpen;
              const isEven = i % 2 === 0;
              return (
                <motion.div
                  key={resource.id}
                  className={`relative flex flex-col md:flex-row items-start gap-6 pl-14 md:pl-0 ${
                    isEven ? 'md:flex-row' : 'md:flex-row-reverse'
                  }`}
                  initial={{ opacity: 0, x: isEven ? -30 : 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{
                    duration: 0.6,
                    delay: i * 0.1,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  <div className="md:hidden absolute left-6 top-7 -translate-x-1/2 w-3 h-3 rounded-full bg-primary ring-4 ring-primary/10" />

                  <div className="hidden md:flex absolute left-1/2 top-6 -translate-x-1/2 w-10 h-10 rounded-full bg-primary text-white items-center justify-center z-10 shadow-md">
                    <ResourceIcon className="w-4 h-4" />
                  </div>

                  <div className={`w-full md:w-[calc(50%-2rem)] ${isEven ? 'md:pr-12' : 'md:pl-12'}`}>
                    <div className="bg-white rounded-xs p-5 sm:p-6 border border-border hover:border-primary/20 transition-all duration-500 hover:shadow-lg">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 rounded-xs bg-primary/10 flex items-center justify-center md:hidden flex-shrink-0">
                          <ResourceIcon className="w-5 h-5 text-primary" />
                        </div>
                        <h3 className="text-lg font-bold text-text">{pickAm(resource, 'title', language)}</h3>
                      </div>
                      <p className="text-sm text-muted leading-relaxed mb-4">
                        {pickAm(resource, 'description', language)}
                      </p>
                      {resource.fileUrl && (
                        <Button href={resource.fileUrl} target="_blank" rel="noopener noreferrer" variant="outline-dark" size="sm">
                          <FiDownload className="text-sm" />
                          {t('pages.resources.download')}
                        </Button>
                      )}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </Container>
    </Section>
  );
}
