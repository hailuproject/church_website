import { memo } from 'react';
import { motion } from 'framer-motion';
import { FiCalendar, FiUsers, FiHeart, FiStar, FiDroplet, FiMic } from 'react-icons/fi';
import Container from '../Container';
import SectionHeader from '../SectionHeader';
import CountUp from '../common/CountUp';
import { churchStats } from '../../data/homeData';

const iconMap = {
  years: FiCalendar,
  members: FiUsers,
  ministries: FiHeart,
  baptisms: FiDroplet,
  sermons: FiMic,
  events: FiStar,
};

const StatCard = memo(function StatCard({ stat, index }) {
  const Icon = iconMap[stat.icon] || FiStar;

  return (
    <motion.div
      className="text-center"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.08, duration: 0.6 }}
    >
      <div className="w-14 h-14 rounded-xs bg-white/10 flex items-center justify-center mx-auto mb-4">
        <Icon className="text-2xl text-secondary" />
      </div>
      <div className="text-4xl md:text-5xl font-bold text-white mb-2">
        <CountUp end={stat.value} suffix={stat.suffix} />
      </div>
      <p className="text-sm text-gray-300 font-medium">{stat.label}</p>
    </motion.div>
  );
});

export default function ChurchStats() {
  return (
    <section className="relative py-24 md:py-32 overflow-hidden" aria-label="Church statistics">
      <div className="absolute inset-0 bg-linear-to-br from-stone-900 via-primary-dark to-stone-900" />
      <img
        src="https://images.unsplash.com/photo-1548013146-72479768bada?w=1920&h=800&fit=crop"
        alt=""
        className="absolute inset-0 w-full h-full object-cover opacity-10"
        loading="lazy"
      />
      <div className="absolute inset-0 bg-black/50" />

      <Container className="relative z-10">
        <SectionHeader
          subtitle="Our Church"
          title="By the Numbers"
          light
        />
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
          {churchStats.map((stat, i) => (
            <StatCard key={stat.label} stat={stat} index={i} />
          ))}
        </div>
      </Container>
    </section>
  );
}
