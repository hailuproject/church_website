import { cn } from '../../utils/helpers';

export const Switch = ({ checked, onChange, label, description, disabled }) => (
  <label
    className={cn(
      'flex items-start gap-3 rounded-lg border border-gray-200 p-3 transition-colors dark:border-gray-700',
      disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer hover:border-primary-300 dark:hover:border-primary-700'
    )}
  >
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      disabled={disabled}
      onClick={() => onChange?.(!checked)}
      className={cn(
        'relative mt-0.5 inline-flex h-6 w-11 shrink-0 items-center rounded-full transition-colors',
        checked ? 'bg-primary-500' : 'bg-gray-300 dark:bg-gray-600'
      )}
    >
      <span
        className={cn(
          'inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform',
          checked ? 'translate-x-6' : 'translate-x-1'
        )}
      />
    </button>
    <div>
      {label && <span className="block text-sm font-medium text-gray-800 dark:text-gray-200">{label}</span>}
      {description && <span className="mt-0.5 block text-xs text-gray-500 dark:text-gray-400">{description}</span>}
    </div>
  </label>
);

export default Switch;
