import type { ChangeEvent, TextareaHTMLAttributes } from 'react';

export type InputBoxSize = 'sm' | 'lg';

export interface InputBoxProps
  extends Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, 'value' | 'onChange' | 'size'> {
  size?: InputBoxSize;
  value: string;
  onChange: (event: ChangeEvent<HTMLTextAreaElement>) => void;
}
