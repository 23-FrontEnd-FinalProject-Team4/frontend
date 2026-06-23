'use client';

import { useState } from 'react';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import MenuIcon from '@/assets/icons/gnb_menu.svg?react';
import LogoLarge from '@/assets/icons/logo_large.svg?react';
import LogoSmall from '@/assets/icons/logo_small.svg?react';
import ProfileIcon from '@/assets/icons/profile.svg?react';
import type { MobileHeaderProps } from '@/components/sideBar/type';
import { cn } from '@/utils/cn';
import { normalizeImageUrl } from '@/utils/image';
import {
  PROFILE_MENU_OPTIONS,
  type ProfileMenuValue,
  handleProfileMenuSelect,
} from '@/utils/profileMenu';

import Dropdown from '../dropdown/Dropdown';

export default function MobileHeader({
  isLoggedIn,
  isAuthLoading,
  user,
  onOpenSideBar,
  groups,
}: MobileHeaderProps) {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const toggleOpen = () => setIsOpen(!isOpen);
  const logoHref = isLoggedIn && groups.length > 0 ? `/${groups[0].id}` : '/';
  const profileImageSrc = normalizeImageUrl(user?.image);
  return (
    <header
      className={cn(
        'bg-background-primary border-brand-secondary fixed z-20 flex h-16 w-full items-center justify-between border px-5 md:hidden',
      )}
    >
      <div className={cn('flex items-center gap-4')}>
        {isLoggedIn ? (
          <button type="button" aria-label="사이드바 열기" onClick={onOpenSideBar}>
            <MenuIcon className="h-6 w-6" aria-hidden="true" />
          </button>
        ) : (
          ''
        )}
        {isLoggedIn ? (
          <Link href={logoHref} aria-label="Coworkers 홈으로 이동">
            <LogoSmall className="h-6 w-6" aria-hidden="true" />
          </Link>
        ) : (
          <Link href="/" aria-label="Coworkers 홈으로 이동">
            <LogoLarge className="h-6" aria-hidden="true" />
          </Link>
        )}
      </div>

      {user ? (
        <div className="relative z-10">
          <button type="button" aria-label="프로필 메뉴 열기" onClick={toggleOpen}>
            <div className="relative h-8 w-8 overflow-hidden rounded-lg">
              {profileImageSrc ? (
                <Image
                  src={profileImageSrc}
                  alt={`${user.nickname} 프로필 이미지`}
                  fill
                  className="object-cover"
                  sizes="32px"
                />
              ) : (
                <ProfileIcon className="h-8 w-8 rounded-lg" />
              )}
            </div>
          </button>

          {isOpen && (
            <div className="absolute right-20 bottom-0">
              <Dropdown
                size="sm"
                options={PROFILE_MENU_OPTIONS}
                onSelect={async (value) => {
                  await handleProfileMenuSelect(value as ProfileMenuValue, router);
                }}
                onClose={toggleOpen}
              />
            </div>
          )}
        </div>
      ) : !isAuthLoading ? (
        <Link href="/login" className={cn('text-brand-tertiary text-md')}>
          로그인
        </Link>
      ) : (
        <div className="h-8 w-8" />
      )}
    </header>
  );
}
