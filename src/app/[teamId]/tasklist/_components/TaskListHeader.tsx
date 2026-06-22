'use client';

import { useRef, useState } from 'react';

import { notFound, useRouter } from 'next/navigation';

import { useQueryClient } from '@tanstack/react-query';
import { overlay } from 'overlay-kit';
import toast from 'react-hot-toast';

import SettingIcon from '@/assets/icons/setting.svg?react';
import Dropdown from '@/components/dropdown/Dropdown';
import { OPTIONS } from '@/constants/listItem';
import { useGetGroup, useGetGroups } from '@/queries/group/queries';
import { groupKeys } from '@/queries/group/queryKey';
import { useDeleteTeamMutation } from '@/queries/teams/queries';

import DeleteTeamModal from '../../_components/modals/DeleteTeamModal';

interface TaskListHeaderProps {
  groupId: number;
}

const TaskListHeader = ({ groupId }: TaskListHeaderProps) => {
  const { data: groups, isPending: isGroupsPending } = useGetGroups();
  const { data: groupInfo, isPending: isGroupPending } = useGetGroup({ groupId });
  const queryClient = useQueryClient();

  const [isDropdownMenuOpen, setIsDropdownMenuOpen] = useState(false);
  const router = useRouter();
  const dropdownRef = useRef(null);
  const { mutateAsync: deleteTeam } = useDeleteTeamMutation();

  if (isGroupsPending || isGroupPending) {
    return <div className="bg-background-secondary h-9 w-48 animate-pulse rounded-xl" />;
  }

  if (!groupInfo || !groups) return notFound();

  const handleEditTeam = () => {
    setIsDropdownMenuOpen(false);
    router.push(`/${groupId}/editteam`);
  };

  const openDeleteTeamModal = () => {
    setIsDropdownMenuOpen(false);

    overlay.open(({ isOpen, close }) => {
      const handleDeleteTeam = async () => {
        try {
          await deleteTeam({ groupId });
        } catch (error) {
          toast.error(error instanceof Error ? error.message : '팀을 삭제하지 못했습니다.');
          return false;
        }

        const nextGroupId = groups.find((g) => g.id !== groupId)?.id;
        toast.success('팀을 삭제했습니다.');
        await Promise.all([
          queryClient.invalidateQueries({ queryKey: ['sidebar'] }),
          queryClient.invalidateQueries({ queryKey: ['team-page'] }),
          queryClient.invalidateQueries({ queryKey: groupKeys.all() }),
        ]);

        router.push(nextGroupId ? `/${nextGroupId}` : '/no-team');
        close();
        return true;
      };

      return (
        <DeleteTeamModal
          isOpen={isOpen}
          teamName={groupInfo.name}
          onClose={close}
          onDelete={handleDeleteTeam}
        />
      );
    });
  };

  const handleMenuItemSelect = (value: string) => {
    if (value === 'EDIT') {
      handleEditTeam();
    } else {
      openDeleteTeamModal();
    }
  };

  return (
    <div
      className={`text-text-primary xl:outline-border-primary relative flex items-center gap-2 rounded-xl bg-transparent text-center text-2xl font-bold xl:w-full xl:justify-between xl:bg-white xl:px-6 xl:py-4.5 xl:outline`}
    >
      {groupInfo.name}
      <div className="relative flex items-center">
        <button
          type="button"
          aria-label="설정"
          onClick={() => setIsDropdownMenuOpen((prev) => !prev)}
        >
          <SettingIcon className="size-6" />
        </button>
        {isDropdownMenuOpen && (
          <div
            className="absolute top-full right-0"
            ref={dropdownRef}
            onClick={(e) => e.stopPropagation()}
          >
            <Dropdown options={OPTIONS} onSelect={handleMenuItemSelect} />
          </div>
        )}
      </div>
    </div>
  );
};

export default TaskListHeader;
