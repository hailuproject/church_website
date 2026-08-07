import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { cn } from '../../utils/helpers';

export const Dropdown = ({ trigger, children, align = 'right', width = 'w-56', className }) => {
  const [open, setOpen] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    const onClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setOpen(false);
      }
    };
    const onKeyDown = (e) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('mousedown', onClickOutside);
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('mousedown', onClickOutside);
      document.removeEventListener('keydown', onKeyDown);
    };
  }, []);

  const rect = containerRef.current?.getBoundingClientRect();
  const style = rect
    ? {
        top: Math.min(rect.bottom + 6, window.innerHeight - 12),
        left:
          align === 'right'
            ? Math.max(12, rect.right - 224)
            : Math.min(rect.left, window.innerWidth - 236),
      }
    : {};

  return (
    <div ref={containerRef} className="relative inline-block">
      <div onClick={() => setOpen((prev) => !prev)} className="cursor-pointer">
        {trigger}
      </div>
      {createPortal(
        <AnimatePresence>
          {open && (
            <motion.div
              className={cn('fixed z-50 overflow-hidden rounded-xl border border-gray-200 bg-white py-1 shadow-lg dark:border-gray-700 dark:bg-gray-800', width, className)}
              style={style}
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.15 }}
              onClick={() => setOpen(false)}
            >
              {children}
            </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </div>
  );
};

export const DropdownItem = ({ icon: Icon, children, onClick, danger, className }) => (
  <button
    type="button"
    onClick={onClick}
    className={cn(
      'flex w-full items-center gap-2.5 px-4 py-2 text-left text-sm transition-colors',
      danger
        ? 'text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-500/10'
        : 'text-gray-700 hover:bg-gray-50 dark:text-gray-200 dark:hover:bg-gray-700/60',
      className
    )}
  >
    {Icon && <Icon className="h-4 w-4 shrink-0" />}
    {children}
  </button>
);

export const DropdownHeader = ({ children }) => (
  <div className="border-b border-gray-100 px-4 py-2.5 dark:border-gray-700">{children}</div>
);

export const DropdownDivider = () => <div className="my-1 border-t border-gray-100 dark:border-gray-700" />;

export const SelectButton = ({ value, placeholder = 'Select', className }) => (
  <span
    className={cn(
      'inline-flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-700 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-200',
      className
    )}
  >
    <span className={value ? '' : 'text-gray-400'}>{value || placeholder}</span>
    <ChevronDown className="h-4 w-4 text-gray-400" />
  </span>
);

export default Dropdown;
