import Link from 'next/link';
import { usePathname } from 'next/navigation';

import BoardIcon from '@/assets/icons/board.svg';

export default function ArticleMenu() {
  const pathname = usePathname();
  return (
    <Link
      href="/articles"
      className={`mt-2 flex items-center gap-2 rounded-xl p-3 ${
        pathname.startsWith('/articles')
          ? 'text-brand-primary bg-blue-50'
          : 'hover:bg-background-secondary'
      } `}
    >
      <BoardIcon
        alt="자유게시판 아이콘"
        className={`h-5 w-5 ${pathname.startsWith('/articles') ? 'text-brand-primary' : 'text-icon-primary'} `}
      />
      자유게시판
    </Link>
  );
}
