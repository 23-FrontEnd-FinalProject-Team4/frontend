import Link from 'next/link';

import FoldLeftIcon from '@/assets/icons/fold_left.svg?react';
import FoldRightIcon from '@/assets/icons/fold_right.svg?react';
import LogoLarge from '@/assets/icons/logo_large.svg?react';
import LogoSmall from '@/assets/icons/logo_small.svg?react';

import AddGroupButton from '@/components/sidebar/AddGroupButton';
import ArticleMenu from '@/components/sidebar/ArticleMenu';
import GroupSection from '@/components/sidebar/GroupSection';
import SidebarFooter from '@/components/sidebar/SidebarFooter';

interface SidebarViewProps {
  isLoggedIn: boolean;
  collapsed: boolean;
  onToggleCollapse: () => void;
  selected: boolean;
}

export default function SidebarView({
  isLoggedIn,
  collapsed,
  onToggleCollapse,
  selected,
}: SidebarViewProps) {
  return (
    <aside
      className={`bg-background-primary relative flex h-screen flex-col px-4 py-6 transition-[width] duration-300 ${collapsed ? 'w-[72px] justify-center px-2' : 'w-[272px] px-4'}`}
    >
      <div className="flex h-full flex-col">
        <Link
          href="/"
          className={`flex h-8 w-full items-center ${collapsed ? 'justify-center' : 'justify-start'}`}
        >
          {collapsed ? (
            <LogoSmall
              className={`block h-8 shrink-0 ${collapsed ? 'opacity-100' : 'opacity-0'}`}
            />
          ) : (
            <LogoLarge
              className={`block w-36 shrink-0 ${collapsed ? 'opacity-0' : 'opacity-100'}`}
            />
          )}
        </Link>
        {/* 사이드바 접기/열기 버튼 */}
        <button type="button" onClick={onToggleCollapse}>
          {collapsed ? (
            <p className="border-brand-secondary bg-background-inverse absolute top-6 right-[-20px] z-20 flex h-8 w-8 items-center justify-center rounded-full border pl-1">
              <FoldRightIcon className="h-6 w-6" />
            </p>
          ) : (
            <FoldLeftIcon className="absolute top-6 right-4 z-20 flex h-6 w-6 items-center justify-center" />
          )}
        </button>

        <nav className="flex flex-1 flex-col gap-2 pt-6">
          {isLoggedIn ? (
            <>
              <div className="border-border-primary border-b pb-2">
                <GroupSection collapsed={collapsed} selected={selected} />
                {!collapsed && <AddGroupButton />}
              </div>
              <ArticleMenu collapsed={collapsed} />
            </>
          ) : null}
        </nav>

        {/* 계정 설정 모달 출력 */}
        <SidebarFooter isLoggedIn={isLoggedIn} collapsed={collapsed} />
      </div>
    </aside>
  );
}
