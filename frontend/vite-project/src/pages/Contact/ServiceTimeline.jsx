import { motion } from 'framer-motion';
import {
  FiSunrise,
  FiSun,
  FiMoon,
  FiBookOpen,
  FiStar,
  FiMusic,
  FiClock,
} from 'react-icons/fi';
import Container from '../../components/Container';
import Section from '../../components/Section';
import { serviceSchedule } from '../../data/contactData';

const serviceIcons = {
  sunday: FiSun,
  morning: FiSunrise,
  evening: FiMoon,
  study: FiBookOpen,
  youth: FiStar,
  choir: FiMusic,
  fasting: FiClock,
};

export default function ServiceTimeline() {
  return (
    <Section id="schedule" className="bg-white">
      <Container>
        <motion.div
          className="flex flex-col gap-4 max-w-3xl text-center items-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="text-xs font-semibold tracking-[0.2em] uppercase text-secondary">
            Worship Times
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-text leading-tight">
            Weekly Service Schedule
          </h2>
          <p className="text-base sm:text-lg leading-relaxed max-w-2xl text-muted">
            Join us for any of our weekly services. All are welcome to worship with our community.
          </p>
        </motion.div>

        <div className="max-w-3xl mx-auto flex flex-col gap-4">
          {serviceSchedule.map((item, i) => {
            const ServiceIcon = serviceIcons[item.icon] || FiClock;
            return (
              <motion.div
                key={item.id}
                className="group flex items-start gap-5 bg-surface rounded-xs p-6 border border-border hover:border-primary/20 transition-all duration-500 hover:shadow-lg"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{
                  duration: 0.5,
                  delay: i * 0.06,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                <div className="w-12 h-12 rounded-xs bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary transition-colors duration-500">
                  <ServiceIcon className="w-5 h-5 text-primary group-hover:text-white transition-colors duration-500" />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3 mb-1">
                    <h3 className="text-base font-bold text-text group-hover:text-primary transition-colors duration-300">
                      {item.service}
                    </h3>
                    <span className="text-xs font-semibold text-secondary bg-secondary/10 rounded-xs px-2 py-0.5 self-start">
                      {item.time}
                    </span>
                  </div>
                  <p className="text-sm text-muted leading-relaxed">{item.description}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </Container>
    </Section>
  );
}
