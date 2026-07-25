import { motion } from 'framer-motion';
import { FiArrowRight, FiPhone } from 'react-icons/fi';
import Container from '../../components/Container';
import Section from '../../components/Section';
import Button from '../../components/Button';
import { visitData } from '../../data/eventsData';

export default function VisitSection() {
  return (
    <Section id="visit" className="bg-surface">
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
              src={visitData.image}
              alt={visitData.imageAlt}
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
                {visitData.subtitle}
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold text-text mt-4 leading-tight">
                {visitData.title}
              </h2>
            </div>

            <p className="text-muted text-base leading-[1.8]">
              {visitData.welcome}
            </p>

            <div className="flex flex-col gap-3 bg-white rounded-xs p-6 border border-border">
              <h3 className="text-sm font-bold text-text uppercase tracking-wider mb-1">
                This Week&apos;s Services
              </h3>
              {visitData.serviceTimes.map((s) => (
                <div key={s.day} className="flex items-center justify-between py-2 border-b border-border last:border-b-0">
                  <div>
                    <span className="text-sm font-semibold text-text">{s.day}</span>
                    <span className="text-sm text-muted ml-2">— {s.service}</span>
                  </div>
                  <span className="text-xs font-medium text-secondary">{s.time}</span>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row items-start gap-4 mt-2">
              <Button href="/contact" variant="primary" size="md">
                Visit Church
                <FiArrowRight className="text-lg" />
              </Button>
              <Button href="/contact" variant="outline-dark" size="md">
                <FiPhone className="text-lg" />
                Contact Us
              </Button>
            </div>
          </motion.div>
        </div>
      </Container>
    </Section>
  );
}
