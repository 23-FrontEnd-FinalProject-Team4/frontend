import Image from 'next/image';

import SettingIcon from '@/assets/icons/setting.svg?react';
import { cn } from '@/utils/cn';

import Profile from '@/components/profile/Profile';

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
  lg: 'w-280 max-w-full min-h-59.75 gap-6 rounded-5 p-8',
  md: 'w-155 max-w-full min-h-59.75 gap-6 rounded-5 p-6',
  sm: 'w-93.75 max-w-full min-h-49 gap-4 rounded-none p-6',
};

const USER_CARD_SIZE_CLASS: Record<TeamCardSize, string> = {
  lg: 'h-16 w-280 max-w-full rounded-xl px-6',
  md: 'h-16 w-155 max-w-full rounded-xl px-6',
  sm: 'h-14 w-93.75 max-w-full rounded-none px-5',
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

const TEAM_CARD_BASE_CLASS =
  'bg-background-inverse shadow-xl shadow-background-primary/10 ring-1 ring-border-primary/40 transition-all duration-300 ease-out hover:-translate-y-0.5 hover:shadow-2xl hover:shadow-brand-primary/10 hover:ring-brand-primary/20';
const TEAM_FALLBACK_IMAGE_CLASS =
  'bg-brand-primary text-background-inverse shadow-sm shadow-brand-primary/30';

const getProfileSrc = (imageUrl: TeamMember['imageUrl']) =>
  typeof imageUrl === 'string' ? imageUrl : (imageUrl?.src ?? null);

const getProgressValue = ({
  completedTaskCount,
  totalTaskCount,
  progressValue,
}: Pick<TeamProps, 'completedTaskCount' | 'totalTaskCount' | 'progressValue'>) => {
  if (typeof progressValue === 'number') {
    return Math.min(Math.max(progressValue, 0), 100);
  }

  if (!totalTaskCount || totalTaskCount <= 0) {
    return 0;
  }

  const calculatedPercent = Math.round(((completedTaskCount ?? 0) / totalTaskCount) * 100);

  return Math.min(Math.max(calculatedPercent, 0), 100);
};

const TeamImage = ({
  imageUrl,
  name,
  size,
}: Pick<TeamProps, 'imageUrl' | 'name'> & { size: TeamCardSize }) => (
  <div
    className={cn(
      !imageUrl && TEAM_FALLBACK_IMAGE_CLASS,
      'relative shrink-0 overflow-hidden rounded-md ring-1 ring-background-primary/70',
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
  <Profile
    src={getProfileSrc(member.imageUrl)}
    size="sm"
    alt={`${member.name} 프로필`}
    className="border-background-inverse size-5 rounded-full border"
  />
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
    <div className="border-border-primary bg-background-inverse/90 flex h-8 items-center rounded-lg border px-2 shadow-sm shadow-background-primary/5 transition-colors duration-200 hover:border-brand-primary/20 hover:bg-background-inverse">
      <span className="sr-only">팀 멤버 {totalMemberCount}명</span>

      {visibleMembers.map((member) => (
        <div
          key={member.id}
          className={cn(visibleMembers.length > 0 && '-ml-1 first:ml-0')}
          aria-hidden="true"
        >
          <MemberAvatar member={member} />
        </div>
      ))}

      <span
        className={cn(
          'border-background-inverse bg-background-inverse text-text-default flex h-5 min-w-5 items-center justify-center rounded-full border px-1 text-[10px] font-medium',
          visibleMembers.length > 0 && '-ml-1',
        )}
        aria-hidden="true"
      >
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
      className="group text-icon-primary hover:bg-brand-secondary hover:text-brand-primary focus:ring-brand-primary flex size-7 shrink-0 items-center justify-center rounded-full transition-all duration-200 ease-out hover:scale-105 active:scale-95 focus:ring-2 focus:outline-none"
      onClick={onClick}
    >
      <SettingIcon className="size-4 transition-transform duration-200 group-hover:rotate-45" aria-hidden="true" />
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
