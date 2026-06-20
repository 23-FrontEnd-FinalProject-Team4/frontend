'use client';

import { toast } from 'react-hot-toast';

import Modal from '@/components/modal/Modal';
import { useTeamInvitationMutation } from '@/queries/teams/queries';

interface InviteMemberModalProps {
  isOpen: boolean;
  groupId?: number;
  onClose: () => void;
}

const copyInviteLink = async ({
  groupId,
  getInvitationLink,
}: {
  groupId?: number;
  getInvitationLink: (groupId: number) => Promise<string>;
}) => {
  if (!navigator.clipboard) {
    throw new Error('클립보드를 사용할 수 없습니다.');
  }

  if (!groupId) {
    throw new Error('팀 정보를 찾을 수 없습니다.');
  }

  const invitationLink = createJoinTeamLink(await getInvitationLink(groupId));
  await navigator.clipboard.writeText(invitationLink);
};

const createJoinTeamLink = (invitation: string) => {
  const origin = window.location.origin;
  const trimmedInvitation = invitation.trim();

  if (!trimmedInvitation) {
    throw new Error('초대 링크를 불러오지 못했습니다.');
  }

  let invitationUrl: URL | null = null;

  try {
    invitationUrl = trimmedInvitation.includes('://')
      ? new URL(trimmedInvitation)
      : new URL(trimmedInvitation, origin);
  } catch {
    invitationUrl = null;
  }

  if (invitationUrl) {
    const token = invitationUrl.searchParams.get('token')?.trim();

    if (token) {
      const joinTeamParams = new URLSearchParams({ token });
      const userEmail =
        invitationUrl.searchParams.get('userEmail') ?? invitationUrl.searchParams.get('email');

      if (userEmail) {
        joinTeamParams.set('userEmail', userEmail);
      }

      return `${origin}/jointeam?${joinTeamParams.toString()}`;
    }
  }

  return `${origin}/jointeam?token=${encodeURIComponent(trimmedInvitation)}`;
};

const InviteMemberModal = ({ isOpen, groupId, onClose }: InviteMemberModalProps) => {
  const { mutateAsync: getInvitationLink, isPending: isCopying } = useTeamInvitationMutation();

  const handleCopyInviteLink = async () => {
    if (isCopying) {
      return;
    }

    try {
      await copyInviteLink({
        groupId,
        getInvitationLink: (currentGroupId) => getInvitationLink({ groupId: currentGroupId }),
      });
      toast.success('초대 링크가 클립보드에 복사되었습니다.');
      onClose();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : '초대 링크를 복사하지 못했습니다.');
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      title="멤버 초대"
      description="그룹에 참여할 수 있는 링크를 복사합니다."
      primaryAction={{
        label: '링크 복사하기',
        loadingLabel: '복사 중',
        onClick: handleCopyInviteLink,
        disabled: isCopying,
        isLoading: isCopying,
      }}
      size="md"
      onClose={onClose}
    />
  );
};

export default InviteMemberModal;
