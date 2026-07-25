import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import Container from '../../components/Container';
import { statistics } from '../../data/homeData';

function StatItem({ stat, index }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const end = stat.value;
    const duration = 2000;
    const increment = end / (duration / 16);
    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [inView, stat.value]);

  return (
    <motion.div
      ref={ref}
      className="text-center"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.6 }}
    >
      <div className="text-4xl md:text-5xl font-bold text-white mb-2">
        {count}
        {stat.suffix}
      </div>
      <p className="text-sm text-gray-300 font-medium">{stat.label}</p>
    </motion.div>
  );
}

export default function Statistics() {
  return (
    <section
      className="relative py-24 md:py-32 overflow-hidden"
      aria-label="Church statistics"
    >
      <div className="absolute inset-0 bg-linear-to-br from-stone-900 via-primary-dark to-stone-900" />
      <img
        src="https://images.unsplash.com/photo-1548013146-72479768bada?w=1920&h=800&fit=crop"
        alt=""
        className="absolute inset-0 w-full h-full object-cover opacity-10"
        loading="lazy"
      />
      <div className="absolute inset-0 bg-black/50" />

      <Container className="relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
          {statistics.map((stat, i) => (
            <StatItem key={stat.label} stat={stat} index={i} />
          ))}
        </div>
      </Container>
    </section>
  );
}
