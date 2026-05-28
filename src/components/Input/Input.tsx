import { useState } from 'react';
import type { ChangeEvent, HTMLInputTypeAttribute } from 'react';

import VisibilityFalseIcon from '@/assets/icons/visibility_false.svg';
import VisibilityTrueIcon from '@/assets/icons/visibility_true.svg';

export type InputBoxSize = 'sm' | 'lg';

export interface InputProps {
  size?: InputBoxSize;
  type?: HTMLInputTypeAttribute;

  value: string;
  placeholder?: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;

  isError?: boolean;
  errorMessage?: string;

  isDisabled?: boolean;
}

const Input = ({
  size = 'lg',
  type = 'text',

  value,
  placeholder,
  onChange,

  isError = false,
  errorMessage,

  isDisabled = false,
}: InputProps) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const inputType = type === 'password' && isPasswordVisible ? 'text' : type;

  const baseStyle = 'w-full rounded-xl border outline-none transition-colors';

  const sizeStyle = {
    sm: 'h-11 px-3.5 py-4 text-sm',
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
    cursor-not-allowed

    border-border-primary
    bg-background-secondary
    text-text-disabled

    placeholder:text-text-disabled
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
          >
            {isPasswordVisible ? <VisibilityFalseIcon /> : <VisibilityTrueIcon />}
          </button>
        )}
      </div>
      {isError && errorMessage && <p className="text-status-danger text-xs">{errorMessage}</p>}
    </div>
  );
};

export default Input;
