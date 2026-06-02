import type { ReactNode } from 'react';

export type ReplySize = 'sm' | 'lg';

export interface ReplyProps {
  size?: ReplySize;
  author: string;
  avatar: ReactNode;
  children: ReactNode;
  date: string;
  onMenuClick?: () => void;
}

export interface ReplyEditProps {
  author: string;
  avatar: ReactNode;
  value: string;
  onChange: (value: string) => void;
  onCancel: () => void;
  onSubmit: () => void;
}
