import { motion } from 'framer-motion';
import { FiRadio } from 'react-icons/fi';
import Container from '../Container';
import Section from '../Section';
import SectionHeader from '../SectionHeader';
import { useHomeFlags } from '../../hooks/useHomeSections';

export default function LiveStreamSection() {
  const { showLiveStream, liveStreamURL } = useHomeFlags();

  if (!showLiveStream || !liveStreamURL) return null;

  return (
    <Section id="live-stream" className="bg-stone-900 text-white">
      <Container>
        <SectionHeader
          subtitle="Live Stream"
          title="Worship With Us Online"
          description="Join our live liturgical services from anywhere in the world."
          light
        />
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto"
        >
          <div className="relative aspect-video rounded-xs overflow-hidden shadow-2xl ring-1 ring-white/10">
            <iframe
              src={liveStreamURL}
              title="Church Live Stream"
              className="absolute inset-0 w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              loading="lazy"
            />
          </div>
          <div className="mt-6 flex items-center justify-center gap-2 text-secondary">
            <FiRadio />
            <span className="text-sm font-medium tracking-wide uppercase">
              Live Now
            </span>
          </div>
        </motion.div>
      </Container>
    </Section>
  );
}
