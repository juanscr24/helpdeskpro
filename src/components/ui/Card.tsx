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
      className={`bg-white border border-gray-200 rounded-xl p-6 shadow-md transition-all duration-200 ${
        hoverable && onClick ? 'hover:shadow-lg hover:border-primary-300 cursor-pointer' : ''
      } ${className}`}
    >
      {children}
    </div>
  );
};
