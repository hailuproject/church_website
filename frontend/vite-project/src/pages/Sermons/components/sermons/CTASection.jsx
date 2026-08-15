import { motion } from 'framer-motion';
import { FiArrowRight, FiMapPin } from 'react-icons/fi';
import Button from '../../../../components/Button';
import { useTranslation } from '../../../../i18n/LanguageContext';

export default function CTASection() {
  const { t } = useTranslation();
  return (
    <section className="relative py-24 md:py-32 overflow-hidden" aria-label={t('common.callToAction')}>
      <div className="absolute inset-0 bg-gradient-to-br from-stone-900 via-primary-dark to-stone-900" />
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 opacity-[0.03] bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMSI+PHBhdGggZD0iTTM2IDM0djItSDI0di0yaDEyeiIvPjwvZz48L2c+PC9zdmc+')]" />
      </div>

      <div className="relative z-10 max-w-3xl mx-auto px-6 lg:px-8 text-center">
        <motion.h2
          className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-5"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          {t('pages.sermons.ctaTitle')}
        </motion.h2>

        <motion.p
          className="text-gray-300 text-lg max-w-xl mx-auto mb-8"
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          {t('pages.sermons.ctaDescription')}
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row items-center justify-center gap-3"
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Button href="/contact" variant="primary" size="lg">
            <FiMapPin className="text-lg" />
            {t('pages.sermons.visitChurch')}
          </Button>
          <Button href="/events" variant="outline" size="lg">
            {t('pages.sermons.viewEvents')}
            <FiArrowRight className="text-lg" />
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
