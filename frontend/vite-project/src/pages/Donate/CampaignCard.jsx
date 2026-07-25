import { motion } from 'framer-motion';
import { FiArrowRight, FiCalendar } from 'react-icons/fi';
import Container from '../../components/Container';
import Section from '../../components/Section';
import Button from '../../components/Button';
import { campaign } from '../../data/donationData';

export default function CampaignCard() {
  const progress = Math.round((campaign.raised / campaign.goal) * 100);

  return (
    <Section id="campaign" className="bg-white">
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
              src={campaign.image}
              alt={campaign.imageAlt}
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
                Current Campaign
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold text-text mt-4 leading-tight">
                {campaign.title}
              </h2>
            </div>

            <p className="text-muted text-base leading-[1.8]">
              {campaign.description}
            </p>

            <div className="bg-surface rounded-xs p-6 border border-border">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-bold text-text">
                  ${campaign.raised.toLocaleString()}
                </span>
                <span className="text-sm text-muted">
                  of ${campaign.goal.toLocaleString()}
                </span>
              </div>

              <div className="w-full h-3 bg-border rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-primary to-primary-dark rounded-full"
                  initial={{ width: 0 }}
                  whileInView={{ width: `${progress}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
                />
              </div>

              <div className="flex items-center justify-between mt-3">
                <span className="text-xs font-semibold text-secondary">{progress}% raised</span>
                <span className="text-xs text-muted">
                  ${(campaign.goal - campaign.raised).toLocaleString()} remaining
                </span>
              </div>

              <div className="flex items-center gap-2 mt-4 pt-4 border-t border-border">
                <FiCalendar className="w-4 h-4 text-primary" />
                <span className="text-sm font-semibold text-text">
                  {campaign.daysRemaining} days remaining
                </span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-start gap-4 mt-2">
              <Button href="#donate" variant="primary" size="md">
                Donate to Campaign
                <FiArrowRight className="text-lg" />
              </Button>
              <Button href="#" variant="outline-dark" size="md">
                Learn More
              </Button>
            </div>
          </motion.div>
        </div>
      </Container>
    </Section>
  );
}
