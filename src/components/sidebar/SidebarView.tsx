import Link from 'next/link';

import FoldLeftIcon from '@/assets/icons/fold_left.svg';
import FoldRightIcon from '@/assets/icons/fold_right.svg';
import LogoLarge from '@/assets/icons/logo_large.svg';

import AddGroupButton from '@/components/AddGroupButton';
import ArticleMenu from '@/components/sidebar/ArticleMenu';
import GroupSection from '@/components/sidebar/GroupSection';
import SidebarFooter from '@/components/sidebar/SidebarFooter';

interface SidebarViewProps {
  isLoggedIn: boolean;
  collapsed: boolean;
  onToggleCollapse: () => void;
}

export default function SidebarView({ isLoggedIn, collapsed, onToggleCollapse }: SidebarViewProps) {
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
          <div className="border-border-primary border-b pb-2">
            <GroupSection />
            <AddGroupButton />
          </div>
          <ArticleMenu />
        </nav>
        <SidebarFooter isLoggedIn={isLoggedIn} />
      </div>
    </aside>
  );
}
