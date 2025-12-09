import React from 'react';

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  required?: boolean;
  rows?: number;
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, error, required = false, rows = 4, className = '', disabled = false, ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label className="block text-sm font-medium text-gray-900 mb-2">
            {label}
            {required && <span className="text-secondary-600 ml-1">*</span>}
          </label>
        )}
        <textarea
          ref={ref}
          disabled={disabled}
          rows={rows}
          className={`w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-primary-500 focus:ring-2 focus:ring-primary-100 focus:outline-none transition-all resize-vertical ${
            disabled ? 'bg-gray-100 cursor-not-allowed' : 'bg-white'
          } ${error ? 'border-red-500 focus:ring-red-200 focus:border-red-500' : ''} ${className}`}
          {...props}
        />
        {error && <p className="text-red-600 text-sm mt-1">{error}</p>}
      </div>
    );
  }
);

Textarea.displayName = 'Textarea';
