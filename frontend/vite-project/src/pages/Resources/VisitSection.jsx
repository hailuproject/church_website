import { motion } from 'framer-motion';
import { FiArrowRight, FiPhone } from 'react-icons/fi';
import Container from '../../components/Container';
import Section from '../../components/Section';
import Button from '../../components/Button';

export default function VisitSection() {
  return (
    <Section id="visit-library" className="bg-surface">
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
              src="https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=800&h=600&fit=crop"
              alt="Church library with bookshelves and reading area"
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
                Physical Library
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold text-text mt-4 leading-tight">
                Visit Our Church Library
              </h2>
            </div>

            <p className="text-muted text-base leading-[1.8]">
              Our church library houses an extensive collection of ancient manuscripts, theological
              texts, Ge&#x0027;ez language resources, devotional books, and educational materials. Whether
              you are a student of theology, a scholar of Ethiopian heritage, or simply seeking to
              deepen your faith, our library is a welcoming space for learning and reflection.
            </p>

            <div className="bg-white rounded-xs p-6 border border-border">
              <h3 className="text-sm font-bold text-text uppercase tracking-wider mb-3">
                Library Hours
              </h3>
              <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between py-2 border-b border-border last:border-b-0">
                  <span className="text-sm text-muted">Sunday</span>
                  <span className="text-xs font-medium text-secondary">After Liturgy</span>
                </div>
                <div className="flex items-center justify-between py-2 border-b border-border last:border-b-0">
                  <span className="text-sm text-muted">Wednesday</span>
                  <span className="text-xs font-medium text-secondary">5:00 PM - 7:00 PM</span>
                </div>
                <div className="flex items-center justify-between py-2 border-b border-border last:border-b-0">
                  <span className="text-sm text-muted">Saturday</span>
                  <span className="text-xs font-medium text-secondary">2:00 PM - 5:00 PM</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-start gap-4 mt-2">
              <Button href="/contact" variant="primary" size="md">
                Visit Library
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
