import type { StaticImageData } from 'next/image';

export type TeamCardSize = 'sm' | 'md' | 'lg';
export type TeamVariant = 'admin' | 'user';

export interface TeamMember {
  id: number | string;
  name: string;
  imageUrl?: string | StaticImageData;
}

export interface TeamProps {
  name: string;
  imageUrl?: string | StaticImageData;
  members?: TeamMember[];
  memberCount?: number;
  completedTaskCount?: number;
  totalTaskCount?: number;
  progressValue?: number;
  variant?: TeamVariant;
  size?: TeamCardSize;
  progressLabel?: string;
  totalTaskLabel?: string;
  completedTaskLabel?: string;
  settingsLabel?: string;
  className?: string;
  onSettingsClick?: () => void;
}
