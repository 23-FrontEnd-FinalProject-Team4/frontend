import type { ReactNode } from 'react';

export type ReplySize = 'sm' | 'lg';

export interface ReplyProps {
  size?: ReplySize;
  author: string;
  avatar: ReactNode;
  children: ReactNode;
  date?: string;
  highlighted?: boolean;
  onMenuClick?: () => void;
}
