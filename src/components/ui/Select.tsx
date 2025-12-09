import React from 'react';

interface SelectOption {
  value: string | number;
  label: string;
}

interface SelectProps {
  options: SelectOption[];
  value?: string | number;
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  label?: string;
  error?: string;
  required?: boolean;
  disabled?: boolean;
  className?: string;
  name?: string;
  placeholder?: string;
}

export const Select = ({
  options,
  value,
  onChange,
  label,
  error,
  required = false,
  disabled = false,
  className = '',
  name,
  placeholder,
}: SelectProps) => {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {label}
          {required && <span className="text-red-600 ml-1">*</span>}
        </label>
      )}
      <select
        name={name}
        value={value}
        onChange={onChange}
        disabled={disabled}
        className={`w-full px-4 py-2 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none transition-colors ${
          disabled ? 'bg-gray-100 cursor-not-allowed' : 'bg-white'
        } ${error ? 'border-red-500 focus:ring-red-200 focus:border-red-500' : ''} ${className}`}
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
};
