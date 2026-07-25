import { motion } from 'framer-motion';
import { FiHeart, FiUsers, FiStar, FiTool } from 'react-icons/fi';
import Container from '../../components/Container';
import Section from '../../components/Section';
import { whyGivingMatters } from '../../data/donationData';

const featureIcons = {
  ministries: FiHeart,
  outreach: FiUsers,
  youth: FiStar,
  maintenance: FiTool,
};

export default function WhyGivingMatters() {
  return (
    <Section id="why" className="bg-surface">
      <Container>
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <motion.div
            className="relative overflow-hidden rounded-xs shadow-lg group order-2 lg:order-1"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <img
              src={whyGivingMatters.image}
              alt={whyGivingMatters.imageAlt}
              className="w-full aspect-[4/3] object-cover group-hover:scale-105 transition-transform duration-700"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
          </motion.div>

          <motion.div
            className="flex flex-col gap-6 order-1 lg:order-2"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <div>
              <span className="text-xs font-semibold tracking-[0.2em] uppercase text-secondary">
                Why Give
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold text-text mt-4 leading-tight">
                {whyGivingMatters.title}
              </h2>
            </div>

            <p className="text-muted text-base leading-[1.8]">
              {whyGivingMatters.description}
            </p>

            <div className="grid grid-cols-2 gap-4 mt-2">
              {whyGivingMatters.features.map((feature, i) => {
                const FeatureIcon = featureIcons[feature.icon] || FiHeart;
                return (
                  <motion.div
                    key={feature.title}
                    className="bg-white rounded-xs p-5 border border-border"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: i * 0.1 }}
                  >
                    <FeatureIcon className="w-5 h-5 text-primary mb-3" />
                    <h4 className="text-sm font-bold text-text mb-1">{feature.title}</h4>
                    <p className="text-xs text-muted leading-relaxed">{feature.description}</p>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </Container>
    </Section>
  );
}
