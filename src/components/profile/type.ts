import { ComponentPropsWithoutRef } from 'react';

import Image from 'next/image';

export type ProfileSize = 'lg' | 'md' | 'sm';

export interface ProfileProps extends Omit<
  ComponentPropsWithoutRef<typeof Image>,
  'src' | 'width' | 'height'
> {
  src?: string | null;
  size?: ProfileSize;
  alt: string;
}
