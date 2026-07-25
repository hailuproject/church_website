import { motion } from 'framer-motion';
import { FiSunrise, FiClock, FiMoon, FiBookOpen, FiUsers, FiMusic } from 'react-icons/fi';
import Container from '../../components/Container';
import Section from '../../components/Section';
import SectionHeader from '../../components/SectionHeader';
import Button from '../../components/Button';
import { serviceSchedule } from '../../data/homeData';

const iconMap = {
  FiSunrise,
  FiClock,
  FiMoon,
  FiBookOpen,
  FiUsers,
  FiMusic,
};

export default function ServiceSchedule() {
  return (
    <Section id="schedule" className="bg-surface">
      <Container>
        <SectionHeader
          subtitle="Schedule"
          title="Weekly Service Schedule"
          description="Join us throughout the week for worship, prayer, and fellowship."
        />

        <div className="max-w-3xl mx-auto">
          <div className="relative">
            <div className="absolute left-6 top-0 bottom-0 w-px bg-border" aria-hidden="true" />

            <div className="flex flex-col gap-0">
              {serviceSchedule.map((service, i) => {
                const Icon = iconMap[service.icon] || FiClock;

                return (
                  <motion.div
                    key={service.id}
                    className="relative flex items-start gap-6 py-6 group"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: '-40px' }}
                    transition={{
                      duration: 0.5,
                      delay: i * 0.08,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                  >
                    <div className="relative z-10 flex-shrink-0">
                      <div className="w-12 h-12 rounded-xs bg-white border border-border group-hover:border-secondary/40 group-hover:shadow-md flex items-center justify-center transition-all duration-300">
                        <Icon className="text-lg text-secondary" />
                      </div>
                    </div>

                    <div className="flex-1 pb-6 border-b border-border group-last:border-b-0">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 sm:gap-4">
                        <h4 className="text-base font-bold text-text group-hover:text-primary transition-colors duration-300">
                          {service.title}
                        </h4>
                        <span className="text-xs font-semibold text-secondary tracking-wide">
                          {service.time}
                        </span>
                      </div>
                      <p className="text-sm text-muted mt-2 leading-relaxed">
                        {service.description}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="text-center mt-12">
          <Button href="/events" variant="outline-dark">
            View Full Schedule
          </Button>
        </div>
      </Container>
    </Section>
  );
}
