import Image from 'next/image';

import settingIcon from '@/assets/icons/setting.svg';
import { cn } from '@/utils/cn';

import ProgressBar from '../progressBar/ProgressBar';
import type { TeamCardSize, TeamMember, TeamProps } from './type';

interface SettingsButtonProps {
  label: string;
  onClick?: () => void;
}

interface AdminTeamCardProps extends Pick<
  TeamProps,
  | 'name'
  | 'imageUrl'
  | 'members'
  | 'memberCount'
  | 'completedTaskCount'
  | 'totalTaskCount'
  | 'progressLabel'
  | 'totalTaskLabel'
  | 'completedTaskLabel'
  | 'settingsLabel'
  | 'className'
  | 'onSettingsClick'
> {
  progressPercent: number;
  size: TeamCardSize;
}

interface UserTeamCardProps extends Pick<
  TeamProps,
  'name' | 'members' | 'memberCount' | 'settingsLabel' | 'className' | 'onSettingsClick'
> {
  size: TeamCardSize;
}

const ADMIN_CARD_SIZE_CLASS: Record<TeamCardSize, string> = {
  lg: 'w-[1120px] max-w-full min-h-[239px] gap-6 rounded-[20px] p-8',
  md: 'w-[620px] max-w-full min-h-[239px] gap-6 rounded-[20px] p-6',
  sm: 'w-[375px] max-w-full min-h-[196px] gap-4 rounded-none p-6',
};

const USER_CARD_SIZE_CLASS: Record<TeamCardSize, string> = {
  lg: 'h-16 w-[1120px] max-w-full rounded-xl px-6',
  md: 'h-16 w-[620px] max-w-full rounded-xl px-6',
  sm: 'h-14 w-[375px] max-w-full rounded-none px-5',
};

const TEAM_IMAGE_SIZE_CLASS: Record<TeamCardSize, string> = {
  lg: 'size-9',
  md: 'size-8',
  sm: 'size-6',
};

const TEAM_PROGRESS_SIZE: Record<TeamCardSize, 'sm' | 'md' | 'lg'> = {
  lg: 'lg',
  md: 'md',
  sm: 'sm',
};

const MAX_VISIBLE_MEMBERS = 3;

const DEFAULT_TEAM_LABELS = {
  progress: '오늘의 진행 상황',
  totalTask: '오늘의 할 일',
  completedTask: '완료',
  settings: '팀 설정',
};

const TEAM_CARD_BASE_CLASS = 'bg-background-inverse shadow-xl shadow-background-primary/10';
const TEAM_FALLBACK_IMAGE_CLASS = 'bg-brand-primary text-background-inverse';

const getProgressValue = ({
  completedTaskCount,
  totalTaskCount,
  progressValue,
}: Pick<TeamProps, 'completedTaskCount' | 'totalTaskCount' | 'progressValue'>) => {
  if (typeof progressValue === 'number') {
    return Math.min(Math.max(progressValue, 0), 100);
  }

  if (!totalTaskCount) {
    return 0;
  }

  return Math.round(((completedTaskCount ?? 0) / totalTaskCount) * 100);
};

const TeamImage = ({
  imageUrl,
  name,
  size,
}: Pick<TeamProps, 'imageUrl' | 'name'> & { size: TeamCardSize }) => (
  <div
    className={cn(
      !imageUrl && TEAM_FALLBACK_IMAGE_CLASS,
      'relative shrink-0 overflow-hidden rounded-md',
      TEAM_IMAGE_SIZE_CLASS[size],
    )}
  >
    {imageUrl ? (
      <Image src={imageUrl} alt="" fill className="object-cover" sizes="36px" aria-hidden />
    ) : (
      <span className="flex h-full items-center justify-center text-xs font-semibold">
        {name.slice(0, 1)}
      </span>
    )}
  </div>
);

const MemberAvatar = ({ member }: { member: TeamMember }) => (
  <div
    className={cn(
      !member.imageUrl && TEAM_FALLBACK_IMAGE_CLASS,
      'border-background-inverse relative -ml-1 size-5 overflow-hidden rounded-full border first:ml-0',
    )}
  >
    {member.imageUrl ? (
      <Image src={member.imageUrl} alt="" fill className="object-cover" sizes="20px" aria-hidden />
    ) : (
      <span className="flex h-full items-center justify-center text-[10px] font-semibold">
        {member.name.slice(0, 1)}
      </span>
    )}
  </div>
);

