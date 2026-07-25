import { motion } from 'framer-motion';
import { FiArrowRight, FiPhone, FiCheck } from 'react-icons/fi';
import Container from '../../components/Container';
import Section from '../../components/Section';
import Button from '../../components/Button';
import { visitHighlights } from '../../data/contactData';

export default function VisitSection() {
  return (
    <Section id="visit" className="bg-white">
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
              src="https://images.unsplash.com/photo-1597466599360-3b9775841aec?w=800&h=600&fit=crop"
              alt="Welcoming Ethiopian Orthodox Church community gathering"
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
                Join Us
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold text-text mt-4 leading-tight">
                You&apos;re Always Welcome
              </h2>
            </div>

            <p className="text-muted text-base leading-[1.8]">
              Whether you&apos;re seeking a spiritual home, exploring the ancient faith, or simply
              curious about the Ethiopian Orthodox tradition, you are warmly invited to visit our
              church. Come experience the beauty of our liturgy, the warmth of our community, and
              the peace of worship.
            </p>

            <div className="flex flex-col gap-2.5">
              {visitHighlights.map((item) => (
                <div key={item} className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                    <FiCheck className="w-3 h-3 text-green-600" />
                  </div>
                  <span className="text-sm text-text font-medium">{item}</span>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row items-start gap-4 mt-2">
              <Button href="/events" variant="primary" size="md">
                Visit This Sunday
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
