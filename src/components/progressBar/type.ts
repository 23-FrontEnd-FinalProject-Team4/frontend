export type ProgressBarSize = 'sm' | 'md' | 'lg';

export interface ProgressBarProps {
  value?: number;
  max?: number;
  completed?: number;
  total?: number;
  size?: ProgressBarSize;
  showTrackPattern?: boolean;
  className?: string;
  barClassName?: string;
  label: string;
}
