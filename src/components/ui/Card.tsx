import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
  hoverable?: boolean;
}

export const Card = ({
  children,
  className = '',
  onClick,
  hoverable = false,
}: CardProps) => {
  return (
    <div
      onClick={onClick}
      className={`border border-gray-200 rounded-lg p-6 shadow-sm transition-all duration-200 ${
        hoverable && onClick ? 'hover:shadow-md hover:border-gray-300 cursor-pointer' : ''
      } ${className}`}
    >
      {children}
    </div>
  );
};
