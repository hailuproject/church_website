import { motion } from 'framer-motion';
import { FiArrowRight, FiPlay } from 'react-icons/fi';
import Button from '../../../../components/Button';
import { heroData } from '../../../../data/sermonsData';

export default function HeroBanner() {
  return (
    <section
      className="relative min-h-[70vh] md:min-h-[80vh] flex items-center justify-center overflow-hidden"
      aria-label="Sermons hero banner"
    >
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1548013146-72479768bada?w=1920&h=1080&fit=crop"
          alt="Ethiopian Orthodox Church interior with beautiful murals"
          className="w-full h-full object-cover"
          loading="eager"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/80" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 w-full">
        <nav aria-label="Breadcrumb" className="mb-10">
          <ol className="flex items-center gap-2 text-sm text-white/50">
            {heroData.breadcrumb.map((crumb, i) => (
              <li key={crumb.href} className="flex items-center gap-2">
                {i > 0 && <span aria-hidden="true">/</span>}
                <a
                  href={crumb.href}
                  className="hover:text-secondary transition-colors duration-300"
                >
                  {crumb.label}
                </a>
              </li>
            ))}
          </ol>
        </nav>

        <div className="flex flex-col items-start gap-5 max-w-2xl">
          <motion.span
            className="inline-block text-secondary text-xs font-semibold tracking-[0.25em] uppercase"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Ethiopian Orthodox Tewahedo Church
          </motion.span>

          <motion.h1
            className="text-4xl sm:text-5xl md:text-6xl font-bold text-white leading-[1.1]"
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
          >
            {heroData.title}
          </motion.h1>

          <motion.p
            className="text-lg text-gray-300/90 max-w-lg leading-relaxed"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5 }}
          >
            {heroData.subtitle}
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row items-start gap-3 mt-1"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.65 }}
          >
            <Button href="#live" variant="primary" size="md">
              <FiPlay className="text-base" />
              Watch Live
            </Button>
            <Button href="#sermons" variant="outline" size="md">
              Browse Sermons
              <FiArrowRight className="text-base" />
            </Button>
          </motion.div>
        </div>
      </div>

      <div className="absolute bottom-0 inset-x-0 h-24 bg-gradient-to-t from-white to-transparent" />
    </section>
  );
}
