import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export interface BadgeProps {
  children: React.ReactNode;
  variant?: 'coop' | 'emerald' | 'amber' | 'rose' | 'blue' | 'purple' | 'slate';
  size?: 'sm' | 'md';
  icon?: React.ReactNode;
  className?: string;
  glow?: boolean;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'coop',
  size = 'md',
  icon,
  className,
  glow = false,
}) => {
  const variantStyles = {
    coop: 'bg-coop-100 text-coop-900 border-coop-300/80',
    emerald: 'bg-emerald-50 text-emerald-800 border-emerald-200',
    amber: 'bg-amber-50 text-amber-900 border-amber-200',
    rose: 'bg-rose-50 text-rose-800 border-rose-200',
    blue: 'bg-sky-50 text-sky-800 border-sky-200',
    purple: 'bg-purple-50 text-purple-800 border-purple-200',
    slate: 'bg-surface-100 text-surface-800 border-surface-200',
  };

  const sizeStyles = {
    sm: 'text-[11px] font-medium px-2 py-0.5 rounded-md gap-1',
    md: 'text-xs font-semibold px-2.5 py-1 rounded-lg gap-1.5',
  };

  return (
    <span
      className={twMerge(
        clsx(
          'inline-flex items-center border tracking-tight',
          variantStyles[variant],
          sizeStyles[size],
          glow && 'shadow-sm',
          className
        )
      )}
    >
      {icon && <span className="shrink-0">{icon}</span>}
      {children}
    </span>
  );
};
