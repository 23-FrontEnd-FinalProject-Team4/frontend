import type { InputHTMLAttributes } from 'react';

export type InputBoxSize = 'sm' | 'lg';

export interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  size?: InputBoxSize;
  isError?: boolean;
  errorMessage?: string;
  isDisabled?: boolean;
  rightButtonText?: string;
  onRightButtonClick?: () => void;
}
