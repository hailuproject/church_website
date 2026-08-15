import { motion } from 'framer-motion';
import Container from '../../components/Container';
import { scriptureVerse } from '../../data/donationData';
import { useTranslation } from '../../i18n/LanguageContext';

export default function ScriptureSection() {
  const { t } = useTranslation();
  return (
    <section
      className="relative py-24 md:py-32 overflow-hidden"
      aria-label={t('pages.donate.scriptureLabel')}
    >
      <div className="absolute inset-0 bg-linear-to-br from-stone-900 via-primary-dark to-stone-900" />
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 opacity-5 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMSI+PHBhdGggZD0iTTM2IDM0djItSDI0di0yaDEyeiIvPjwvZz48L2c+PC9zdmc+')]" />
      </div>

      <Container className="relative z-10">
        <motion.div
          className="flex flex-col items-center text-center gap-8 max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Orthodox Cross */}
          <svg
            className="w-16 h-20 text-secondary"
            viewBox="0 0 64 80"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <rect x="28" y="0" width="8" height="80" fill="currentColor" rx="2" />
            <rect x="12" y="16" width="40" height="6" fill="currentColor" rx="2" />
            <rect x="18" y="56" width="28" height="6" fill="currentColor" rx="2" transform="rotate(-15 18 56)" />
          </svg>

          <blockquote className="text-xl sm:text-2xl md:text-3xl font-medium text-white leading-relaxed italic">
            &ldquo;{scriptureVerse.text}&rdquo;
          </blockquote>

          <div className="flex items-center gap-3">
            <div className="w-12 h-px bg-secondary/50" />
            <span className="text-secondary text-sm font-semibold tracking-wider">
              {scriptureVerse.reference}
            </span>
            <div className="w-12 h-px bg-secondary/50" />
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
