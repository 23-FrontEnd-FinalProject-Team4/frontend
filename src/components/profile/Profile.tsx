import React from 'react';

import Image from 'next/image';

import ProfileDefault from '@/assets/icons/profile.svg';
import { cn } from '@/utils/cn';

import { ProfileProps, ProfileSize } from './type';

const Profile = React.forwardRef<HTMLImageElement, ProfileProps>(
  ({ className, src, size = 'md', alt = '프로필 이미지', ...props }, ref) => {
    const baseStyles =
      'inline-flex items-center justify-center overflow-hidden object-cover select-none shrink-0';

    const sizeStyles: Record<ProfileSize, string> = {
      lg: 'w-10 h-10 rounded-[12px]',
      md: 'w-8 h-8 rounded-[8px]',
      sm: 'w-6 h-6 rounded-[6px]',
    };

    const pixelSizes: Record<ProfileSize, number> = {
      lg: 40,
      md: 32,
      sm: 24,
    };

    const imageSrc = src || ProfileDefault;
    const imageAlt = src ? alt : '기본 프로필 이미지';

    return (
      <Image
        ref={ref}
        src={imageSrc}
        alt={imageAlt}
        width={pixelSizes[size]}
        height={pixelSizes[size]}
        className={cn(baseStyles, sizeStyles[size], className)}
        {...props}
      />
    );
  },
);

Profile.displayName = 'Profile';

export default Profile;
