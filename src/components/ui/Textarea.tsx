import React from 'react';

interface TextareaProps {
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  label?: string;
  error?: string;
  required?: boolean;
  rows?: number;
  disabled?: boolean;
  className?: string;
  name?: string;
}

export const Textarea = ({
  placeholder,
  value,
  onChange,
  label,
  error,
  required = false,
  rows = 4,
  disabled = false,
  className = '',
  name,
}: TextareaProps) => {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {label}
          {required && <span className="text-red-600 ml-1">*</span>}
        </label>
      )}
      <textarea
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        disabled={disabled}
        rows={rows}
        className={`w-full px-4 py-2 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none transition-colors resize-vertical ${
          disabled ? 'bg-gray-100 cursor-not-allowed' : 'bg-white'
        } ${error ? 'border-red-500 focus:ring-red-200 focus:border-red-500' : ''} ${className}`}
      />
      {error && <p className="text-red-600 text-sm mt-1">{error}</p>}
    </div>
  );
};
