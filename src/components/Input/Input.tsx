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
  return (
    <div className="">
      <input
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        disabled={isDisabled}
      />
    </div>
  );
};

export default Input;
