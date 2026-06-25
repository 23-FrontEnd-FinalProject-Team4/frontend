import LogoCoworkersIcon from '@/assets/icons/logo_coworkers.svg?react';
import LandingHeroLarge from '@/assets/images/landing_img1_large.png';
import LandingHeroMedium from '@/assets/images/landing_img1_medium.png';
import LandingHeroSmall from '@/assets/images/landing_img1_small.png';

import ResponsiveLandingImage from './ResponsiveLandingImage';
import StartLink from './StartLink';

interface LandingHeroProps {
  startHref: string;
}

export default function LandingHero({ startHref }: LandingHeroProps) {
  return (
    <section className="bg-background-tertiary overflow-hidden">
      <div className="relative mx-auto flex min-h-[calc(100svh-4rem)] max-w-screen-2xl flex-col px-9 pt-10 pb-10 md:px-16 xl:px-20">
        <div className="group relative z-10 max-w-sm pt-4 md:pt-12 xl:pt-24">
          <div className="transition-transform duration-300 group-hover:scale-105">
            <LogoCoworkersIcon className="mb-4 size-12 md:size-14" aria-hidden="true" />
          </div>

          <p className="text-text-disabled text-sm font-medium transition-all duration-300 group-hover:-translate-y-0.5 md:text-lg">
            함께 만들어가는 To do list
          </p>

          <h1 className="text-brand-primary text-4xl leading-tight font-semibold transition-all duration-300 group-hover:-translate-y-1 md:text-5xl">
            Coworkers
          </h1>
        </div>

        <ResponsiveLandingImage
          alt="Coworkers 팀 페이지 예시 화면"
          desktop={LandingHeroLarge}
          tablet={LandingHeroMedium}
          mobile={LandingHeroSmall}
          priority
          className="relative z-0 mt-8 w-full transition-transform duration-300 hover:scale-[1.01] md:mt-14 xl:absolute xl:-top-8 xl:-right-50 xl:mt-0 xl:w-3/4"
        />

        <StartLink
          href={startHref}
          className="relative z-10 mt-8 self-end md:mr-8 xl:mt-auto xl:mb-28 xl:self-start"
        />
      </div>
    </section>
  );
}
