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
      className={`bg-white border border-purple-100 rounded-xl p-6 shadow-lg transition-all duration-200 backdrop-blur-sm ${
        hoverable && onClick ? 'hover:shadow-2xl hover:border-purple-300 cursor-pointer hover:-translate-y-1 hover:scale-[1.02]' : ''
      } ${className}`}
    >
      {children}
    </div>
  );
};
