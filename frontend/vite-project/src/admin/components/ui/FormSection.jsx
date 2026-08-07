import { ChevronDown, ChevronUp, Languages } from 'lucide-react';
import { useState } from 'react';
import { cn } from '../../utils/helpers';

export const LanguageToggle = ({ activeLang, onToggle }) => (
  <div className="inline-flex items-center gap-1 rounded-lg bg-gray-100 p-0.5 dark:bg-gray-700">
    <Languages className="ml-1.5 h-3.5 w-3.5 text-gray-400" />
    {['English', 'Amharic'].map((lang) => (
      <button
        key={lang}
        type="button"
        onClick={() => onToggle?.(lang)}
        className={cn(
          'rounded-md px-2.5 py-1 text-xs font-medium transition-colors',
          activeLang === lang
            ? 'bg-white text-gray-900 shadow-sm dark:bg-gray-600 dark:text-white'
            : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200'
        )}
      >
        {lang}
      </button>
    ))}
  </div>
);

export const FormSection = ({ title, description, children, collapsible = false, defaultOpen = true }) => {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className="rounded-xl border border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-800">
      <div
        className={cn('flex items-center justify-between px-5 py-4', collapsible && 'cursor-pointer')}
        onClick={collapsible ? () => setOpen((o) => !o) : undefined}
      >
        <div>
          <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100">{title}</h3>
          {description && <p className="mt-0.5 text-xs text-gray-500 dark:text-gray-400">{description}</p>}
        </div>
        {collapsible &&
          (open ? <ChevronUp className="h-4 w-4 text-gray-400" /> : <ChevronDown className="h-4 w-4 text-gray-400" />)}
      </div>
      {open && <div className="border-t border-gray-100 px-5 py-5 dark:border-gray-700">{children}</div>}
    </div>
  );
};

export default LanguageToggle;
