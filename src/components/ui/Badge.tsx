import React from 'react';

interface BadgeProps {
  variant?: 'open' | 'in_progress' | 'resolved' | 'closed' | 'low' | 'medium' | 'high';
  children: React.ReactNode;
  className?: string;
}

export const Badge = ({ variant = 'open', children, className = '' }: BadgeProps) => {
  const variantStyles = {
    open: 'bg-blue-100 text-blue-800',
    in_progress: 'bg-yellow-100 text-yellow-800',
    resolved: 'bg-green-100 text-green-800',
    closed: 'bg-gray-100 text-gray-800',
    low: 'bg-blue-100 text-blue-800',
    medium: 'bg-orange-100 text-orange-800',
    high: 'bg-red-100 text-red-800',
  };

  return (
    <span
      className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${variantStyles[variant]} ${className}`}
    >
      {children}
    </span>
  );
};
