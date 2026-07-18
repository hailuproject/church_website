import { motion } from 'framer-motion';
import { FiArrowRight, FiPhone } from 'react-icons/fi';
import Button from '../../../components/Button';

export default function CTASection() {
  return (
    <section className="relative py-24 md:py-32 overflow-hidden" aria-label="Call to action">
      <div className="absolute inset-0 bg-gradient-to-br from-stone-900 via-primary-dark to-stone-900" />
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 opacity-[0.03] bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMSI+PHBhdGggZD0iTTM2IDM0djItSDI0di0yaDEyeiIvPjwvZz48L2c+PC9zdmc+')]" />
      </div>

      <motion.div
        className="absolute top-10 right-[15%] w-72 h-72 rounded-full bg-secondary/10 blur-3xl"
        animate={{ y: [0, -18, 0], scale: [1, 1.05, 1] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      />

      <div className="relative z-10 max-w-3xl mx-auto px-6 lg:px-8 text-center">
        <motion.h2
          className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-5"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          Need Spiritual Guidance?
        </motion.h2>

        <motion.p
          className="text-gray-300 text-lg max-w-xl mx-auto mb-8"
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          Our priests are here to guide you through the Holy Sacraments and
          support you on your spiritual journey.
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row items-center justify-center gap-3"
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Button href="/contact" variant="primary" size="lg">
            <FiPhone className="text-lg" />
            Contact a Priest
          </Button>
          <Button href="/about#location" variant="outline" size="lg">
            Visit Our Church
            <FiArrowRight className="text-lg" />
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
