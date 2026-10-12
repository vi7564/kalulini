import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  hoverEffect?: boolean;
}

export const Card: React.FC<CardProps> = ({
  children,
  className = '',
  onClick,
  hoverEffect = false
}) => {
  return (
    <div
      onClick={onClick}
      className={`bg-white rounded-2xl border border-slate-200/90 shadow-sm overflow-hidden ${
        hoverEffect ? 'hover:shadow-md hover:border-aqua-400/80 transition-all duration-300' : ''
      } ${className}`}
    >
      {children}
    </div>
  );
};
