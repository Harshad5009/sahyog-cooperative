import React from 'react';
import { Star } from 'lucide-react';
import { clsx } from 'clsx';

export interface RatingProps {
  value: number; // 0 to 5
  max?: number;
  size?: 'sm' | 'md' | 'lg';
  showCount?: boolean;
  count?: number;
  interactive?: boolean;
  onChange?: (val: number) => void;
  className?: string;
}

export const Rating: React.FC<RatingProps> = ({
  value,
  max = 5,
  size = 'md',
  showCount = false,
  count,
  interactive = false,
  onChange,
  className,
}) => {
  const sizeMap = {
    sm: 'w-3.5 h-3.5',
    md: 'w-4 h-4',
    lg: 'w-5 h-5',
  };

  return (
    <div className={clsx('flex items-center gap-1.5', className)}>
      <div className="flex items-center gap-0.5">
        {Array.from({ length: max }).map((_, i) => {
          const filled = i < Math.floor(value);
          const half = !filled && i < value;

          return (
            <button
              key={i}
              type="button"
              disabled={!interactive}
              onClick={() => interactive && onChange && onChange(i + 1)}
              className={clsx(
                'transition-colors',
                interactive ? 'cursor-pointer hover:scale-110' : 'cursor-default'
              )}
            >
              <Star
                className={clsx(
                  sizeMap[size],
                  filled
                    ? 'fill-amber-400 text-amber-400'
                    : half
                    ? 'fill-amber-200 text-amber-400'
                    : 'text-surface-300 fill-surface-100'
                )}
              />
            </button>
          );
        })}
      </div>

      <span className="text-xs font-bold text-surface-800 tabular-nums">
        {value.toFixed(1)}
      </span>

      {showCount && count !== undefined && (
        <span className="text-xs text-surface-500">
          ({count.toLocaleString()})
        </span>
      )}
    </div>
  );
};
