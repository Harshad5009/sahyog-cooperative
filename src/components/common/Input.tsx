import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Input: React.FC<InputProps> = ({
  label,
  error,
  helperText,
  leftIcon,
  rightIcon,
  className,
  id,
  ...props
}) => {
  const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

  return (
    <div className="w-full flex flex-col gap-1.5">
      {label && (
        <label htmlFor={inputId} className="text-xs font-semibold text-surface-800 flex items-center justify-between">
          <span>{label}</span>
          {props.required && <span className="text-rose-500 font-normal text-[10px]">Required</span>}
        </label>
      )}
      
      <div className="relative flex items-center">
        {leftIcon && (
          <div className="absolute left-3.5 text-surface-400 pointer-events-none flex items-center justify-center">
            {leftIcon}
          </div>
        )}
        
        <input
          id={inputId}
          className={twMerge(
            clsx(
              'w-full bg-white border text-surface-900 placeholder:text-surface-400 text-sm rounded-xl px-3.5 py-2.5 transition-all duration-150',
              'focus:outline-none focus:ring-2 focus:ring-coop-500/20 focus:border-coop-600',
              leftIcon ? 'pl-10' : 'pl-3.5',
              rightIcon ? 'pr-10' : 'pr-3.5',
              error ? 'border-rose-400 focus:border-rose-500 focus:ring-rose-500/20' : 'border-surface-200 hover:border-surface-300',
              className
            )
          )}
          {...props}
        />
        
        {rightIcon && (
          <div className="absolute right-3.5 text-surface-400 flex items-center justify-center">
            {rightIcon}
          </div>
        )}
      </div>

      {error && <span className="text-xs text-rose-600 font-medium">{error}</span>}
      {helperText && !error && <span className="text-xs text-surface-500">{helperText}</span>}
    </div>
  );
};
