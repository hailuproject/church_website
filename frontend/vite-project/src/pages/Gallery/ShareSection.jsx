import { motion } from 'framer-motion';
import { FiArrowRight, FiPhone } from 'react-icons/fi';
import Container from '../../components/Container';
import Section from '../../components/Section';
import Button from '../../components/Button';

export default function ShareSection() {
  return (
    <Section id="share" className="bg-white">
      <Container>
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <motion.div
            className="relative overflow-hidden rounded-xs shadow-lg group order-2 lg:order-1"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <img
              src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800&h=600&fit=crop"
              alt="Community members sharing joyful moments at church"
              className="w-full aspect-[4/3] object-cover group-hover:scale-105 transition-transform duration-700"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
          </motion.div>

          <motion.div
            className="flex flex-col gap-6 order-1 lg:order-2"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <div>
              <span className="text-xs font-semibold tracking-[0.2em] uppercase text-secondary">
                Contribute
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold text-text mt-4 leading-tight">
                Share Your Church Moments
              </h2>
            </div>

            <p className="text-muted text-base leading-[1.8]">
              We invite all members of our community to contribute their cherished photographs from
              church events, feast celebrations, baptisms, weddings, and other memorable occasions.
              Your photos help preserve the living history of our parish.
            </p>

            <div className="bg-surface rounded-xs p-6 border border-border">
              <h3 className="text-sm font-bold text-text uppercase tracking-wider mb-3">
                What to Share
              </h3>
              <ul className="flex flex-col gap-2 text-sm text-muted">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-secondary flex-shrink-0" />
                  Feast day celebrations and processions
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-secondary flex-shrink-0" />
                  Worship services and liturgical moments
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-secondary flex-shrink-0" />
                  Community gatherings and fellowship
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-secondary flex-shrink-0" />
                  Youth activities and ministries
                </li>
              </ul>
            </div>

            <div className="flex flex-col sm:flex-row items-start gap-4 mt-2">
              <Button href="/contact" variant="primary" size="md">
                Submit Photos
                <FiArrowRight className="text-lg" />
              </Button>
              <Button href="/contact" variant="outline-dark" size="md">
                <FiPhone className="text-lg" />
                Contact Church
              </Button>
            </div>
          </motion.div>
        </div>
      </Container>
    </Section>
  );
}
