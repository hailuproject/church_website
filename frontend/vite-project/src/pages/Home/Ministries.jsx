import { motion } from 'framer-motion';
import {
  FiUsers, FiBookOpen, FiMusic, FiHeart,
  FiCoffee, FiStar,
} from 'react-icons/fi';
import Container from '../../components/Container';
import Section from '../../components/Section';
import SectionHeader from '../../components/SectionHeader';
import { ministries } from '../../data/homeData';

const iconMap = {
  FiUsers,
  FiBookOpen,
  FiMusic,
  FiHeart,
  FiCoffee,
  FiStar,
};

function MinistryCard({ ministry, index }) {
  const Icon = iconMap[ministry.icon] || FiHeart;

  return (
    <motion.div
      className="group bg-white rounded-xs p-8 border border-border shadow-sm hover:shadow-lg transition-all duration-500"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -6 }}
    >
      <div className="w-14 h-14 rounded-xs bg-primary/10 group-hover:bg-primary/20 flex items-center justify-center mb-6 transition-colors duration-300">
        <Icon className="text-2xl text-primary" />
      </div>
      <h3 className="text-lg font-bold text-text mb-3 group-hover:text-primary transition-colors duration-300">
        {ministry.title}
      </h3>
      <p className="text-sm text-muted leading-relaxed">{ministry.description}</p>
    </motion.div>
  );
}

export default function Ministries() {
  return (
    <Section id="ministries" className="bg-surface">
      <Container>
        <SectionHeader
          subtitle="Get Involved"
          title="Our Ministries"
          description="Discover the many ways to grow in faith and serve our community."
        />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {ministries.map((ministry, i) => (
            <MinistryCard key={ministry.id} ministry={ministry} index={i} />
          ))}
        </div>
      </Container>
    </Section>
  );
}
