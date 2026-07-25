import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiChevronLeft, FiChevronRight, FiMessageSquare } from 'react-icons/fi';
import Container from '../../components/Container';
import Section from '../../components/Section';
import SectionHeader from '../../components/SectionHeader';
import { testimonials } from '../../data/homeData';

export default function Testimonials() {
  const [current, setCurrent] = useState(0);

  const next = useCallback(() => {
    setCurrent((prev) => (prev + 1) % testimonials.length);
  }, []);

  const prev = useCallback(() => {
    setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  }, []);

  useEffect(() => {
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [next]);

  const t = testimonials[current];

  return (
    <Section id="testimonials" className="bg-surface">
      <Container>
        <SectionHeader
          subtitle="Testimonials"
          title="What Our Community Says"
          description="Hear from the faithful who call this church their spiritual home."
        />

        <div className="max-w-3xl mx-auto relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              className="bg-white rounded-xs p-8 md:p-12 shadow-sm border border-border text-center"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="flex justify-center mb-6">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <FiMessageSquare className="text-primary" />
                </div>
              </div>

              <p className="text-lg text-text leading-relaxed mb-8 italic">
                &ldquo;{t.text}&rdquo;
              </p>

              <div className="flex items-center justify-center gap-4">
                <img
                  src={t.avatar}
                  alt={t.name}
                  className="w-12 h-12 rounded-full object-cover border-2 border-secondary"
                  loading="lazy"
                />
                <div className="text-left">
                  <h4 className="text-sm font-bold text-text">{t.name}</h4>
                  <p className="text-xs text-muted">{t.role}</p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Controls */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <button
              onClick={prev}
              className="w-10 h-10 rounded-xs border border-border hover:border-primary flex items-center justify-center text-muted hover:text-primary transition-all duration-200 cursor-pointer"
              aria-label="Previous testimonial"
            >
              <FiChevronLeft />
            </button>
            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                    i === current ? 'w-8 bg-secondary' : 'w-2 bg-border hover:bg-muted'
                  }`}
                  aria-label={`Go to testimonial ${i + 1}`}
                />
              ))}
            </div>
            <button
              onClick={next}
              className="w-10 h-10 rounded-xs border border-border hover:border-primary flex items-center justify-center text-muted hover:text-primary transition-all duration-200 cursor-pointer"
              aria-label="Next testimonial"
            >
              <FiChevronRight />
            </button>
          </div>
        </div>
      </Container>
    </Section>
  );
}
