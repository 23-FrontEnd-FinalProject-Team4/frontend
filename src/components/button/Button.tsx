import React from 'react';

import { cn } from '@/utils/cn';

import { ButtonProps, ButtonVariant } from './type';

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = 'primary-filled',
      buttonState,
      icon,
      fullWidth,
      children,
      disabled,
      ...props
    },
    ref,
  ) => {
    const baseStyles =
      'inline-flex items-center justify-center font-medium transition-all duration-200 ease-in-out focus:outline-none text-md gap-2 rounded-2xl';

    const variantStyles: Record<ButtonVariant, string> = {
      'primary-filled':
        'rounded-xl bg-brand-primary text-background-primary hover:bg-interaction-hover active:bg-interaction-pressed disabled:bg-interaction-inactive disabled:text-text-disabled px-6 py-3 min-w-[160px]',
      'primary-outline':
        'rounded-xl border border-brand-primary text-brand-primary bg-transparent hover:bg-brand-secondary active:bg-brand-secondary/50 disabled:border-interaction-inactive disabled:text-interaction-inactive px-6 py-3 min-w-[160px]',
      'secondary-filled':
        'bg-brand-primary text-background-primary hover:bg-interaction-hover active:bg-interaction-pressed disabled:bg-interaction-inactive px-5 py-2.5 rounded-full',
      'secondary-whiteFilled':
        'border border-brand-primary text-brand-primary bg-background-primary hover:bg-brand-secondary active:bg-brand-secondary/70 disabled:border-interaction-inactive disabled:text-text-disabled px-5 py-2.5 rounded-full',
      'danger-filled':
        'bg-status-danger text-background-primary hover:opacity-90 active:opacity-80 px-6 py-3 min-w-[160px]',

      'icon-circle':
        'w-12 h-12 rounded-full flex items-center justify-center p-0 bg-brand-primary text-background-primary hover:bg-interaction-hover active:bg-interaction-pressed disabled:bg-interaction-inactive disabled:text-text-disabled shadow-sm',

      'icon-circle-white':
        'w-12 h-12 rounded-full flex items-center justify-center p-0 bg-white text-background-primary hover:bg-interaction-hover active:bg-interaction-pressed disabled:bg-interaction-inactive disabled:text-text-disabled shadow-sm',

      'input-btn':
        'w-full max-w-md justify-between bg-background-secondary hover:bg-background-tertiary active:bg-border-primary text-text-secondary px-4 py-3 border border-border-primary',
    };

    const isDisabled = disabled || buttonState === 'disabled';

    const isCircleVariant = variant === 'icon-circle' || variant === 'icon-circle-white';

    return (
      <button
        ref={ref}
        disabled={isDisabled}
        className={cn(baseStyles, variantStyles[variant], fullWidth && 'w-full', className)}
        {...props}
      >
        {variant === 'input-btn' ? (
          <>
            {children && <span>{children}</span>}
            {icon && (
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-slate-200/60 bg-white shadow-sm">
                <span className="flex h-5 w-5 items-center justify-center">{icon}</span>
              </span>
            )}
          </>
        ) : (
          <>
            {icon && <span className="inline-flex items-center justify-center">{icon}</span>}
            {!isCircleVariant && children && <span>{children}</span>}
          </>
        )}
      </button>
    );
  },
);

Button.displayName = 'Button';

export default Button;
