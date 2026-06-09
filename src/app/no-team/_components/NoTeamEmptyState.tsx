import Image from 'next/image';

import TeamEmptyImage from '@/assets/images/no-team-empty.png';

import NoTeamActions from './NoTeamActions';

export default function NoTeamEmptyState() {
  return (
    <section className="flex min-h-[calc(100vh-64px)] items-center justify-center px-4 py-10 md:min-h-screen">
      <div className="flex w-full max-w-75 flex-col items-center md:max-w-132">
        <Image
          src={TeamEmptyImage}
          alt=""
          aria-hidden="true"
          priority
          className="h-auto w-49.5 md:w-77.5"
        />

        <div className="mt-6 flex flex-col items-center gap-1 text-center md:mt-8">
          <p className="text-text-default md:text-md text-xs font-medium">
            아직 소속된 팀이 없습니다.
          </p>
          <p className="text-text-default md:text-md text-xs font-medium">
            팀을 생성하거나 팀에 참여해보세요.
          </p>
        </div>

        <NoTeamActions />
      </div>
    </section>
  );
}
