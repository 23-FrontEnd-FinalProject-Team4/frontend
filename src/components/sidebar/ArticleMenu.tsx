import Link from 'next/link';
import { usePathname } from 'next/navigation';

import BoardIcon from '@/assets/icons/board.svg?react';

export default function ArticleMenu({ collapsed }: { collapsed: boolean }) {
  const pathname = usePathname() ?? '';
  return (
    <Link
      href="/articles"
      className={`mt-2 flex items-center gap-2 rounded-xl ${collapsed ? 'h-10 w-10 justify-center' : 'h-14 w-full gap-2 px-4'} ${
        pathname.startsWith('/articles')
          ? 'text-brand-primary bg-blue-50'
          : 'hover:bg-background-secondary'
      } `}
    >
      <BoardIcon
        className={`h-5 w-5 ${pathname.startsWith('/articles') ? 'text-brand-primary' : 'text-icon-primary'} `}
      />
      {!collapsed && <span>자유게시판</span>}
    </Link>
  );
}
