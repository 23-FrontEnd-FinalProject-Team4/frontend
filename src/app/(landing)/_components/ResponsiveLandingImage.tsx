import { type StaticImageData, getImageProps } from 'next/image';

import { cn } from '@/utils/cn';

interface ResponsiveLandingImageProps {
  alt: string;
  className?: string;
  desktop: StaticImageData;
  mobile: StaticImageData;
  priority?: boolean;
  quality?: number;
  tablet: StaticImageData;
}

const DESKTOP_MEDIA = '(min-width: 1280px)';
const TABLET_MEDIA = '(min-width: 768px)';
const DESKTOP_SIZES = '(min-width: 1280px) 65vw';
const TABLET_SIZES = '(min-width: 768px) 80vw';
const MOBILE_SIZES = '100vw';

const LAZY_QUALITY = 75;
const PRIORITY_QUALITY = 100;

const ResponsiveLandingImage = ({
  alt,
  className,
  desktop,
  mobile,
  priority = false,
  quality,
  tablet,
}: ResponsiveLandingImageProps) => {
  const resolvedQuality = priority ? PRIORITY_QUALITY : (quality ?? LAZY_QUALITY);
  const imageOptions = { quality: resolvedQuality };

  const {
    props: { srcSet: desktopSrcSet },
  } = getImageProps({
    alt,
    src: desktop,
    sizes: DESKTOP_SIZES,
    ...imageOptions,
  });

  const {
    props: { srcSet: tabletSrcSet },
  } = getImageProps({
    alt,
    src: tablet,
    sizes: TABLET_SIZES,
    ...imageOptions,
  });

  const {
    props: { className: imageClassName, ...mobileProps },
  } = getImageProps({
    alt,
    src: mobile,
    sizes: MOBILE_SIZES,
    ...imageOptions,
    ...(priority && { fetchPriority: 'high', priority: true }),
  });

  return (
    <picture className={className}>
      <source media={DESKTOP_MEDIA} srcSet={desktopSrcSet} />
      <source media={TABLET_MEDIA} srcSet={tabletSrcSet} />
      <img {...mobileProps} className={cn('h-auto w-full', imageClassName)} />
    </picture>
  );
};

export default ResponsiveLandingImage;
