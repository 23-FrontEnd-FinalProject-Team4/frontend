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

const Input = ({ type = 'text', isError = false, isDisabled = false }: InputProps) => {};

export default Input;
