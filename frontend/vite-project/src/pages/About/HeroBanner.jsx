import { motion } from 'framer-motion';
import { FiArrowRight } from 'react-icons/fi';
import Button from '../../components/Button';
import { heroData } from '../../data/aboutData';
import { useChurch } from '../../hooks/useHomeSections';

export default function HeroBanner() {
  const church = useChurch();
  const hero = {
    ...heroData,
    churchName: church.name || heroData.churchName,
  };
  return (
    <section
      className="relative min-h-[85vh] md:min-h-screen flex items-center justify-center overflow-hidden"
      aria-label="About page hero"
    >
      {/* Background */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1548013146-72479768bada?w=1920&h=1080&fit=crop"
          alt="Ethiopian Orthodox Church interior with beautiful murals"
          className="w-full h-full object-cover"
          loading="eager"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/80" />
      </div>

      {/* Floating orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-1/4 left-[10%] w-72 h-72 rounded-full bg-secondary/5 blur-3xl"
          animate={{ y: [0, -25, 0], x: [0, 12, 0] }}
          transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute bottom-1/3 right-[10%] w-56 h-56 rounded-full bg-primary/5 blur-3xl"
          animate={{ y: [0, 18, 0], x: [0, -10, 0] }}
          transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 w-full">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="mb-10">
          <ol className="flex items-center gap-2 text-sm text-white/50">
            {hero.breadcrumb.map((crumb, i) => (
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

        <div className="flex flex-col items-start gap-6 max-w-3xl">
          <motion.span
            className="inline-block text-secondary text-xs font-semibold tracking-[0.25em] uppercase"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {hero.churchName}
          </motion.span>

          <motion.h1
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-[1.08]"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            {hero.title}
          </motion.h1>

          <motion.p
            className="text-lg sm:text-xl text-gray-300/90 max-w-xl leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.6 }}
          >
            {hero.subtitle}
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row items-start gap-4 mt-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            <Button href="/contact" variant="primary" size="lg">
              Visit Us
              <FiArrowRight className="text-lg" />
            </Button>
            <Button href="/contact" variant="outline" size="lg">
              Contact Church
            </Button>
          </motion.div>
        </div>
      </div>

      {/* Bottom gradient */}
      <div className="absolute bottom-0 inset-x-0 h-32 bg-gradient-to-t from-surface to-transparent" />
    </section>
  );
}
