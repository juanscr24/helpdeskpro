import React from 'react';

interface BadgeProps {
  variant?: 'open' | 'in_progress' | 'resolved' | 'closed' | 'low' | 'medium' | 'high';
  children: React.ReactNode;
  className?: string;
}

export const Badge = ({ variant = 'open', children, className = '' }: BadgeProps) => {
  const variantStyles = {
    open: 'bg-purple-100 text-purple-800 border border-purple-200',
    in_progress: 'bg-gradient-to-r from-purple-100 to-pink-100 text-purple-900 border border-purple-300',
    resolved: 'bg-gradient-to-r from-green-100 to-emerald-100 text-green-800 border border-green-300',
    closed: 'bg-gray-100 text-gray-700 border border-gray-300',
    low: 'bg-blue-100 text-blue-800 border border-blue-200',
    medium: 'bg-gradient-to-r from-orange-100 to-amber-100 text-orange-800 border border-orange-300',
    high: 'bg-gradient-to-r from-red-100 to-pink-100 text-red-800 border border-red-300',
  };

  return (
    <span
      className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold backdrop-blur-sm shadow-sm ${variantStyles[variant]} ${className}`}
    >
      {children}
    </span>
  );
};
