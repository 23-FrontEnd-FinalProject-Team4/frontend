import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import type { GroupItemProps } from '@/components/sideBar/type';
import { cn } from '@/utils/cn';
import { normalizeImageUrl } from '@/utils/image';
import { isAllowedImageUrl } from '@/utils/isAllowedImageUrl';

const GroupItems = ({ id, name, route, image, collapsed, selected }: GroupItemProps) => {
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
        {isAllowedImageUrl(imageSrc) ? (
          <Image
            src={imageSrc}
            alt={`${name} 팀 이미지`}
            fill
            className="object-cover"
            sizes={collapsed ? '80px' : '56px'}
          />
        ) : (
          <div className="bg-brand-primary text-text-inverse flex h-full w-full items-center justify-center text-[12px] font-semibold">
            <span aria-hidden="true">{name?.trim()?.charAt(0).toUpperCase()}</span>
            {collapsed && name && <span className="sr-only">{name}</span>}{' '}
          </div>
        )}
      </div>
      {!collapsed && <span>{name}</span>}
    </Link>
  );
};

export default GroupItems;
