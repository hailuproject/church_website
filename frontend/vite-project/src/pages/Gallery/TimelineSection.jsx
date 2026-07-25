import { motion } from 'framer-motion';
import Container from '../../components/Container';
import Section from '../../components/Section';
import { timeline } from '../../data/galleryData';

export default function TimelineSection() {
  return (
    <Section id="history" className="bg-surface">
      <Container>
        <motion.div
          className="flex flex-col gap-4 max-w-3xl text-center items-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="text-xs font-semibold tracking-[0.2em] uppercase text-secondary">
            Our Journey
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-text leading-tight">
            Church Through the Years
          </h2>
          <p className="text-base sm:text-lg leading-relaxed max-w-2xl text-muted">
            A visual journey through the milestones and moments that have shaped our parish community.
          </p>
        </motion.div>

        <div className="relative">
          <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-border -translate-x-1/2 hidden md:block" />

          <div className="flex flex-col gap-12">
            {timeline.map((item, i) => {
              const isEven = i % 2 === 0;
              return (
                <motion.div
                  key={item.year}
                  className={`relative flex flex-col md:flex-row items-start gap-6 ${
                    isEven ? 'md:flex-row' : 'md:flex-row-reverse'
                  }`}
                  initial={{ opacity: 0, x: isEven ? -30 : 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{
                    duration: 0.6,
                    delay: i * 0.1,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  <div className="hidden md:flex absolute left-1/2 top-6 -translate-x-1/2 w-12 h-12 rounded-full bg-primary text-white items-center justify-center z-10 shadow-md">
                    <span className="text-xs font-bold">{item.year}</span>
                  </div>

                  <div className={`w-full md:w-[calc(50%-2rem)] ${isEven ? 'md:pr-16' : 'md:pl-16'}`}>
                    <div className="bg-white rounded-xs overflow-hidden border border-border hover:border-primary/20 transition-all duration-500 hover:shadow-lg">
                      <div className="relative overflow-hidden">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-full aspect-[16/9] object-cover hover:scale-105 transition-transform duration-700"
                          loading="lazy"
                        />
                      </div>
                      <div className="p-6">
                        <div className="md:hidden flex items-center gap-2 mb-3">
                          <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center">
                            <span className="text-[10px] font-bold">{item.year}</span>
                          </div>
                        </div>
                        <h3 className="text-lg font-bold text-text mb-2">{item.title}</h3>
                        <p className="text-sm text-muted leading-relaxed">{item.description}</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </Container>
    </Section>
  );
}
