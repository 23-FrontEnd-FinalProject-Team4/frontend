import Link from 'next/link';

import BoardIcon from '@/assets/icons/board.svg';
import FoldLeftIcon from '@/assets/icons/fold_left.svg';
import FoldRightIcon from '@/assets/icons/fold_right.svg';
import LogoLarge from '@/assets/icons/logo_large.svg';
import PlusIcon from '@/assets/icons/plus.svg';

import GroupSection from '@/components/sidebar/GroupSection';
import SidebarFooter from '@/components/sidebar/SidebarFooter';

interface SidebarViewProps {
  isLoggedIn: boolean;
  selected: boolean;
  collapsed: boolean;
  onToggleCollapse: () => void;
}

export default function SidebarView({
  isLoggedIn,
  selected,
  collapsed,
  onToggleCollapse,
}: SidebarViewProps) {
  return (
    <aside className="bg-background-primary flex h-screen w-68 flex-col px-4 py-6">
      <div className="flex h-full flex-col">
        <div className="flex justify-between">
          <Link href="/">
            <LogoLarge alt="COWORKERS Logo" className="h-8 w-36" />
          </Link>
          {/* 사이드바 접기/열기 버튼 */}
          <button type="button" onClick={onToggleCollapse}>
            <FoldLeftIcon alt="메뉴 접기 아이콘" className="h-7 w-7" />
          </button>
        </div>

        <nav className="flex h-screen flex-col gap-2 pt-6">
          {/* 내가 속한 팀 출력 */}
          {/* 컴포넌트로 따로 빼기 */}
          <div className="border-border-primary border-b pb-2">
            <GroupSection />
            <Link
              href="/addteam"
              type="button"
              className="border-brand-primary text-brand-primary text-md my-3 flex w-full items-center justify-center gap-1 rounded-full border px-3 py-2"
            >
              <PlusIcon alt="팀 추가 아이콘" className="h-4 w-4" />팀 추가하기
            </Link>
          </div>
          <Link
            href="/articles"
            className={`text-g mt-2 flex items-center gap-2 rounded-xl p-3 ${
              selected ? 'text-brand-primary bg-blue-50' : 'hover:bg-background-secondary'
            } `}
          >
            <BoardIcon alt="자유게시판 아이콘" className="text-icon-primary h-5 w-5" />
            자유게시판
          </Link>
        </nav>
        <SidebarFooter isLoggedIn={isLoggedIn} />
      </div>
    </aside>
  );
}
