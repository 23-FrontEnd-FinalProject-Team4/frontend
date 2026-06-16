import ChatFillIcon from '@/assets/icons/Chat_fill.svg?react';
import CheckFillIcon from '@/assets/icons/Check_fill.svg?react';
import FolderFillIcon from '@/assets/icons/Folder_fill.svg?react';

import ResponsiveLandingImage from './ResponsiveLandingImage';
import type { LandingFeature } from './landingData';

type LandingFeatureSectionProps = LandingFeature;

function FeatureIcon({ icon }: { icon: LandingFeature['icon'] }) {
  return (
    <span
      className="mb-5 flex size-12 items-center justify-center overflow-visible"
      aria-hidden="true"
    >
      {icon === 'folder' && <FolderFillIcon className="size-9 overflow-visible" />}
      {icon === 'check' && <CheckFillIcon className="size-9 overflow-visible" />}
      {icon === 'chat' && <ChatFillIcon className="size-9 overflow-visible" />}
    </span>
  );
}

export default function LandingFeatureSection({
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
}: LandingFeatureSectionProps) {
  const isBrandTone = tone === 'brand';

  const gridColumns = reverse
    ? 'xl:grid-cols-[minmax(0,0.58fr)_minmax(354px,0.42fr)]'
    : 'xl:grid-cols-[minmax(354px,0.42fr)_minmax(0,0.58fr)]';

  return (
    <section
      className={
        isBrandTone
          ? 'bg-brand-primary overflow-hidden text-white'
          : 'bg-background-secondary overflow-hidden'
      }
    >
      <div
        className={`mx-auto grid max-w-screen-xl items-center gap-10 px-9 py-16 md:px-16 md:py-24 xl:min-h-[800px] ${gridColumns} xl:px-20 xl:py-0 ${
          reverse ? 'xl:[&>div:first-child]:order-2' : ''
        }`}
      >
        <div
          className="relative z-10 max-w-[354px] overflow-visible"
          style={{
            transform: `translateX(${textOffsetX}px)`,
          }}
        >
          <FeatureIcon icon={icon} />

          <h2
            className={`text-3xl leading-tight font-bold whitespace-pre-line ${
              isBrandTone ? 'text-white' : 'text-brand-primary'
            }`}
          >
            {title}
          </h2>

          <p
            className={`mt-6 text-base leading-relaxed ${
              isBrandTone ? 'text-white/80' : 'text-text-default'
            }`}
          >
            {description}
          </p>
        </div>

        <div className="flex w-full justify-center xl:hidden">
          <ResponsiveLandingImage
            {...images}
            className="w-full max-w-2xl transition-transform duration-300 hover:scale-[1.01]"
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
}
