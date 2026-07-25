import { motion } from 'framer-motion';
import { FiArrowRight } from 'react-icons/fi';
import Button from '../../../components/Button';
import { featuredSacrament } from '../../../data/sacramentsData';

export default function FeaturedSacrament() {
  return (
    <section id="featured" className="py-24 md:py-32 bg-white" aria-label="Featured sacrament">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <motion.div
            className="relative overflow-hidden rounded-xs shadow-lg group order-2 lg:order-1"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <img
              src={featuredSacrament.image}
              alt={featuredSacrament.imageAlt}
              className="w-full aspect-[4/3] object-cover group-hover:scale-105 transition-transform duration-700"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
          </motion.div>

          <motion.div
            className="flex flex-col justify-center gap-6 max-w-xl order-1 lg:order-2"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="text-xs font-semibold tracking-[0.2em] uppercase text-secondary">
              {featuredSacrament.subtitle}
            </span>
            <h3 className="text-2xl sm:text-3xl font-bold text-text leading-tight">
              {featuredSacrament.title}
            </h3>

            {featuredSacrament.description.map((paragraph, i) => (
              <motion.p
                key={i}
                className="text-muted text-base leading-[1.8] max-w-[65ch]"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{
                  duration: 0.6,
                  delay: i * 0.1,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                {paragraph}
              </motion.p>
            ))}

            <div className="flex items-center gap-3 py-2">
              <span className="h-px w-10 bg-secondary/40" />
              <cite className="text-secondary text-sm font-semibold not-italic">
                {featuredSacrament.verse}
              </cite>
            </div>

            <div className="pt-2">
              <Button href="/contact" variant="primary" size="md">
                Learn More
                <FiArrowRight className="text-lg" />
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
