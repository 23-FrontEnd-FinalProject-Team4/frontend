'use client';

import { useRef, useState } from 'react';

import { notFound, useRouter } from 'next/navigation';

import { overlay } from 'overlay-kit';
import toast from 'react-hot-toast';

import SettingIcon from '@/assets/icons/setting.svg?react';
import Dropdown from '@/components/dropdown/Dropdown';
import { OPTIONS } from '@/constants/listItem';
import { useGetGroup } from '@/queries/group/queries';
import { useDeleteTeamMutation } from '@/queries/teams/queries';

import DeleteTeamModal from '../../_components/modals/DeleteTeamModal';

interface TaskListHeaderProps {
  groupId: number;
}

const TaskListHeader = ({ groupId }: TaskListHeaderProps) => {
  const { data: groupInfo } = useGetGroup({ groupId });

  const [isDropdownMenuOpen, setIsDropdownMenuOpen] = useState(false);
  const router = useRouter();
  const dropdownRef = useRef(null);
  const { mutateAsync: deleteTeam } = useDeleteTeamMutation();

  if (!groupInfo) return notFound();

  const handleEditTeam = () => {
    if (!groupId) {
      toast.error('팀 정보를 찾을 수 없습니다.');
      return;
    }

    setIsDropdownMenuOpen(false);
    router.push(`/${groupId}/editteam`);
  };

  const openDeleteTeamModal = () => {
    if (!groupId) {
      toast.error('팀 정보를 찾을 수 없습니다.');
      return;
    }

    setIsDropdownMenuOpen(false);

    overlay.open(({ isOpen, close }) => {
      const handleDeleteTeam = async () => {
        try {
          await deleteTeam({ groupId });
        } catch (error) {
          toast.error(error instanceof Error ? error.message : '팀을 삭제하지 못했습니다.');
          return false;
        }
        router.push(`/`);

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
