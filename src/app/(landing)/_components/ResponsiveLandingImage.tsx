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
const TABLET_PRELOAD_MEDIA = '(min-width: 768px) and (max-width: 1279px)';
const MOBILE_MEDIA = '(max-width: 767px)';
const DESKTOP_SIZES = '(min-width: 1280px) 65vw';
const TABLET_SIZES = '(min-width: 768px) 80vw';
const MOBILE_SIZES = '100vw';

const DEFAULT_QUALITY = 90;
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
  const resolvedQuality = priority ? PRIORITY_QUALITY : (quality ?? DEFAULT_QUALITY);
  const imageOptions = { quality: resolvedQuality };

  const {
    props: { src: desktopSrc, srcSet: desktopSrcSet },
  } = getImageProps({
    alt,
    src: desktop,
    sizes: DESKTOP_SIZES,
    ...imageOptions,
  });

  const {
    props: { src: tabletSrc, srcSet: tabletSrcSet },
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
  });

  return (
    <>
      {priority && (
        <>
          <link
            rel="preload"
            as="image"
            href={desktopSrc}
            imageSrcSet={desktopSrcSet}
            imageSizes={DESKTOP_SIZES}
            media={DESKTOP_MEDIA}
          />
          <link
            rel="preload"
            as="image"
            href={tabletSrc}
            imageSrcSet={tabletSrcSet}
            imageSizes={TABLET_SIZES}
            media={TABLET_PRELOAD_MEDIA}
          />
          <link
            rel="preload"
            as="image"
            href={mobileProps.src}
            imageSrcSet={mobileProps.srcSet}
            imageSizes={MOBILE_SIZES}
            media={MOBILE_MEDIA}
          />
        </>
      )}
      <picture className={className}>
        <source media={DESKTOP_MEDIA} srcSet={desktopSrcSet} />
        <source media={TABLET_MEDIA} srcSet={tabletSrcSet} />
        <img
          {...mobileProps}
          className={cn('h-auto w-full', imageClassName)}
          {...(priority && { fetchPriority: 'high', loading: 'eager' })}
        />
      </picture>
    </>
  );
};

export default ResponsiveLandingImage;
