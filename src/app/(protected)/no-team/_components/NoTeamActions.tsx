import Link from 'next/link';

import { cn } from '@/utils/cn';

const buttonBaseClass =
  'md:text-md inline-flex h-12 w-full min-w-0 items-center justify-center rounded-lg px-0 py-0 text-xs font-medium transition-all duration-200 ease-in-out focus:outline-none';

const teamCreateLinkClass = cn(
  buttonBaseClass,
  'bg-brand-primary text-background-primary hover:bg-interaction-hover active:bg-interaction-pressed',
);

const teamJoinLinkClass = cn(
  buttonBaseClass,
  'border border-brand-primary bg-transparent text-brand-primary hover:bg-brand-secondary active:bg-brand-secondary/50',
);

export default function NoTeamActions() {
  return (
    <div className="mt-8 flex w-full max-w-46.5 flex-col gap-2.5 md:mt-12">
      <Link href="/addteam" className={teamCreateLinkClass}>
        팀 생성하기
      </Link>

      <Link href="/jointeam" className={teamJoinLinkClass}>
        팀 참여하기
      </Link>
    </div>
  );
}
