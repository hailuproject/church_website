import { useState } from 'react';
import { cn } from '../../utils/helpers';

export const Tabs = ({ tabs, onChange, className }) => {
  const [active, setActive] = useState(tabs[0]?.key);

  const handleChange = (key) => {
    setActive(key);
    onChange?.(key);
  };

  return (
    <div
      className={cn(
        'inline-flex flex-wrap items-center gap-1 rounded-xl bg-gray-100 p-1 dark:bg-gray-800',
        className
      )}
      role="tablist"
    >
      {tabs.map((tab) => (
        <button
          key={tab.key}
          type="button"
          role="tab"
          aria-selected={active === tab.key}
          onClick={() => handleChange(tab.key)}
          className={cn(
            'rounded-lg px-3.5 py-1.5 text-sm font-medium transition-colors',
            active === tab.key
              ? 'bg-white text-gray-900 shadow-sm dark:bg-gray-700 dark:text-gray-100'
              : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200'
          )}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
};

export default Tabs;
