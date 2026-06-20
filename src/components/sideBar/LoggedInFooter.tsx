'use client';
import { useState } from 'react';

import { useRouter } from 'next/navigation';

import { User } from '@/apis/auth/type';
import ProfileIcon from '@/assets/icons/profile.svg?react';
import SettingsIcon from '@/assets/icons/setting.svg?react';
import Dropdown from '@/components/dropdown/Dropdown';
import {
  PROFILE_MENU_OPTIONS,
  type ProfileMenuValue,
  handleProfileMenuSelect,
} from '@/utils/profileMenu';

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
            <div className="absolute right-[112px] bottom-[200px] z-20 mb-2">
              <Dropdown
                options={PROFILE_MENU_OPTIONS}
                onSelect={async (value) => {
                  await handleProfileMenuSelect(value as ProfileMenuValue, router);
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
