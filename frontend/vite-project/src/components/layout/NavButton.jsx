import { motion } from 'framer-motion';
import { FiPlay, FiUserPlus } from 'react-icons/fi';

export default function NavButton({ variant = 'primary', label, icon, href = '#' }) {
  const icons = {
    watch: FiPlay,
    join: FiUserPlus,
  };
  const Icon = icon ? icons[icon] || FiPlay : null;

  const base =
    'inline-flex items-center gap-2 rounded-xl font-medium transition-all duration-300 cursor-pointer text-sm';

  const variants = {
    primary:
      'bg-primary text-white hover:bg-primary-dark px-5 py-2.5 shadow-sm hover:shadow-md',
    secondary:
      'bg-secondary/10 text-secondary hover:bg-secondary/20 px-5 py-2.5',
    outline:
      'border border-border text-text hover:border-primary hover:text-primary px-5 py-2.5',
  };

  return (
    <motion.a
      href={href}
      className={`${base} ${variants[variant]}`}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      aria-label={label}
    >
      {Icon && <Icon className="text-sm" />}
      {label}
    </motion.a>
  );
}
