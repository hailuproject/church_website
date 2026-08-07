import { forwardRef, useId } from 'react';
import { cn } from '../../utils/helpers';

const baseFieldClasses =
  'block w-full rounded-lg border-0 bg-white px-3 py-2 text-sm text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-500 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500 dark:bg-gray-800 dark:text-gray-100 dark:ring-gray-600 dark:placeholder:text-gray-500 dark:disabled:bg-gray-900';

const getFieldClass = (error) =>
  cn(
    baseFieldClasses,
    error
      ? 'ring-red-500 focus:ring-red-500'
      : 'dark:focus:ring-primary-500'
  );

const Label = ({ id, label, required, hint }) => {
  if (!label && !hint) return null;
  return (
    <div className="mb-1.5 flex items-baseline justify-between gap-2">
      {label && (
        <label htmlFor={id} className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          {label}
          {required && <span className="ml-0.5 text-red-500">*</span>}
        </label>
      )}
      {hint && <span className="text-xs text-gray-400">{hint}</span>}
    </div>
  );
};

const ErrorMessage = ({ error }) =>
  error ? <p className="mt-1 text-xs text-red-500">{error}</p> : null;

export const FieldWrapper = ({ label, required, hint, error, children, id }) => (
  <div>
    <Label id={id} label={label} required={required} hint={hint} />
    {children}
    <ErrorMessage error={error} />
  </div>
);

export const Input = forwardRef(
  ({ label, required, hint, error, className, id, ...props }, ref) => {
    const autoId = useId();
    const fieldId = id || autoId;
    return (
      <FieldWrapper id={fieldId} label={label} required={required} hint={hint} error={error}>
        <input
          ref={ref}
          id={fieldId}
          aria-invalid={Boolean(error)}
          className={cn(getFieldClass(error), className)}
          {...props}
        />
      </FieldWrapper>
    );
  }
);
Input.displayName = 'Input';

export const Textarea = forwardRef(
  ({ label, required, hint, error, className, id, rows = 4, ...props }, ref) => {
    const autoId = useId();
    const fieldId = id || autoId;
    return (
      <FieldWrapper id={fieldId} label={label} required={required} hint={hint} error={error}>
        <textarea
          ref={ref}
          id={fieldId}
          rows={rows}
          aria-invalid={Boolean(error)}
          className={cn(getFieldClass(error), 'resize-y', className)}
          {...props}
        />
      </FieldWrapper>
    );
  }
);
Textarea.displayName = 'Textarea';

export const Select = forwardRef(
  ({ label, required, hint, error, className, id, children, ...props }, ref) => {
    const autoId = useId();
    const fieldId = id || autoId;
    return (
      <FieldWrapper id={fieldId} label={label} required={required} hint={hint} error={error}>
        <select
          ref={ref}
          id={fieldId}
          aria-invalid={Boolean(error)}
          className={cn(getFieldClass(error), 'appearance-none bg-[length:1.2rem] pr-9', className)}
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='m6 8 4 4 4-4'/%3e%3c/svg%3e\")",
            backgroundPosition: 'right 0.5rem center',
            backgroundRepeat: 'no-repeat',
          }}
          {...props}
        >
          {children}
        </select>
      </FieldWrapper>
    );
  }
);
Select.displayName = 'Select';

export const InputGroup = forwardRef(
  ({ label, required, hint, error, className, id, children, ...props }, ref) => {
    const autoId = useId();
    const fieldId = id || autoId;
    return (
      <FieldWrapper id={fieldId} label={label} required={required} hint={hint} error={error}>
        <div className="flex items-stretch overflow-hidden rounded-lg shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-primary-500 dark:ring-gray-600">
          <input
            ref={ref}
            id={fieldId}
            className={cn('w-full border-0 bg-transparent px-3 py-2 text-sm outline-none', className)}
            {...props}
          />
          {children}
        </div>
      </FieldWrapper>
    );
  }
);
InputGroup.displayName = 'InputGroup';
