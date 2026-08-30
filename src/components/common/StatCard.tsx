import React from 'react';
import { clsx } from 'clsx';
import type { LucideIcon } from 'lucide-react';
import { TrendingUp, TrendingDown } from 'lucide-react';

export interface StatCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: LucideIcon;
  iconBgColor?: string;
  iconColor?: string;
  trend?: {
    value: string;
    isPositive: boolean;
    label?: string;
  };
  badge?: string;
  className?: string;
  onClick?: () => void;
}

export const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  subtitle,
  icon: Icon,
  iconBgColor = 'bg-coop-50',
  iconColor = 'text-coop-700',
  trend,
  badge,
  className,
  onClick,
}) => {
  return (
    <div
      onClick={onClick}
      className={clsx(
        'bg-white border border-surface-200/80 rounded-2xl p-5 shadow-card hover:shadow-elevated transition-all duration-200 flex flex-col justify-between',
        onClick && 'cursor-pointer hover:border-coop-300',
        className
      )}
    >
      <div className="flex items-start justify-between gap-3 mb-3">
        <span className="text-xs font-semibold text-surface-500 uppercase tracking-wider">
          {title}
        </span>
        <div className={clsx('p-2.5 rounded-xl shrink-0 flex items-center justify-center', iconBgColor)}>
          <Icon className={clsx('w-5 h-5', iconColor)} />
        </div>
      </div>

      <div className="flex flex-col gap-1">
        <div className="flex items-baseline gap-2">
          <span className="text-2xl lg:text-3xl font-extrabold text-surface-900 tracking-tight font-display">
            {value}
          </span>
          {badge && (
            <span className="text-[11px] font-semibold bg-coop-100 text-coop-800 px-2 py-0.5 rounded-full">
              {badge}
            </span>
          )}
        </div>

        {subtitle && (
          <p className="text-xs text-surface-500 font-medium line-clamp-1">
            {subtitle}
          </p>
        )}

        {trend && (
          <div className="flex items-center gap-1.5 mt-2 pt-2 border-t border-surface-100 text-xs">
            {trend.isPositive ? (
              <TrendingUp className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
            ) : (
              <TrendingDown className="w-3.5 h-3.5 text-rose-600 shrink-0" />
            )}
            <span
              className={clsx(
                'font-bold',
                trend.isPositive ? 'text-emerald-700' : 'text-rose-700'
              )}
            >
              {trend.value}
            </span>
            {trend.label && (
              <span className="text-surface-400 font-normal">
                {trend.label}
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
