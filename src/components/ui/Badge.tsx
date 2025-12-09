import React from 'react';

interface BadgeProps {
  variant?: 'open' | 'in_progress' | 'resolved' | 'closed' | 'low' | 'medium' | 'high';
  children: React.ReactNode;
  className?: string;
}

export const Badge = ({ variant = 'open', children, className = '' }: BadgeProps) => {
  const variantStyles = {
    open: 'bg-primary-100 text-primary-800 border border-primary-200',
    in_progress: 'bg-secondary-100 text-secondary-800 border border-secondary-200',
    resolved: 'bg-green-100 text-green-800 border border-green-200',
    closed: 'bg-gray-100 text-gray-700 border border-gray-300',
    low: 'bg-blue-100 text-blue-800 border border-blue-200',
    medium: 'bg-accent-100 text-accent-800 border border-accent-200',
    high: 'bg-red-100 text-red-800 border border-red-200',
  };

  return (
    <span
      className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${variantStyles[variant]} ${className}`}
    >
      {children}
    </span>
  );
};
