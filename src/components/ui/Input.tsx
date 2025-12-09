import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
    required?: boolean;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
    ({ label, error, required = false, className = '', disabled = false, ...props }, ref) => {
        return (
            <div className="w-full">
                {label && (
                    <label className="block text-sm font-medium text-gray-900 mb-2">
                        {label}
                        {required && <span className="text-secondary-600 ml-1">*</span>}
                    </label>
                )}
                <input
                    ref={ref}
                    disabled={disabled}
                    className={`w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-primary-500 focus:ring-2 focus:ring-primary-100 focus:outline-none transition-all ${disabled ? 'bg-gray-100 cursor-not-allowed' : 'bg-white'
                        } ${error ? 'border-red-500 focus:ring-red-200 focus:border-red-500' : ''} ${className}`}
                    {...props}
                />
                {error && <p className="text-red-600 text-sm mt-1 flex items-center gap-1">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    {error}
                </p>}
            </div>
        );
    }
);

