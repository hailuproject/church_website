import { motion } from 'framer-motion';
import { FiMapPin, FiPhone, FiMail, FiClock } from 'react-icons/fi';

const iconMap = {
  location: FiMapPin,
  phone: FiPhone,
  email: FiMail,
  clock: FiClock,
};

export default function ContactCard({ info, index }) {
  const IconComponent = iconMap[info.icon] || FiMapPin;

  return (
    <motion.div
      className="group bg-white rounded-xs p-6 border border-border hover:border-primary/20 transition-all duration-500 hover:shadow-lg"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{
        duration: 0.5,
        delay: index * 0.1,
        ease: [0.22, 1, 0.36, 1],
      }}
      whileHover={{ y: -4 }}
    >
      <div className="w-12 h-12 rounded-xs bg-primary/10 flex items-center justify-center mb-5 group-hover:bg-primary transition-colors duration-500">
        <IconComponent className="w-5.5 h-5.5 text-primary group-hover:text-white transition-colors duration-500" />
      </div>

      <h3 className="text-lg font-bold text-text mb-4 group-hover:text-primary transition-colors duration-300">
        {info.title}
      </h3>

      <div className="flex flex-col gap-3">
        {info.details.map((detail) => (
          <div key={detail.label} className="flex flex-col gap-0.5">
            <span className="text-xs font-semibold text-muted uppercase tracking-wider">
              {detail.label}
            </span>
            <span className="text-sm text-text">{detail.value}</span>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
