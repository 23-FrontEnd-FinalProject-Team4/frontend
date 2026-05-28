import Link from 'next/link';
import { usePathname } from 'next/navigation';

import GroupIcon from '@/assets/icons/profile.svg';

type GroupItemProps = {
  id: number;
  name: string;
  selected: boolean;
};

export default function GroupItems({ id, name, selected }: GroupItemProps) {
  const pathname = usePathname();
  return (
    <Link
      href={`/groups/${id}`}
      className={`flex items-center gap-2 rounded-xl p-3 ${
        pathname.startsWith('/articles')
          ? 'text-brand-primary bg-blue-50'
          : 'hover:bg-background-secondary'
      } `}
    >
      {/* 각 팀에 해당하는 이미지 표시 필요 */}
      <GroupIcon alt="그룹 이지" className="text-icon-primary h-7 w-7" />
      <span>{name}</span>
    </Link>
  );
}
