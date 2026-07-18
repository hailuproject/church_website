import { motion } from 'framer-motion';
import { scriptureData } from '../../../data/sacramentsData';

export default function ScriptureHighlight() {
  const { verse, reference, explanation, image } = scriptureData;

  return (
    <section className="relative py-28 md:py-36 overflow-hidden" aria-label="Scripture highlight">
      <div className="absolute inset-0">
        <img
          src={image}
          alt="Sacred Bible with candlelight"
          className="w-full h-full object-cover"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-stone-900/90 via-stone-900/75 to-stone-900/90" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-6 lg:px-8 text-center">
        <motion.div
          className="flex justify-center mb-8"
          initial={{ opacity: 0, scale: 0.85 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <svg
            width="56"
            height="56"
            viewBox="0 0 64 64"
            fill="none"
            className="text-secondary"
            aria-hidden="true"
          >
            <path
              d="M32 4V60M4 32H60"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              opacity="0.5"
            />
            <circle
              cx="32"
              cy="32"
              r="7"
              stroke="currentColor"
              strokeWidth="1.5"
              opacity="0.35"
            />
            <circle cx="32" cy="32" r="2.5" fill="currentColor" opacity="0.4" />
          </svg>
        </motion.div>

        <motion.blockquote
          className="mb-5"
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{
            duration: 0.7,
            delay: 0.15,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          <p className="text-2xl sm:text-3xl md:text-4xl text-white/95 font-bold leading-[1.3] italic">
            &ldquo;{verse}&rdquo;
          </p>
        </motion.blockquote>

        <motion.div
          className="flex items-center justify-center gap-4 mb-7"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <span className="h-px w-10 bg-secondary/40" />
          <cite className="text-secondary text-lg font-semibold not-italic">
            {reference}
          </cite>
          <span className="h-px w-10 bg-secondary/40" />
        </motion.div>

        <motion.p
          className="text-gray-300 text-sm md:text-base max-w-2xl mx-auto leading-relaxed"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          {explanation}
        </motion.p>
      </div>
    </section>
  );
}
