import React from 'react';

import { cn } from '@/utils/cn';

import { AvatarProps, AvatarSize } from './type';

const Avatar = React.forwardRef<HTMLImageElement, AvatarProps>(
  ({ className, src, size = 'md', alt = '프로필 이미지', ...props }, ref) => {
    // 1. 공통 스타일: 부드러운 라운딩(rounded-2xl ~ 3xl) 및 이미지 중앙 정렬
    const baseStyles =
      'inline-flex items-center justify-center overflow-hidden object-cover select-none shrink-0';

    // 2. 크기별 가로/세로 매핑 (시안의 대/중/소 비율 반영)
    const sizeStyles: Record<AvatarSize, string> = {
      lg: 'w-24 h-24 rounded-[32px]', // 큰 사이즈: 둥글기 깊게
      md: 'w-16 h-16 rounded-[24px]', // 중간 사이즈
      sm: 'w-11 h-11 rounded-[16px]', // 작은 사이즈
    };

    // 3. 기본 프로필용 배경색 (이미지가 없을 때만 적용)
    const defaultBgStyles = 'bg-slate-100 text-slate-300';

    // 이미지가 없을 때 보여줄 기본 사람 모양 SVG 아이콘
    const renderDefaultIcon = () => {
      const iconSizeStyles: Record<AvatarSize, string> = {
        lg: 'w-12 h-12',
        md: 'w-8 h-8',
        sm: 'w-5 h-5',
      };

      return (
        <svg
          className={cn(iconSizeStyles[size])}
          fill="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
        </svg>
      );
    };

    // src 값이 존재하면 <img> 태그를, 없으면 기본 아이콘을 렌더링합니다.
    if (src) {
      return (
        <img
          ref={ref}
          src={src}
          alt={alt}
          className={cn(baseStyles, sizeStyles[size], className)}
          {...props}
        />
      );
    }

    return (
      <div className={cn(baseStyles, sizeStyles[size], defaultBgStyles, className)}>
        {renderDefaultIcon()}
      </div>
    );
  },
);

Avatar.displayName = 'Avatar';

export default Avatar;
