import { motion } from 'framer-motion';
import { FiBookOpen } from 'react-icons/fi';
import Container from '../../components/Container';
import AnimatedSection from '../../components/AnimatedSection';
import Button from '../../components/Button';
import { dailyScripture } from '../../data/homeData';

export default function ScriptureSection() {
  return (
    <section
      id="scripture"
      className="relative py-24 md:py-32 overflow-hidden"
      aria-label="Daily Scripture"
    >
      <div className="absolute inset-0 bg-linear-to-br from-stone-900 via-primary-dark to-stone-900" />
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-secondary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      </div>

      <Container className="relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <AnimatedSection>
            <div className="flex justify-center mb-8">
              <div className="w-16 h-16 rounded-xs bg-secondary/20 flex items-center justify-center">
                <span className="text-4xl text-secondary">☦</span>
              </div>
            </div>

            <span className="text-xs font-semibold tracking-[0.2em] uppercase text-secondary mb-4 block">
              Today&apos;s Scripture
            </span>

            <motion.blockquote
              className="text-2xl sm:text-3xl md:text-4xl font-bold text-white leading-snug mb-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              &ldquo;{dailyScripture.verse}&rdquo;
            </motion.blockquote>

            <motion.p
              className="text-lg text-secondary-light font-semibold mb-10"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              — {dailyScripture.reference}
            </motion.p>

            <Button href="/resources" variant="outline" size="md">
              <FiBookOpen className="text-sm" />
              Read More Scriptures
            </Button>
          </AnimatedSection>
        </div>
      </Container>
    </section>
  );
}
