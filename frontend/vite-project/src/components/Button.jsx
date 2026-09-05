import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const MotionLink = motion(Link);

const hoverProps = { whileHover: { scale: 1.03 }, whileTap: { scale: 0.97 } };

export default function Button({
  children,
  href,
  variant = 'primary',
  size = 'md',
  type = 'button',
  disabled = false,
  onClick,
  className = '',
  ariaLabel,
  target,
  rel,
  ...rest
}) {
  const base =
    'inline-flex items-center justify-center gap-2.5 rounded-xs font-medium transition-all duration-300 cursor-pointer';

  const variants = {
    primary: 'bg-primary text-white hover:bg-primary-dark shadow-lg hover:shadow-xl',
    secondary: 'bg-secondary text-white hover:bg-secondary-dark shadow-lg hover:shadow-xl',
    outline: 'border-2 border-white/40 text-white bg-white/10 backdrop-blur-sm hover:bg-white/20 hover:border-white/60',
    'outline-dark': 'border-2 border-primary/30 text-primary hover:bg-primary hover:text-white',
  };

  const sizes = {
    sm: 'px-5 py-2.5 text-sm',
    md: 'px-7 py-3.5 text-base',
    lg: 'px-9 py-4 text-lg',
  };

  const classes =
    `${base} ${variants[variant]} ${sizes[size]} ${className}` +
    (disabled ? ' opacity-50 pointer-events-none cursor-not-allowed' : '');

  const isInternal = Boolean(href && href.startsWith('/') && !href.startsWith('//') && !href.startsWith('#'));

  const commonProps = {
    onClick,
    'aria-label': ariaLabel,
    ...rest,
  };

  if (href && isInternal) {
    return (
      <MotionLink to={href} className={classes} aria-disabled={disabled} {...commonProps} {...hoverProps}>
        {children}
      </MotionLink>
    );
  }

  if (href) {
    return (
      <motion.a
        href={href}
        className={classes}
        target={target}
        rel={rel}
        aria-disabled={disabled}
        {...commonProps}
        {...hoverProps}
      >
        {children}
      </motion.a>
    );
  }

  return (
    <motion.button
      type={type}
      disabled={disabled}
      className={classes}
      {...commonProps}
      {...hoverProps}
    >
      {children}
    </motion.button>
  );
}