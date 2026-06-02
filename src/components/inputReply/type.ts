export type InputReplySize = 'sm' | 'lg';

export interface InputReplyProps {
  size?: InputReplySize;
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
  placeholder?: string;
}
