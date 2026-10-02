import * as React from 'react';
import { cn } from '@/lib/utils';

export interface ProgressBarProps extends React.HTMLAttributes<HTMLDivElement> {
  value: number;
  max?: number;
  size?: 'sm' | 'md' | 'lg';
  color?: 'aqua' | 'gold' | 'charcoal' | 'emerald';
}

export function ProgressBar({
  value,
  max = 100,
  size = 'md',
  color = 'aqua',
  className,
  ...props
}: ProgressBarProps) {
  const safeValue = Math.min(Math.max(value, 0), max);
  const percent = (safeValue / max) * 100;

  const sizes = {
    sm: 'h-2',
    md: 'h-3',
    lg: 'h-4',
  };

  const colors = {
    aqua: 'bg-aqua',
    gold: 'bg-gold',
    charcoal: 'bg-charcoal',
    emerald: 'bg-emerald-500',
  };

  return (
    <div className={cn('w-full overflow-hidden rounded-full bg-slate-200', sizes[size], className)} {...props}>
      <div
        className={cn('h-full rounded-full transition-all duration-500 ease-out', colors[color])}
        style={{ width: `${percent}%` }}
        aria-valuenow={safeValue}
        aria-valuemax={max}
        aria-valuemin={0}
        role="progressbar"
      />
    </div>
  );
}
