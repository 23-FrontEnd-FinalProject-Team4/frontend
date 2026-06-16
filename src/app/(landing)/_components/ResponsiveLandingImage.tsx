import Image, { type StaticImageData } from 'next/image';

interface ResponsiveLandingImageProps {
  alt: string;
  className?: string;
  desktop: StaticImageData;
  mobile: StaticImageData;
  priority?: boolean;
  quality?: number;
  sizes?: string;
  tablet: StaticImageData;
}

export default function ResponsiveLandingImage({
  alt,
  className,
  desktop,
  mobile,
  priority = false,
  quality,
  sizes = '(min-width: 1280px) 65vw, (min-width: 768px) 80vw, 100vw',
  tablet,
}: ResponsiveLandingImageProps) {
  return (
    <picture className={`block ${className ?? ''}`}>
      <source media="(min-width: 1280px)" srcSet={desktop.src} />
      <source media="(min-width: 768px)" srcSet={tablet.src} />
      <Image
        src={mobile}
        alt={alt}
        priority={priority}
        quality={quality}
        sizes={sizes}
        className="h-auto w-full"
      />
    </picture>
  );
}
