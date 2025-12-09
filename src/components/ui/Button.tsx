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
    'font-semibold rounded-lg transition-colors duration-200 flex items-center justify-center gap-2';

  const variantStyles = {
    primary: 'bg-blue-600 hover:bg-blue-700 text-white disabled:bg-blue-400',
    secondary: 'bg-gray-300 hover:bg-gray-400 text-gray-800 disabled:bg-gray-200',
    ghost: 'bg-transparent hover:bg-gray-100 text-gray-700 border border-gray-300',
    danger: 'bg-red-600 hover:bg-red-700 text-white disabled:bg-red-400',
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
