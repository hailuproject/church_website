import { motion } from 'framer-motion';
import { FiArrowRight, FiBookOpen, FiHelpCircle, FiBookmark, FiCalendar } from 'react-icons/fi';
import Container from '../../components/Container';
import Section from '../../components/Section';
import Button from '../../components/Button';
import { bibleStudyFeatures } from '../../data/resourcesData';

const featureIcons = {
  weekly: FiBookOpen,
  discussion: FiHelpCircle,
  memory: FiBookmark,
  reading: FiCalendar,
};

export default function BibleStudySection() {
  return (
    <Section id="bible-study" className="bg-white">
      <Container>
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <motion.div
            className="relative overflow-hidden rounded-xs shadow-lg group"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="w-full aspect-[4/3] bg-linear-to-br from-primary to-primary-dark" />
          </motion.div>

          <motion.div
            className="flex flex-col gap-6"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <div>
              <span className="text-xs font-semibold tracking-[0.2em] uppercase text-secondary">
                Deepen Your Knowledge
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold text-text mt-4 leading-tight">
                Bible Study Resources
              </h2>
            </div>

            <p className="text-muted text-base leading-[1.8]">
              Explore the riches of the 81-book Ethiopian Orthodox canon with structured study
              guides, discussion questions, and reading plans designed to deepen your understanding of
              Scripture and strengthen your relationship with God.
            </p>

            <div className="grid sm:grid-cols-2 gap-4 mt-2">
              {bibleStudyFeatures.length > 0 &&
                bibleStudyFeatures.map((feature, i) => {
                const FeatureIcon = featureIcons[feature.icon] || FiBookOpen;
                return (
                  <motion.div
                    key={feature.title}
                    className="bg-surface rounded-xs p-5 border border-border"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: i * 0.1 }}
                  >
                    <FeatureIcon className="w-5 h-5 text-primary mb-3" />
                    <h4 className="text-sm font-bold text-text mb-1">{feature.title}</h4>
                    <p className="text-xs text-muted leading-relaxed">{feature.description}</p>
                  </motion.div>
                );
              })}
            </div>

            <div className="flex flex-col sm:flex-row items-start gap-4 mt-4">
              <Button href="#library" variant="primary" size="md">
                Start Reading
                <FiArrowRight className="text-lg" />
              </Button>
              <Button href="#library" variant="outline-dark" size="md">
                View All Studies
              </Button>
            </div>
          </motion.div>
        </div>
      </Container>
    </Section>
  );
}
