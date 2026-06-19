import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import GroupIcon from '@/assets/icons/profile.svg?react';
import type { GroupItemProps } from '@/components/sideBar/type';
import { cn } from '@/utils/cn';
import { normalizeImageUrl } from '@/utils/image';

export default function GroupItems({
  id,
  name,
  route,
  image,
  collapsed,
  selected,
}: GroupItemProps) {
  const pathname = usePathname() ?? '';
  const href = route ?? `/groups/${id}`;
  const isSelected = selected ?? pathname.startsWith(href);
  const imageSrc = normalizeImageUrl(image);

  return (
    <Link
      href={href}
      className={`focus-visible:ring-brand-primary flex items-center overflow-hidden rounded-xl transition-all duration-200 focus-visible:ring-2 focus-visible:outline-none active:scale-[0.98] ${
        collapsed ? 'h-10 w-10' : 'h-14 w-full gap-2 px-4'
      } ${
        isSelected
          ? collapsed
            ? 'border-brand-primary border-2'
            : 'text-brand-primary bg-brand-secondary'
          : 'hover:bg-background-secondary hover:text-brand-primary'
      } `}
    >
      <div
        className={cn(
          'relative shrink-0 overflow-hidden rounded-md',
          collapsed ? 'h-10 w-10' : 'h-7 w-7',
        )}
      >
        {imageSrc ? (
          <Image
            src={imageSrc}
            alt={`${name} 팀 이미지`}
            fill
            className="object-cover"
            quality={100}
            sizes={collapsed ? '80px' : '56px'}
          />
        ) : (
          <GroupIcon className="text-icon-primary h-full w-full" />
        )}
      </div>
      {!collapsed && <span>{name}</span>}
    </Link>
  );
}
