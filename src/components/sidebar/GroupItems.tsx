import Link from 'next/link';

import GroupIcon from '@/assets/icons/profile.svg';

type GroupItemProps = {
  id: number;
  name: string;
  selected: boolean;
};

export default function GroupItems({ id, name, selected }: GroupItemProps) {
  return (
    <Link
      href={`/articles/${id}`}
      className={`flex items-center gap-2 rounded-xl p-3 ${
        selected ? 'text-brand-primary bg-blue-50' : 'hover:bg-background-secondary'
      } `}
    >
      <GroupIcon alt="자유게시판 아이콘" className="text-icon-primary h-7 w-7" />
      <span>{name}</span>
    </Link>
  );
}
