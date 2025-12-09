import React from 'react';

interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  children: React.ReactNode;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
}

export const Button = ({
  variant = 'primary',
  size = 'md',
  disabled = false,
  onClick,
  children,
  className = '',
  type = 'button',
}: ButtonProps) => {
  const baseStyles =
    'font-semibold rounded-lg transition-all duration-200 flex items-center justify-center gap-2';

  const variantStyles = {
    primary: 'bg-primary-900 hover:bg-primary-800 text-white disabled:opacity-50 shadow-sm',
    secondary: 'bg-white hover:bg-gray-50 text-primary-900 disabled:bg-gray-200 border border-gray-300',
    ghost: 'bg-transparent hover:bg-gray-100 text-primary-900 border border-gray-300 hover:border-primary-300',
    danger: 'bg-red-600 hover:bg-red-700 text-white disabled:opacity-50 shadow-sm',
  };

  const sizeStyles = {
    sm: 'px-3 py-1 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
  };

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${disabled ? 'cursor-not-allowed' : 'cursor-pointer'} ${className}`}
    >
      {children}
    </button>
  );
};
