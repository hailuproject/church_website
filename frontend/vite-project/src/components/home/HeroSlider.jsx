import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiChevronLeft, FiChevronRight, FiArrowDown } from 'react-icons/fi';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, EffectFade } from 'swiper/modules';
import { heroSlides } from '../../data/homeData';
import Button from '../Button';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';

export default function HeroSlider() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [swiperRef, setSwiperRef] = useState(null);

  const handlePrev = useCallback(() => swiperRef?.slidePrev(), [swiperRef]);
  const handleNext = useCallback(() => swiperRef?.slideNext(), [swiperRef]);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === 'ArrowRight') handleNext();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [handlePrev, handleNext]);

  return (
    <section className="relative w-full h-screen min-h-[600px]" aria-label="Hero slider">
      <Swiper
        modules={[Autoplay, Pagination, EffectFade]}
        effect="fade"
        fadeEffect={{ crossFade: true }}
        autoplay={{ delay: 6000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        loop
        onSwiper={setSwiperRef}
        onSlideChange={(s) => setActiveIndex(s.realIndex)}
        className="w-full h-full"
      >
        {heroSlides.map((slide, i) => (
          <SwiperSlide key={i}>
            <div className="relative w-full h-full">
              <img
                src={slide.image}
                alt=""
                className="absolute inset-0 w-full h-full object-cover"
                loading={i === 0 ? 'eager' : 'lazy'}
              />
              <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Overlay Content — positioned on top of Swiper */}
      <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              <span className="inline-block text-secondary text-sm font-semibold tracking-[0.2em] uppercase mb-6">
                Ethiopian Orthodox Tewahedo Church
              </span>
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-6">
                {heroSlides[activeIndex].title}
              </h1>
              <p className="text-lg sm:text-xl text-gray-300 max-w-2xl mx-auto mb-10 leading-relaxed">
                {heroSlides[activeIndex].subtitle}
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pointer-events-auto">
                <Button href="/about" variant="primary" size="lg">
                  Explore Our Church
                </Button>
                <Button href="/sacraments" variant="outline" size="lg">
                  View Services
                </Button>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Nav Arrows */}
      <button
        onClick={handlePrev}
        className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-xs bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-all duration-300 cursor-pointer"
        aria-label="Previous slide"
      >
        <FiChevronLeft className="text-xl" />
      </button>
      <button
        onClick={handleNext}
        className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-xs bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-all duration-300 cursor-pointer"
        aria-label="Next slide"
      >
        <FiChevronRight className="text-xl" />
      </button>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
      >
        <motion.a
          href="#welcome"
          className="flex flex-col items-center gap-2 text-white/60 hover:text-white transition-colors duration-300"
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          aria-label="Scroll down"
        >
          <span className="text-xs tracking-widest uppercase">Scroll</span>
          <FiArrowDown className="text-lg" />
        </motion.a>
      </motion.div>

      <style>{`
        .swiper-pagination-bullet { width: 8px; height: 8px; background: rgba(255,255,255,0.5); opacity: 1; transition: all 0.3s; }
        .swiper-pagination-bullet-active { width: 32px; border-radius: 4px; background: #D4AF37; }
      `}</style>
    </section>
  );
}
