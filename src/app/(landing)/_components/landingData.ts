import type { StaticImageData } from 'next/image';

import LandingBoardLarge from '@/assets/images/landing_img2_large.png';
import LandingBoardMedium from '@/assets/images/landing_img2_medium.png';
import LandingBoardSmall from '@/assets/images/landing_img2_small.png';
import LandingCheckLarge from '@/assets/images/landing_img3_large.png';
import LandingCommentLarge from '@/assets/images/landing_img4_large.png';
import LandingCommentMedium from '@/assets/images/landing_img4_medium.png';
import LandingCommentSmall from '@/assets/images/landing_img4_small.png';

export interface ResponsiveLandingImageSources {
  alt: string;
  desktop: StaticImageData;
  mobile: StaticImageData;
  tablet: StaticImageData;
}

export interface LandingFeature {
  description: string;
  icon: 'chat' | 'check' | 'folder';
  imageOffsetX?: number;
  imageOffsetY?: number;
  images: ResponsiveLandingImageSources;
  imageScale?: number;
  reverse?: boolean;
  textOffsetX?: number;
  title: string;
  tone?: 'brand' | 'light';
}

export const LANDING_FEATURES: LandingFeature[] = [
  {
    icon: 'folder',
    title: '칸반보드로 함께\n할 일 목록을 관리해요',
    description:
      '팀원과 함께 실시간으로 할 일을 추가하고 지금 무엇을 해야 하는지 한눈에 볼 수 있어요',
    images: {
      alt: '할 일 목록을 칸반보드로 확인하는 화면',
      desktop: LandingBoardLarge,
      tablet: LandingBoardMedium,
      mobile: LandingBoardSmall,
    },
    imageOffsetX: 220,
    imageOffsetY: -140,
    imageScale: 1.45,
    tone: 'light',
  },
  {
    icon: 'check',
    title: '세부적으로 할 일들을\n간편하게 체크해요',
    description: '일정에 맞춰 해야 할 세부 항목을 정리하고, 하나씩 빠르게 완료해보세요',
    images: {
      alt: '할 일을 날짜별로 확인하고 체크하는 화면',
      desktop: LandingCheckLarge,
      tablet: LandingCheckLarge,
      mobile: LandingCheckLarge,
    },
    imageOffsetX: 100,
    imageOffsetY: 0,
    imageScale: 1.4,
    reverse: true,
    textOffsetX: 120,
    tone: 'brand',
  },
  {
    icon: 'chat',
    title: '할 일 공유를 넘어\n의견을 나누고 함께 결정해요',
    description: '댓글로 진행상황을 기록하고 피드백을 주고받으며 함께 결정을 내릴 수 있어요',
    images: {
      alt: '할 일 상세에서 댓글로 의견을 나누는 화면',
      desktop: LandingCommentLarge,
      tablet: LandingCommentMedium,
      mobile: LandingCommentSmall,
    },
    imageOffsetX: 180,
    imageOffsetY: 0,
    imageScale: 1.42,
    tone: 'light',
  },
];
