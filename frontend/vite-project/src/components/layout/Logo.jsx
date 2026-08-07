import { motion } from 'framer-motion';
import { useChurch } from '../../hooks/useHomeSections';

export default function Logo({ collapsed = false }) {
  const church = useChurch();
  return (
    <motion.a
      href="/"
      className="flex items-center gap-3 shrink-0"
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      aria-label={`${church.name} - Home`}
    >
      {/* Logo icon or cross */}
      {church.logo ? (
        <img
          src={church.logo}
          alt=""
          className="w-9 h-9 object-contain"
        />
      ) : (
        <div className="relative flex items-center justify-center w-9 h-9 rounded-xs bg-primary text-white shadow-md">
          <span className="text-xl leading-none font-bold">☦</span>
          <div className="absolute inset-0 rounded-xs bg-primary/20 blur-sm" />
        </div>
      )}

      {/* Text */}
      {!collapsed && (
        <div className="flex flex-col leading-none">
          <span className="text-xs font-bold text-text tracking-tight">
            {church.name}
          </span>
          <span className="text-[10px] font-medium text-secondary tracking-wide">
            {church.tagline}
          </span>
        </div>
      )}
    </motion.a>
  );
}
