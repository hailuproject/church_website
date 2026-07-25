import { motion } from 'framer-motion';
import {
  FiDroplet, FiBookOpen, FiHeart, FiHome,
  FiUsers, FiSunrise, FiStar,
} from 'react-icons/fi';
import Container from '../../components/Container';
import Section from '../../components/Section';
import SectionHeader from '../../components/SectionHeader';
import Button from '../../components/Button';
import { sacraments } from '../../data/homeData';

const iconMap = {
  FiDroplet,
  FiBookOpen,
  FiHeart,
  FiHome,
  FiUsers,
  FiSunrise,
  FiStar,
};

function SacramentCard({ sacrament, index }) {
  const Icon = iconMap[sacrament.icon] || FiStar;

  return (
    <motion.div
      className="group bg-white rounded-xs p-6 border border-border shadow-sm hover:shadow-lg transition-all duration-500 text-center"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.6, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -6 }}
    >
      <div className="w-12 h-12 rounded-xs bg-secondary/10 group-hover:bg-secondary/20 flex items-center justify-center mx-auto mb-4 transition-colors duration-300">
        <Icon className="text-xl text-secondary" />
      </div>
      <h3 className="text-base font-bold text-text mb-1 group-hover:text-primary transition-colors duration-300">
        {sacrament.title}
      </h3>
      <p className="text-xs text-secondary font-medium mb-3">{sacrament.amharic}</p>
      <p className="text-sm text-muted leading-relaxed">{sacrament.description}</p>
    </motion.div>
  );
}

export default function SacramentsOverview() {
  return (
    <Section id="sacraments" className="bg-white">
      <Container>
        <SectionHeader
          subtitle="Holy Mysteries"
          title="Sacraments Overview"
          description="The seven sacred mysteries through which God bestows His grace upon the faithful."
        />
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {sacraments.slice(0, 4).map((s, i) => (
            <SacramentCard key={s.id} sacrament={s} index={i} />
          ))}
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6 max-w-4xl mx-auto">
          {sacraments.slice(4).map((s, i) => (
            <SacramentCard key={s.id} sacrament={s} index={i + 4} />
          ))}
        </div>
        <div className="text-center mt-12">
          <Button href="/sacraments" variant="outline-dark">
            Learn About Sacraments
          </Button>
        </div>
      </Container>
    </Section>
  );
}
