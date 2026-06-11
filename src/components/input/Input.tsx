'use client';

import { useState } from 'react';

import VisibilityFalseIcon from '@/assets/icons/visibility_false.svg?react';
import VisibilityTrueIcon from '@/assets/icons/visibility_true.svg?react';

import type { InputProps } from './type';

const Input = ({
  size = 'lg',
  type = 'text',

  value,
  placeholder,
  onChange,

  isError = false,
  errorMessage,

  isDisabled = false,

  rightButtonText,
  onRightButtonClick,
  ...props
}: InputProps) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const inputType = type === 'password' && isPasswordVisible ? 'text' : type;

  const baseStyle = 'w-full rounded-xl border outline-none transition-colors';

  const sizeStyle = {
    sm: 'h-11 px-3.5 py-4 text-md',
    lg: 'h-12 px-4 py-4 text-base',
  };

  const defaultStyle = `
    border-border-primary
    bg-background-primary

    text-text-primary
    placeholder:text-text-default

    hover:border-interaction-hover
    focus:border-interaction-pressed
`;

  const errorStyle = `border-status-danger hover:border-status-danger focus:border-status-danger`;

  const disabledStyle = `
    border-border-primary
    bg-background-secondary
    disabled:text-text-disabled

    disabled:hover:border-border-primary
    disabled:focus:border-border-primary
`;
  const inputClassName = `
    ${baseStyle}
    ${sizeStyle[size]}
    ${defaultStyle}
    ${isError ? errorStyle : ''}
    ${isDisabled ? disabledStyle : ''}
  `;

  return (
    <div className="relative flex flex-col gap-2">
      <div className="relative">
        <input
          {...props}
          type={inputType}
          value={value}
          placeholder={placeholder}
          onChange={onChange}
          disabled={isDisabled}
          className={inputClassName}
        />
        {type === 'password' && (
          <button
            type="button"
            onClick={() => setIsPasswordVisible(!isPasswordVisible)}
            className="absolute top-1/2 right-4 -translate-y-1/2"
            aria-label={isPasswordVisible ? '비밀번호 숨기기' : '비밀번호 보기'}
          >
            {isPasswordVisible ? (
              <VisibilityFalseIcon width={24} height={24} />
            ) : (
              <VisibilityTrueIcon width={24} height={24} />
            )}
          </button>
        )}
        {rightButtonText && (
          <button
            type="button"
            onClick={onRightButtonClick}
            className={`bg-brand-primary hover:bg-interaction-hover active:bg-interaction-pressed absolute top-1/2 right-2 -translate-y-1/2 rounded-lg px-3 py-2 text-sm font-medium text-white transition-colors disabled:cursor-not-allowed disabled:opacity-50`}
          >
            {rightButtonText}
          </button>
        )}
      </div>
      {isError && errorMessage && <p className="text-status-danger text-xs">{errorMessage}</p>}
    </div>
  );
};

export default Input;
