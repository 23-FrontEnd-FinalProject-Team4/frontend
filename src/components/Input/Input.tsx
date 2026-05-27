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

  const defaultStyle = `
  border-border-primary
  bg-background-primary

  text-text-primary
  placeholder:text-text-default

  hover:border-interaction-hover
  focus:border-interaction-pressed
`;

  const errorStyle = `border-status-danger focus:border-status-danger`;

  const disabledStyle = `
    pointer-events-none
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
