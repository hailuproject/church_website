import { motion } from 'framer-motion';
import { FiMail } from 'react-icons/fi';

export default function LeaderCard({ name, role, bio, image, delay = 0 }) {
  const initials = name
    .split(' ')
    .map((w) => w[0])
    .slice(0, 2)
    .join('');

  return (
    <motion.div
      className="group relative bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl border border-border transition-all duration-500"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -6 }}
    >
      {/* Photo */}
      <div className="relative h-56 overflow-hidden bg-gradient-to-br from-surface to-gray-200">
        {image ? (
          <img
            src={image}
            alt={`Portrait of ${name}`}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <span className="text-5xl font-bold text-primary/15">
              {initials}
            </span>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </div>

      {/* Info */}
      <div className="p-6">
        <span className="text-[11px] font-semibold tracking-[0.15em] uppercase text-secondary">
          {role}
        </span>
        <h3 className="text-xl font-bold text-text mt-1 mb-3">{name}</h3>
        <p className="text-sm text-muted leading-relaxed mb-4">{bio}</p>
        <a
          href={`mailto:info@ethiopianorthodox.org`}
          className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:text-primary-dark transition-colors duration-300"
          aria-label={`Contact ${name}`}
        >
          <FiMail className="text-base" />
          Contact
        </a>
      </div>
    </motion.div>
  );
}
