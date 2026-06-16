import { forwardRef } from 'react';

import { cn } from '@/utils/cn';

import type { InputBoxProps } from './type';

const sharedBoxStyle = 'min-w-[300px] px-4 py-3' as const;

const sizeStyle = {
  sm: `${sharedBoxStyle} text-md`,
  lg: `${sharedBoxStyle} text-lg`,
} as const;

const InputBox = forwardRef<HTMLTextAreaElement, InputBoxProps>(
  (
    {
      size = 'sm',
      value,
      onChange,
      placeholder = '내용을 입력하세요',
      disabled = false,
      className = '',
      ...props
    },
    ref,
  ) => {
    const inputBoxClassName = cn(
      'resize-none overflow-y-auto overflow-x-hidden',
      'rounded-xl border border-border-primary bg-background-primary',
      'text-text-primary placeholder:text-text-default',
      'outline-none transition-colors',
      'hover:border-interaction-hover focus:border-interaction-pressed',
      'disabled:bg-background-secondary disabled:text-text-disabled disabled:placeholder:text-text-default',
      sizeStyle[size],
      className,
    );

    return (
      <textarea
        ref={ref}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        disabled={disabled}
        className={inputBoxClassName}
        {...props}
      />
    );
  },
);

InputBox.displayName = 'InputBox';

export default InputBox;
