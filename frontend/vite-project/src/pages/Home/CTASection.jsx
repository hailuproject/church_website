import { motion } from 'framer-motion';
import Container from '../../components/Container';
import Button from '../../components/Button';

export default function CTASection() {
  return (
    <section className="relative py-24 md:py-32 overflow-hidden" aria-label="Call to action">
      <img
        src="https://images.unsplash.com/photo-1597466599360-3b9775841aec?w=1920&h=800&fit=crop"
        alt="Ethiopian Orthodox Church"
        className="absolute inset-0 w-full h-full object-cover"
        loading="lazy"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/70" />

      <Container className="relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="text-xs font-semibold tracking-[0.2em] uppercase text-secondary mb-6 block">
              Join Us
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
              Join Our Church Family
            </h2>
            <p className="text-lg text-gray-300 mb-10 leading-relaxed max-w-2xl mx-auto">
              Whether you&apos;re seeking spiritual growth, worship, or fellowship, we welcome
              you with open hearts. Come and experience the beauty of the Ethiopian Orthodox
              tradition.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button href="/contact" variant="primary" size="lg">
                Plan Your Visit
              </Button>
              <Button href="/contact" variant="outline" size="lg">
                Contact Us
              </Button>
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
