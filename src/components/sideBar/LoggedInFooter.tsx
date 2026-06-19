'use client';
import { useState } from 'react';

import { useRouter } from 'next/navigation';

import { User } from '@/apis/auth/type';
import { logout } from '@/app/_actions/logout.action';
import ProfileIcon from '@/assets/icons/profile.svg?react';
import SettingsIcon from '@/assets/icons/setting.svg?react';
import Dropdown from '@/components/dropdown/Dropdown';

export const openProfileMenu = () => {
  return [
    { label: '마이 히스토리', value: 'history' },
    { label: '계정 설정', value: 'account' },
    { label: '팀 참여', value: 'team' },
    { label: '로그아웃', value: 'logout' },
  ];
};

export const handleOpenProfileMenu = async (
  value: string,
  router: ReturnType<typeof useRouter>,
) => {
  switch (value) {
    case 'history':
      router.push('/my-history');
      break;
    case 'account':
      router.push('/settings');
      break;
    case 'team':
      router.push('/addteam');
      break;
    case 'logout':
      await logout();
      router.replace('/login');
      break;
  }
};

export default function LoggedInFooter({
  isLoggedIn,
  collapsed,
  user,
}: {
  isLoggedIn: boolean;
  collapsed: boolean;
  user: User;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const toggleOpen = () => setIsOpen(!isOpen);
  const router = useRouter();

  return (
    <div
      className={`relative flex w-full items-center border-t border-[#E2E8F0] pt-6 ${
        collapsed ? 'justify-center' : 'justify-between'
      }`}
    >
      <div className="flex flex-row items-center gap-3">
        {/* 사용자 프로필 출력 */}
        <ProfileIcon className="h-10 w-10" />
        {!collapsed && <span>{user.nickname}</span>}
      </div>

      {!collapsed && isLoggedIn && (
        <div className="relative">
          <SettingsIcon className="h-6 w-6 cursor-pointer" onClick={toggleOpen} />

          {isOpen && (
            <div className="absolute right-30 bottom-50 z-20 mb-2">
              <Dropdown
                options={openProfileMenu()}
                onSelect={async (value) => {
                  await handleOpenProfileMenu(value, router);
                }}
                onClose={toggleOpen}
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
}
