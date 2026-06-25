import StartLink from './StartLink';

interface LandingFooterProps {
  startHref: string;
}

const LandingFooter = ({ startHref }: LandingFooterProps) => {
  return (
    <footer className="bg-background-primary px-9 py-16 text-center md:py-24">
      <div className="group">
        <h2 className="text-brand-primary text-2xl font-semibold transition-all duration-300 group-hover:-translate-y-1 md:text-3xl">
          지금 바로 시작해보세요
        </h2>
        <p className="text-text-default mx-auto mt-3 max-w-md text-sm transition-all duration-300 group-hover:-translate-y-0.5 md:text-base">
          팀원 모두와 같은 방향, 같은 속도로 나아가는 가장 쉬운 방법
        </p>
        <StartLink href={startHref} className="mt-8" />
      </div>
    </footer>
  );
};
export default LandingFooter;
