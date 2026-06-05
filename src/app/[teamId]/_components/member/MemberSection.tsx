import KebabIcon from '@/assets/icons/kebab.svg?react';

import Profile from '@/components/profile/Profile';

import type { TeamPageMember } from '../../type';

interface MemberSectionProps {
  members: TeamPageMember[];
  onInviteClick: () => void;
}

export default function MemberSection({ members, onInviteClick }: MemberSectionProps) {
  return (
    <section className="border-border-primary bg-background-primary desktop:h-31.25 desktop:px-6 rounded-xl border px-5 py-5 shadow-sm">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-text-primary text-md font-semibold">
          멤버 <span className="text-text-default font-medium">({members.length}명)</span>
        </h2>

        <button
          type="button"
          className="text-brand-primary hover:text-interaction-hover focus-visible:ring-brand-primary rounded-sm text-sm font-semibold transition-colors focus-visible:ring-2 focus-visible:outline-none"
          onClick={onInviteClick}
        >
          초대하기 +
        </button>
      </div>

      <div className="tablet:grid-cols-2 desktop:grid-cols-4 grid gap-4">
        {members.map((member) => (
          <div key={member.id} className="flex min-w-0 items-center gap-3">
            <Profile src={member.imageUrl?.src ?? null} size="md" alt={`${member.name} 프로필`} />

            <div className="min-w-0">
              <p className="text-text-primary truncate text-sm font-semibold">{member.name}</p>
              <p className="text-text-default truncate text-xs">{member.email}</p>
            </div>

            <button
              type="button"
              className="text-icon-primary hover:bg-background-secondary hover:text-brand-primary focus-visible:ring-brand-primary ml-auto flex size-5 items-center justify-center rounded transition-colors focus-visible:ring-2 focus-visible:outline-none active:scale-95"
              aria-label={`${member.name} 멤버 메뉴 열기`}
            >
              <KebabIcon className="size-4" aria-hidden="true" />
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}
