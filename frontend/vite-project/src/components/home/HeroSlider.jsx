import { motion } from 'framer-motion';
import { useHeroData } from '../../hooks/useHomeSections';
import Button from '../Button';

export default function HeroSlider() {
  const hero = useHeroData();
  if (!hero) return null;

  return (
    <section className="relative w-full h-screen min-h-[600px] flex items-center justify-center" aria-label="Hero">
      <img
        src={hero.image}
        alt=""
        className="absolute inset-0 w-full h-full object-cover"
        loading="eager"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />

      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="inline-block text-secondary text-sm font-semibold tracking-[0.2em] uppercase mb-6">
            Ethiopian Orthodox Tewahedo Church
          </span>
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-6">
            {hero.heading}
          </h1>
          <p className="text-lg sm:text-xl text-gray-300 max-w-2xl mx-auto mb-10 leading-relaxed">
            {hero.tagline}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            {hero.primaryCta?.label && (
              <Button href={hero.primaryCta.href || '/about'} variant="primary" size="lg">
                {hero.primaryCta.label}
              </Button>
            )}
            {hero.secondaryCta?.label && (
              <Button href={hero.secondaryCta.href || '/contact'} variant="outline" size="lg">
                {hero.secondaryCta.label}
              </Button>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
