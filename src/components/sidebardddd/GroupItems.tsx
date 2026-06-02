import Link from 'next/link';
import { usePathname } from 'next/navigation';

import GroupIcon from '@/assets/icons/profile.svg?react';

import type { GroupItemProps } from './type';

export default function GroupItems({ id, name, collapsed, selected }: GroupItemProps) {
  const pathname = usePathname() ?? '';
  const isSelected = selected ?? pathname.startsWith(`/groups/${id}`);

  return (
    <Link
      href={`/groups/${id}`}
      className={`flex items-center overflow-hidden rounded-xl ${
        collapsed ? 'h-10 w-10' : 'h-14 w-full gap-2 px-4'
      } ${
        isSelected
          ? collapsed
            ? 'border-brand-primary border-2'
            : 'text-brand-primary bg-blue-50'
          : 'hover:bg-background-secondary'
      } `}
    >
      {/* 각 팀에 해당하는 이미지 표시 */}
      <GroupIcon className={`text-icon-primary h-7 w-7 ${collapsed ? 'h-10 w-10' : ''}`} />
      {!collapsed && <span>{name}</span>}
    </Link>
  );
}
