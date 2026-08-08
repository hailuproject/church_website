import { cn } from '../../utils/helpers';

const ALL_LABEL = 'All';

export const FilterSelect = ({ label, value, onChange, options, allLabel = ALL_LABEL, className, placeholder }) => {
  const handleChange = (e) => {
    const val = e.target.value;
    onChange?.(val === '' ? undefined : val);
  };

  return (
    <div className={cn('min-w-40', className)}>
      <select
        value={value || ''}
        onChange={handleChange}
        aria-label={label}
        className="w-full appearance-none rounded-lg border-0 bg-white py-2 pl-3 pr-8 text-sm text-gray-700 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-primary-500 dark:bg-gray-800 dark:text-gray-200 dark:ring-gray-600"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='m6 8 4 4 4-4'/%3e%3c/svg%3e\")",
          backgroundPosition: 'right 0.5rem center',
          backgroundRepeat: 'no-repeat',
          backgroundSize: '1.2rem',
        }}
      >
        <option value="">{placeholder || `${label}: ${allLabel}`}</option>
        {options.map((option) => (
          <option key={option.value ?? option} value={option.value ?? option}>
            {option.label ?? option}
          </option>
        ))}
      </select>
    </div>
  );
};

export const FilterBar = ({ children, className }) => (
  <div className={cn('flex flex-wrap items-center gap-2.5', className)}>{children}</div>
);

export default FilterSelect;
