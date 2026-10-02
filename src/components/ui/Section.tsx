import * as React from 'react';
import { cn } from '@/lib/utils';
import { Reveal } from './Reveal';

export interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  eyebrow?: string;
  title?: string;
  description?: string;
  align?: 'left' | 'center';
}

export function Section({
  eyebrow,
  title,
  description,
  align = 'left',
  className,
  children,
  ...props
}: SectionProps) {
  return (
    <section className={cn('mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8', className)} {...props}>
      {(eyebrow || title || description) && (
        <Reveal className={cn('mb-10', align === 'center' && 'text-center')}>
          {eyebrow && (
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-aqua">{eyebrow}</p>
          )}
          {title && <h2 className="text-3xl font-black tracking-tight text-charcoal sm:text-4xl">{title}</h2>}
          {description && <p className="mt-4 max-w-2xl text-base text-slate-600 sm:text-lg">{description}</p>}
        </Reveal>
      )}
      {children}
    </section>
  );
}
