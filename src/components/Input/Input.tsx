import type { ChangeEvent, HTMLInputTypeAttribute } from 'react';

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
  const baseStyle = 'w-full rounded-xl border outline-none transition-colors';

  const sizeStyle = {
    sm: 'h-11 px-3.5 py-4 text-sm',
    lg: 'h-12 px-4 py-4 text-base',
  };

  const defaultStyle =
    'border-gray-300 bg-white text-gray-900 placeholder:text-gray-400 hover:border-gray-400 focus:border-blue-500';

  const errorStyle = 'border-red-500 focus:border-red-500';

  const disabledStyle = 'cursor-not-allowed border-gray-200 bg-gray-100 text-gray-400';

  const inputClassName = `
    ${baseStyle}
    ${sizeStyle[size]}
    ${defaultStyle}
    ${isError ? errorStyle : ''}
    ${isDisabled ? disabledStyle : ''}
  `;

  return (
    <div className="flex flex-col gap-2">
      <input
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        disabled={isDisabled}
        className={inputClassName}
      />

      {isError && errorMessage && <p className="text-xs text-red-500">{errorMessage}</p>}
    </div>
  );
};

export default Input;
