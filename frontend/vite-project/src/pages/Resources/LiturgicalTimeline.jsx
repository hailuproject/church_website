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
import { liturgicalResources } from '../../data/resourcesData';
import Button from '../../components/Button';

const liturgicalIcons = {
  liturgy: FiBookOpen,
  hymns: FiMusic,
  psalms: FiBook,
  feast: FiCalendar,
  holyweek: FiHash,
  lent: FiClock,
};

export default function LiturgicalTimeline() {
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
            Sacred Texts
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-text leading-tight">
            Liturgical Resources
          </h2>
          <p className="text-base sm:text-lg leading-relaxed max-w-2xl text-muted">
            Essential texts and guides for understanding and participating in the beautiful
            liturgical services of the Ethiopian Orthodox Church.
          </p>
        </motion.div>

        <div className="relative">
          <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-border -translate-x-1/2 hidden md:block" />

          <div className="flex flex-col gap-8">
            {liturgicalResources.map((resource, i) => {
              const ResourceIcon = liturgicalIcons[resource.icon] || FiBookOpen;
              const isEven = i % 2 === 0;
              return (
                <motion.div
                  key={resource.id}
                  className={`relative flex flex-col md:flex-row items-start gap-6 ${
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
                  <div className="hidden md:flex absolute left-1/2 top-6 -translate-x-1/2 w-10 h-10 rounded-full bg-primary text-white items-center justify-center z-10 shadow-md">
                    <ResourceIcon className="w-4 h-4" />
                  </div>

                  <div className={`w-full md:w-[calc(50%-2rem)] ${isEven ? 'md:pr-12' : 'md:pl-12'}`}>
                    <div className="bg-white rounded-xs p-6 border border-border hover:border-primary/20 transition-all duration-500 hover:shadow-lg">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 rounded-xs bg-primary/10 flex items-center justify-center md:hidden">
                          <ResourceIcon className="w-5 h-5 text-primary" />
                        </div>
                        <h3 className="text-lg font-bold text-text">{resource.title}</h3>
                      </div>
                      <p className="text-sm text-muted leading-relaxed mb-4">
                        {resource.description}
                      </p>
                      <Button href="#" variant="outline-dark" size="sm">
                        <FiDownload className="text-sm" />
                        Download
                      </Button>
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
