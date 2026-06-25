import type { CSSProperties } from 'react';

import ChatFillIcon from '@/assets/icons/Chat_fill.svg?react';
import CheckFillIcon from '@/assets/icons/Check_fill.svg?react';
import FolderFillIcon from '@/assets/icons/Folder_fill.svg?react';

import ResponsiveLandingImage from './ResponsiveLandingImage';
import type { LandingFeature } from './landingData';

type LandingFeatureSectionProps = LandingFeature;

const FeatureIcon = ({ icon }: { icon: LandingFeature['icon'] }) => {
  return (
    <span
      className="mb-5 flex size-12 items-center justify-center overflow-visible transition-transform duration-300 group-hover:scale-110"
      aria-hidden="true"
    >
      {icon === 'folder' && <FolderFillIcon className="size-9 overflow-visible" />}
      {icon === 'check' && <CheckFillIcon className="size-9 overflow-visible" />}
      {icon === 'chat' && <ChatFillIcon className="size-9 overflow-visible" />}
    </span>
  );
};

const LandingFeatureSection = ({
  description,
  icon,
  imageOffsetX = 0,
  imageOffsetY = 0,
  imageScale = 1,
  images,
  reverse = false,
  textOffsetX = 0,
  title,
  tone = 'light',
}: LandingFeatureSectionProps) => {
  const isBrandTone = tone === 'brand';

  const gridColumns = reverse
    ? 'xl:grid-cols-[minmax(0,0.58fr)_minmax(354px,0.42fr)]'
    : 'xl:grid-cols-[minmax(354px,0.42fr)_minmax(0,0.58fr)]';

  const textStyle = {
    '--text-offset-x': `${textOffsetX}px`,
  } as CSSProperties;

  return (
    <section
      className={
        isBrandTone
          ? 'bg-brand-primary overflow-hidden text-white'
          : 'bg-background-secondary overflow-hidden'
      }
    >
      <div
        className={`mx-auto flex min-h-[560px] max-w-screen-xl flex-col px-9 pt-11 md:min-h-[667px] md:px-16 md:pt-12 xl:grid xl:min-h-[800px] xl:items-center xl:gap-10 xl:px-20 xl:py-0 ${gridColumns} ${
          reverse ? 'xl:[&>div:first-child]:order-2' : ''
        }`}
      >
        <div
          className="group relative z-10 max-w-[354px] overflow-visible xl:translate-x-[var(--text-offset-x)]"
          style={textStyle}
        >
          <FeatureIcon icon={icon} />

          <h2
            className={`text-3xl leading-tight font-semibold whitespace-pre-line transition-all duration-300 group-hover:-translate-y-1 ${
              isBrandTone ? 'text-white' : 'text-brand-primary'
            }`}
          >
            {title}
          </h2>

          <p
            className={`mt-6 text-base leading-relaxed whitespace-pre-line ${
              isBrandTone ? 'text-white/80' : 'text-text-default'
            }`}
          >
            {description}
          </p>
        </div>

        <div className="mt-7 flex flex-1 items-end justify-center xl:hidden">
          <ResponsiveLandingImage
            {...images}
            className={`w-full transition-transform duration-300 hover:scale-[1.01] ${
              isBrandTone ? 'max-w-[357px] md:max-w-[627px]' : 'max-w-[340px] md:max-w-[540px]'
            }`}
          />
        </div>

        <div className="hidden h-full w-full items-end justify-end xl:flex">
          <div
            style={{
              transform: `translateX(${imageOffsetX}px) translateY(${imageOffsetY}px) scale(${imageScale})`,
              transformOrigin: 'right bottom',
            }}
          >
            <div className="transition-transform duration-300 hover:scale-[1.01]">
              <ResponsiveLandingImage {...images} className="w-full max-w-2xl xl:max-w-none" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LandingFeatureSection;
