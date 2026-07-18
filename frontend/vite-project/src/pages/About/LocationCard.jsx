import { motion } from 'framer-motion';
import { FiMapPin, FiPhone, FiMail } from 'react-icons/fi';

const iconMap = {
  location: FiMapPin,
  phone: FiPhone,
  email: FiMail,
};

export default function LocationCard({ contactInfo }) {
  return (
    <motion.div
      className="bg-white rounded-xs p-8 shadow-sm border border-border"
      initial={{ opacity: 0, x: 30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
    >
      <h3 className="text-2xl font-bold text-text mb-6">Get In Touch</h3>

      <div className="flex flex-col gap-5">
        {contactInfo.map((item) => {
          const Icon = iconMap[item.icon] || FiMapPin;
          return (
            <div key={item.label} className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xs bg-secondary/10 flex items-center justify-center shrink-0">
                <Icon className="text-secondary" />
              </div>
              <div>
                <p className="text-[11px] font-semibold tracking-wider uppercase text-muted mb-0.5">
                  {item.label}
                </p>
                <p className="text-text">{item.value}</p>
              </div>
            </div>
          );
        })}
      </div>
    </motion.div>
  );
}
