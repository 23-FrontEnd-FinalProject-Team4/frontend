import Link from 'next/link';

import FoldLeftIcon from '@/assets/icons/fold_left.svg?react';
import FoldRightIcon from '@/assets/icons/fold_right.svg?react';
import LogoLarge from '@/assets/icons/logo_large.svg?react';
import LogoSmall from '@/assets/icons/logo_small.svg?react';
import { cn } from '@/utils/cn';

import AddGroupButton from '@/components/sideBar/AddGroupButton';
import ArticleMenu from '@/components/sideBar/ArticleMenu';
import GroupSection from '@/components/sideBar/GroupSection';
import SidebarFooter from '@/components/sideBar/SideBarFooter';
import type { SidebarViewProps } from '@/components/sideBar/type';

export default function SidebarView({
  isLoggedIn,
  collapsed,
  groups,
  onToggleCollapse,
}: SideBarViewProps) {
  return (
    <aside
      className={cn(
        'bg-background-primary sticky top-0 flex h-screen shrink-0 flex-col py-6 transition-[width] duration-300',
        collapsed ? 'w-[72px] justify-center px-2' : 'w-[272px] px-4',
      )}
    >
      <div className="flex h-full flex-col">
        <Link
          href="/"
          className={cn(
            'flex h-8 w-full items-center',
            collapsed ? 'justify-center' : 'justify-start',
          )}
        >
          {collapsed ? (
            <LogoSmall
              className={cn('block h-8 shrink-0', collapsed ? 'opacity-100' : 'opacity-0')}
            />
          ) : (
            <LogoLarge
              className={cn('block w-36 shrink-0', collapsed ? 'opacity-0' : 'opacity-100')}
            />
          )}
        </Link>
        {/* 사이드바 접기/열기 버튼 */}
        <button type="button" onClick={onToggleCollapse}>
          {collapsed ? (
            <span
              className={cn(
                'border-brand-secondary bg-background-inverse absolute top-6 right-[-20px] z-20 flex h-8 w-8 items-center justify-center rounded-full border pl-1',
              )}
            >
              <FoldRightIcon className="h-6 w-6" />
            </span>
          ) : (
            <FoldLeftIcon
              className={cn('absolute top-6 right-4 z-20 flex h-6 w-6 items-center justify-center')}
            />
          )}
        </button>

        <nav className={cn('flex w-full flex-1 flex-col gap-2 pt-6')}>
          {isLoggedIn ? (
            <div
              className={cn('flex w-full flex-col', collapsed ? 'items-center' : 'items-stretch')}
            >
              <div
                className={cn(
                  'border-border-primary border-b pb-2',

                  !collapsed && 'w-full',
                )}
              >
                <GroupSection collapsed={collapsed} groups={groups} />
                {!collapsed && <AddGroupButton />}
              </div>
              <ArticleMenu collapsed={collapsed} />
            </div>
          ) : null}
        </nav>

        {/* 계정 설정 모달 출력 */}
        <SidebarFooter isLoggedIn={isLoggedIn} collapsed={collapsed} />
      </div>
    </aside>
  );
}
