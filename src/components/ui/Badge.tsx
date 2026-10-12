import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'aqua' | 'gold' | 'charcoal' | 'emerald' | 'rose' | 'amber' | 'neutral';
  size?: 'sm' | 'md';
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'aqua',
  size = 'md',
  className = ''
}) => {
  const variantStyles = {
    aqua: 'bg-aqua-50 text-aqua-900 border-aqua-200',
    gold: 'bg-amber-50 text-amber-950 border-amber-300 font-bold',
    charcoal: 'bg-slate-900 text-slate-100 border-slate-700',
    emerald: 'bg-emerald-50 text-emerald-900 border-emerald-300',
    rose: 'bg-rose-50 text-rose-900 border-rose-300',
    amber: 'bg-amber-50 text-amber-950 border-amber-300',
    neutral: 'bg-slate-100 text-slate-800 border-slate-200'
  };

  const sizeStyles = {
    sm: 'text-[11px] px-2 py-0.5 font-medium',
    md: 'text-xs px-2.5 py-1 font-semibold'
  };

  return (
    <span
      className={`inline-flex items-center rounded-full border tracking-wide uppercase ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
    >
      {children}
    </span>
  );
};
