import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiGift, FiHeart, FiDollarSign, FiTarget, FiClock, FiBookOpen, FiFlag } from 'react-icons/fi';

const optionIcons = {
  offering: FiGift,
  tithe: FiDollarSign,
  building: FiTarget,
  mission: FiFlag,
  memorial: FiBookOpen,
  campaign: FiClock,
};

export default function GivingCard({ option, index }) {
  const [selectedAmount, setSelectedAmount] = useState(null);
  const OptionIcon = optionIcons[option.icon] || FiGift;

  return (
    <motion.div
      className="group bg-white rounded-xs p-6 border border-border hover:border-primary/20 transition-all duration-500 hover:shadow-lg flex flex-col"
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
      <div className="w-12 h-12 rounded-xs bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary transition-colors duration-500">
        <OptionIcon className="w-5.5 h-5.5 text-primary group-hover:text-white transition-colors duration-500" />
      </div>

      <h3 className="text-lg font-bold text-text mb-2 group-hover:text-primary transition-colors duration-300">
        {option.title}
      </h3>
      <p className="text-sm text-muted leading-relaxed mb-5 flex-1">
        {option.description}
      </p>

      <div className="flex flex-wrap gap-2 mb-5">
        {option.suggestedAmounts.map((amount) => (
          <button
            key={amount}
            onClick={() => setSelectedAmount(amount)}
            className={`px-3.5 py-1.5 rounded-xs text-xs font-semibold transition-all duration-300 cursor-pointer ${
              selectedAmount === amount
                ? 'bg-primary text-white'
                : 'bg-surface text-muted border border-border hover:border-primary/30 hover:text-primary'
            }`}
          >
            ${amount}
          </button>
        ))}
      </div>

      <a
        href="#donate"
        className="inline-flex items-center justify-center gap-2 bg-primary text-white px-6 py-3 rounded-xs font-medium text-sm hover:bg-primary-dark shadow-md hover:shadow-lg transition-all duration-300"
      >
        <FiHeart className="text-sm" />
        Donate
      </a>
    </motion.div>
  );
}
