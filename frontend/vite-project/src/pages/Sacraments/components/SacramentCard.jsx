import { motion } from 'framer-motion';
import { FiArrowRight } from 'react-icons/fi';
import Button from '../../../components/Button';

export default function SacramentCard({ sacrament, index }) {
  const Icon = sacrament.icon;

  return (
    <motion.div
      className="group relative bg-white rounded-xs border border-border overflow-hidden shadow-sm hover:shadow-lg transition-all duration-500"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{
        duration: 0.6,
        delay: index * 0.08,
        ease: [0.22, 1, 0.36, 1],
      }}
      whileHover={{ y: -4 }}
    >
      <div className="relative overflow-hidden aspect-[3/2]">
        <img
          src={sacrament.image}
          alt={sacrament.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
        <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm rounded-xs p-3 shadow-sm">
          <Icon className="text-primary text-xl" aria-hidden="true" />
        </div>
      </div>

      <div className="p-6 flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-bold text-text">{sacrament.name}</h3>
          <span className="text-xs font-semibold text-secondary tracking-wider">
            {sacrament.amharic}
          </span>
        </div>
        <p className="text-muted text-sm leading-relaxed">{sacrament.description}</p>
        <div className="pt-2">
          <Button href={`/sacraments#${sacrament.id}`} variant="outline-dark" size="sm">
            Learn More
            <FiArrowRight className="text-sm" />
          </Button>
        </div>
      </div>
    </motion.div>
  );
}
