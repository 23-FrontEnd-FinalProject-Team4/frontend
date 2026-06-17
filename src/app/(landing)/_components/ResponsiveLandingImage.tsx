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

const ResponsiveLandingImage = ({
  alt,
  className,
  desktop,
  mobile,
  priority = false,
  quality,
  sizes = '(min-width: 1280px) 65vw, (min-width: 768px) 80vw, 100vw',
  tablet,
}: ResponsiveLandingImageProps) => {
  return (
    <div className={className}>
      {/* Desktop */}
      <div className="hidden xl:block">
        <Image
          src={desktop}
          alt={alt}
          priority={priority}
          quality={quality}
          sizes={sizes}
          className="h-auto w-full"
        />
      </div>
      {/* Tablet */}
      <div className="hidden md:block xl:hidden">
        <Image
          src={tablet}
          alt={alt}
          priority={priority}
          quality={quality}
          sizes={sizes}
          className="h-auto w-full"
        />
      </div>
      {/* Mobile */}
      <div className="block md:hidden">
        <Image
          src={mobile}
          alt={alt}
          priority={priority}
          quality={quality}
          sizes={sizes}
          className="h-auto w-full"
        />
      </div>
    </div>
  );
};

export default ResponsiveLandingImage;
