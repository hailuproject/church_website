import { useEffect, useState, useRef } from 'react';
import { useInView } from 'react-intersection-observer';
import { CountUp } from 'countup.js';
import { motion } from 'framer-motion';
import { FiClock, FiUsers, FiBookOpen, FiCalendar } from 'react-icons/fi';

const iconMap = {
  years: FiClock,
  members: FiUsers,
  priests: FiBookOpen,
  events: FiCalendar,
};

export default function CounterCard({ value, suffix, label, icon, delay = 0 }) {
  const [hasAnimated, setHasAnimated] = useState(false);
  const countRef = useRef(null);
  const { ref, inView } = useInView({ threshold: 0.3, triggerOnce: true });

  useEffect(() => {
    if (inView && !hasAnimated && countRef.current) {
      const countUp = new CountUp(countRef.current, value, {
        duration: 2.5,
        separator: ',',
        suffix: suffix,
      });
      if (!countUp.error) {
        countUp.start();
        setHasAnimated(true);
      }
    }
  }, [inView, hasAnimated, value, suffix]);

  const Icon = iconMap[icon] || FiClock;

  return (
    <motion.div
      ref={ref}
      className="flex flex-col items-center gap-3 p-6"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="w-12 h-12 rounded-xs bg-white/10 flex items-center justify-center mb-1">
        <Icon className="text-xl text-secondary" />
      </div>
      <span
        ref={countRef}
        className="text-4xl sm:text-5xl md:text-6xl font-bold text-white"
      >
        0
      </span>
      <span className="text-sm text-gray-300">{label}</span>
    </motion.div>
  );
}
