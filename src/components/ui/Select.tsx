import React from 'react';

interface SelectOption {
  value: string | number;
  label: string;
}

interface SelectProps extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, 'onChange'> {
  options: SelectOption[];
  label?: string;
  error?: string;
  required?: boolean;
  placeholder?: string;
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ options, label, error, required = false, placeholder, className = '', disabled = false, ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label className="block text-sm font-medium text-gray-900 mb-2">
            {label}
            {required && <span className="text-secondary-600 ml-1">*</span>}
          </label>
        )}
        <select
          ref={ref}
          disabled={disabled}
          className={`w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-primary-500 focus:ring-2 focus:ring-primary-100 focus:outline-none transition-all ${
            disabled ? 'bg-gray-100 cursor-not-allowed' : 'bg-white'
          } ${error ? 'border-red-500 focus:ring-red-200 focus:border-red-500' : ''} ${className}`}
          {...props}
        >
          {placeholder && (
            <option value="">
              {placeholder}
            </option>
          )}
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        {error && <p className="text-red-600 text-sm mt-1">{error}</p>}
      </div>
    );
  }
);

Select.displayName = 'Select';
