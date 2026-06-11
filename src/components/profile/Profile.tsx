import React from 'react';

import Image from 'next/image';

import ProfileDefaultIcon from '@/assets/icons/profile.svg?react';
import { cn } from '@/utils/cn';

import { ProfileElement, ProfileProps, ProfileSize } from './type';

const Profile = React.forwardRef<ProfileElement, ProfileProps>(
  ({ className, src, size = 'md', alt = '프로필 이미지', ...props }, ref) => {
    const baseStyles =
      'inline-flex items-center justify-center overflow-hidden object-cover select-none shrink-0';

    const sizeStyles: Record<ProfileSize, string> = {
      lg: 'w-10 h-10 rounded-3',
      md: 'w-8 h-8 rounded-2',
      sm: 'w-6 h-6 rounded-1.5',
    };

    const pixelSizes: Record<ProfileSize, number> = {
      lg: 40,
      md: 32,
      sm: 24,
    };

    if (!src) {
      return (
        <span
          ref={ref as React.Ref<HTMLSpanElement>}
          role="img"
          aria-label="기본 프로필 이미지"
          className={cn(baseStyles, sizeStyles[size], className)}
        >
          <ProfileDefaultIcon className="h-full w-full" aria-hidden="true" />
        </span>
      );
    }

    return (
      <Image
        ref={ref as React.Ref<HTMLImageElement>}
        src={src}
        alt={alt}
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
