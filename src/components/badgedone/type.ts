import { HTMLAttributes } from 'react';

export type BadgeStatus = 'done' | 'progress' | 'none';

export interface BadgeDoneProps extends HTMLAttributes<HTMLDivElement> {
  status: BadgeStatus;
  current: number;
  total: number;
}
