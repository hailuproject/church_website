import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { FiCalendar, FiUsers, FiHeart, FiStar } from 'react-icons/fi';
import Container from '../../components/Container';
import Section from '../../components/Section';
import SectionHeader from '../../components/SectionHeader';
import { highlights } from '../../data/homeData';

const iconMap = {
  years: FiCalendar,
  members: FiUsers,
  ministries: FiHeart,
  feast: FiStar,
};

function HighlightCard({ item, index }) {
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
    const end = item.value;
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
  }, [inView, item.value]);

  const Icon = iconMap[item.icon] || FiStar;

  return (
    <motion.div
      ref={ref}
      className="group bg-white rounded-xs p-8 border border-border shadow-sm hover:shadow-lg transition-all duration-500 text-center"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -6 }}
    >
      <div className="w-14 h-14 rounded-xs bg-primary/10 group-hover:bg-primary/20 flex items-center justify-center mx-auto mb-6 transition-colors duration-300">
        <Icon className="text-2xl text-primary" />
      </div>
      <div className="text-4xl md:text-5xl font-bold text-primary mb-2">
        {count}
        {item.suffix}
      </div>
      <h3 className="text-lg font-bold text-text mb-2">{item.title}</h3>
      <p className="text-sm text-muted leading-relaxed">{item.description}</p>
    </motion.div>
  );
}

export default function Highlights() {
  return (
    <Section id="highlights" className="bg-surface">
      <Container>
        <SectionHeader
          subtitle="Our Church"
          title="Church Highlights"
          description="A glimpse into the vibrant life and enduring legacy of our faith community."
        />
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {highlights.map((item, i) => (
            <HighlightCard key={item.title} item={item} index={i} />
          ))}
        </div>
      </Container>
    </Section>
  );
}
