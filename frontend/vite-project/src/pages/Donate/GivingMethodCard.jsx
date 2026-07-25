import { motion } from 'framer-motion';
import {
  FiCreditCard,
  FiHome,
  FiSmartphone,
  FiDollarSign,
} from 'react-icons/fi';

const methodIcons = {
  card: FiCreditCard,
  bank: FiHome,
  mobile: FiSmartphone,
  cash: FiDollarSign,
  telebirr: FiSmartphone,
  chapa: FiSmartphone,
};

export default function GivingMethodCard({ method, index }) {
  const MethodIcon = methodIcons[method.icon] || FiCreditCard;

  return (
    <motion.div
      className="group bg-white rounded-xs p-6 border border-border hover:border-primary/20 transition-all duration-500 hover:shadow-lg"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{
        duration: 0.5,
        delay: index * 0.08,
        ease: [0.22, 1, 0.36, 1],
      }}
      whileHover={{ y: -4 }}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="w-12 h-12 rounded-xs bg-primary/10 flex items-center justify-center group-hover:bg-primary transition-colors duration-500">
          <MethodIcon className="w-5.5 h-5.5 text-primary group-hover:text-white transition-colors duration-500" />
        </div>
        <span className="text-[10px] font-bold text-green-600 bg-green-50 rounded-xs px-2 py-0.5 uppercase tracking-wider">
          {method.badge}
        </span>
      </div>

      <h3 className="text-base font-bold text-text mb-2 group-hover:text-primary transition-colors duration-300">
        {method.title}
      </h3>
      <p className="text-sm text-muted leading-relaxed">{method.description}</p>
    </motion.div>
  );
}
