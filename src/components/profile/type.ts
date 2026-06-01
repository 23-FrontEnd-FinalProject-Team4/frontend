import { ImgHTMLAttributes } from 'react';

// 배포 및 확장성을 위해 크기(size) 타입을 정의합니다.
export type AvatarSize = 'lg' | 'md' | 'sm';

export interface AvatarProps extends ImgHTMLAttributes<HTMLImageElement> {
  /** 프로필 이미지 URL (null이나 빈 값이면 기본 아이콘 표시) */
  src?: string | null;
  /** 프로필 이미지 크기 (lg: 대, md: 중, sm: 소) */
  size?: AvatarSize;
  /** 이미지 로딩 실패나 빈 값일 때 보여줄 대체 텍스트 */
  alt?: string;
}
