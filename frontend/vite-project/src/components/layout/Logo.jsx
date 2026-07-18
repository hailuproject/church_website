import { motion } from 'framer-motion';

export default function Logo({ collapsed = false }) {
  return (
    <motion.a
      href="/"
      className="flex items-center gap-3 shrink-0"
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      aria-label="Ethiopian Orthodox Tewahedo Church - Home"
    >
      {/* Cross icon */}
      <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-primary text-white shadow-md">
        <span className="text-2xl leading-none font-bold">☦</span>
        <div className="absolute inset-0 rounded-xl bg-primary/20 blur-sm" />
      </div>

      {/* Text */}
      {!collapsed && (
        <div className="flex flex-col leading-none">
          <span className="text-sm font-bold text-text tracking-tight">
            Ethiopian Orthodox
          </span>
          <span className="text-[11px] font-medium text-secondary tracking-wide">
            Tewahedo Church
          </span>
        </div>
      )}
    </motion.a>
  );
}
