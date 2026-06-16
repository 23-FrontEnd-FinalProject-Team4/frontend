import LandingFeatureSection from './LandingFeatureSection';
import LandingFooter from './LandingFooter';
import LandingHeader from './LandingHeader';
import LandingHero from './LandingHero';
import { LANDING_FEATURES } from './landingData';

interface LandingPageProps {
  startHref: string;
}

export default function LandingPage({ startHref }: LandingPageProps) {
  return (
    <div className="bg-background-primary text-text-primary min-h-screen">
      <LandingHeader />

      <main>
        <LandingHero startHref={startHref} />

        {LANDING_FEATURES.map((feature) => (
          <LandingFeatureSection key={feature.title} {...feature} />
        ))}
      </main>

      <LandingFooter startHref={startHref} />
    </div>
  );
}
