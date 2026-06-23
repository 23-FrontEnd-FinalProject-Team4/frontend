import type { TeamPageMember, TeamPageRole } from '../../type';
import MemberItem from './MemberItem';

interface MemberSectionProps {
  members: TeamPageMember[];
  viewerRole: TeamPageRole;
  onInviteClick: () => void;
  onRemoveMember: (member: TeamPageMember) => void;
}

const MemberSection = ({
  members,
  viewerRole,
  onInviteClick,
  onRemoveMember,
}: MemberSectionProps) => {
  return (
    <section className="border-border-primary bg-background-primary rounded-xl border px-5 py-5 shadow-sm xl:min-h-31.25 xl:px-6">
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

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {members.map((member) => (
          <MemberItem
            key={member.id}
            member={member}
            canManage={viewerRole === 'ADMIN'}
            onRemove={onRemoveMember}
          />
        ))}
      </div>
    </section>
  );
};

export default MemberSection;
