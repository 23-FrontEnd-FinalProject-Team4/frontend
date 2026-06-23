'use client';

import { useCallback, useRef, useState } from 'react';

import KebabIcon from '@/assets/icons/kebab.svg?react';
import Dropdown from '@/components/dropdown/Dropdown';
import Profile from '@/components/profile/Profile';
import { useOutsideClick } from '@/hooks/useOutsideClick';

import type { TeamPageMember } from '../../type';

const MEMBER_MENU_OPTIONS = [{ value: 'REMOVE', label: '멤버 내보내기' }];

interface MemberItemProps {
  member: TeamPageMember;
  canManage: boolean;
  onRemove: (member: TeamPageMember) => void;
}

const getProfileSrc = (imageUrl: TeamPageMember['imageUrl']) =>
  typeof imageUrl === 'string' ? imageUrl : (imageUrl?.src ?? null);

const MemberItem = ({ member, canManage, onRemove }: MemberItemProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);
  const isAdmin = member.role === 'ADMIN';
  const canRemove = canManage && !isAdmin;

  const closeMenu = useCallback(() => {
    setIsMenuOpen(false);
  }, []);

  useOutsideClick(menuRef, closeMenu);

  const handleMenuSelect = (value: string) => {
    if (value === 'REMOVE') {
      onRemove(member);
    }
  };

  return (
    <div className="flex min-w-0 items-center gap-3">
      <Profile src={getProfileSrc(member.imageUrl)} size="md" alt={`${member.name} 프로필`} />

      <div className="min-w-0 flex-1">
        <div className="flex min-w-0 items-center gap-1.5">
          <p className="text-text-primary truncate text-sm font-semibold">{member.name}</p>
          {isAdmin && (
            <span className="bg-brand-secondary text-brand-primary shrink-0 rounded-full px-2 py-0.5 text-[11px] font-semibold">
              관리자
            </span>
          )}
        </div>
        <p className="text-text-default truncate text-xs">{member.email}</p>
      </div>

      {canRemove && (
        <div ref={menuRef} className="relative shrink-0">
          <button
            type="button"
            className="text-icon-primary hover:bg-background-secondary hover:text-brand-primary focus-visible:ring-brand-primary flex size-6 items-center justify-center rounded transition-colors focus-visible:ring-2 focus-visible:outline-none active:scale-95"
            aria-label={`${member.name} 멤버 메뉴 열기`}
            aria-haspopup="menu"
            aria-expanded={isMenuOpen}
            onClick={() => setIsMenuOpen((prev) => !prev)}
          >
            <KebabIcon className="size-4" aria-hidden="true" />
          </button>

          {isMenuOpen && (
            <Dropdown
              options={MEMBER_MENU_OPTIONS}
              size="sm"
              className="right-0 left-auto"
              onSelect={handleMenuSelect}
              onClose={closeMenu}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default MemberItem;