const MemberPreview = ({
  members = [],
  memberCount,
}: Pick<TeamProps, 'members' | 'memberCount'>) => {
  const visibleMembers = members.slice(0, MAX_VISIBLE_MEMBERS);
  const totalMemberCount = memberCount ?? members.length;

  if (totalMemberCount <= 0) {
    return null;
  }

  return (
    <div className="border-border-primary bg-background-inverse flex h-8 items-center rounded-lg border px-2">
      {visibleMembers.map((member) => (
        <MemberAvatar key={member.id} member={member} />
      ))}

      <span className="border-background-inverse bg-background-inverse text-text-default -ml-1 flex h-5 min-w-5 items-center justify-center rounded-full border px-1 text-[10px] font-medium">
        {totalMemberCount}
      </span>
    </div>
  );
};

const SettingsButton = ({ label, onClick }: SettingsButtonProps) => {
  if (!onClick) {
    return null;
  }

  return (
    <button
      type="button"
      aria-label={label}
      className="hover:bg-background-secondary focus:ring-brand-primary flex size-6 shrink-0 items-center justify-center rounded-sm transition-colors focus:ring-2 focus:outline-none"
      onClick={onClick}
    >
      <Image src={settingIcon} width={16} height={16} alt="" aria-hidden />
    </button>
  );
};

const AdminTeamCard = ({
  name,
  imageUrl,
  members,
  memberCount,
  completedTaskCount,
  totalTaskCount,
  progressPercent,
  size,
  progressLabel,
  totalTaskLabel,
  completedTaskLabel,
  settingsLabel,
  className,
  onSettingsClick,
}: AdminTeamCardProps) => (
  <section
    className={cn(TEAM_CARD_BASE_CLASS, 'flex flex-col', ADMIN_CARD_SIZE_CLASS[size], className)}
  >
    <div className="flex items-center justify-between gap-3">
      <div className="flex min-w-0 items-center gap-2">
        <TeamImage imageUrl={imageUrl} name={name} size={size} />

        <h3 className="text-text-primary text-md truncate font-semibold">{name}</h3>

        {size !== 'lg' && <MemberPreview members={members} memberCount={memberCount} />}
      </div>

      <SettingsButton
        label={settingsLabel ?? DEFAULT_TEAM_LABELS.settings}
        onClick={onSettingsClick}
      />
    </div>

    <div className="grid grid-cols-[1fr_auto_auto] items-end gap-4">
      <div>
        <p className="text-text-disabled text-xs font-medium">{progressLabel}</p>
        <p className="text-brand-primary mt-1 text-2xl font-semibold">{progressPercent}%</p>
      </div>

      <div className="text-right">
        <p className="text-text-disabled text-xs font-medium">{totalTaskLabel}</p>
        <p className="text-text-default mt-1 text-2xl font-semibold">{totalTaskCount}</p>
      </div>

      <div className="text-right">
        <p className="text-text-disabled text-xs font-medium">{completedTaskLabel}</p>
        <p className="text-brand-primary mt-1 text-2xl font-semibold">{completedTaskCount}</p>
      </div>
    </div>

    <ProgressBar
      value={progressPercent}
      size={TEAM_PROGRESS_SIZE[size]}
      label={`${name} ${progressLabel}`}
    />
  </section>
);

const UserTeamCard = ({
  name,
  members,
  memberCount,
  size,
  settingsLabel,
  className,
  onSettingsClick,
}: UserTeamCardProps) => (
  <section
    className={cn(
      TEAM_CARD_BASE_CLASS,
      'flex items-center justify-between',
      USER_CARD_SIZE_CLASS[size],
      className,
    )}
  >
    <div className="flex min-w-0 items-center gap-3">
      <h3 className="text-text-primary text-md truncate font-semibold">{name}</h3>
      <MemberPreview members={members} memberCount={memberCount} />
    </div>

    <SettingsButton
      label={settingsLabel ?? DEFAULT_TEAM_LABELS.settings}
      onClick={onSettingsClick}
    />
  </section>
);

const Team = ({
  name,
  imageUrl,
  members,
  memberCount,
  completedTaskCount = 0,
  totalTaskCount = 0,
  progressValue,
  variant = 'admin',
  size = 'lg',
  progressLabel = DEFAULT_TEAM_LABELS.progress,
  totalTaskLabel = DEFAULT_TEAM_LABELS.totalTask,
  completedTaskLabel = DEFAULT_TEAM_LABELS.completedTask,
  settingsLabel = DEFAULT_TEAM_LABELS.settings,
  className,
  onSettingsClick,
}: TeamProps) => {
  const progressPercent = getProgressValue({ completedTaskCount, totalTaskCount, progressValue });
  const commonProps = {
    name,
    imageUrl,
    members,
    memberCount,
    completedTaskCount,
    totalTaskCount,
    progressValue,
    size,
    progressLabel,
    totalTaskLabel,
    completedTaskLabel,
    settingsLabel,
    className,
    onSettingsClick,
  };

  if (variant === 'user') {
    return <UserTeamCard {...commonProps} />;
  }

  return <AdminTeamCard {...commonProps} progressPercent={progressPercent} />;
};

export default Team;
