import Link from 'next/link';

import { User } from '@/apis/auth/type';
import FoldLeftIcon from '@/assets/icons/fold_left.svg?react';
import FoldRightIcon from '@/assets/icons/fold_right.svg?react';
import LogoLarge from '@/assets/icons/logo_large.svg?react';
import LogoSmall from '@/assets/icons/logo_small.svg?react';
import AddGroupButton from '@/components/sideBar/AddGroupButton';
import ArticleMenu from '@/components/sideBar/ArticleMenu';
import GroupSection from '@/components/sideBar/GroupSection';
import SidebarFooter from '@/components/sideBar/SideBarFooter';
import type { Group } from '@/components/sideBar/type';
import { cn } from '@/utils/cn';

export default function SideBarView({
  isLoggedIn,
  isAuthLoading,
  collapsed,
  groups,
  user,
  onToggleCollapse,
}: {
  isLoggedIn: boolean;
  isAuthLoading: boolean;
  collapsed: boolean;
  groups: Group[];
  user: User | undefined;
  onToggleCollapse: () => void;
}) {
  const logoHref = isLoggedIn && groups.length > 0 ? `/${groups[0].id}` : '/';
  return (
    <aside
      className={cn(
        'bg-background-primary border-border-primary sticky top-0 z-30 flex h-screen shrink-0 flex-col overflow-visible border-r py-6 transition-[width] duration-300',
        collapsed ? 'w-18 justify-center px-2' : 'w-68 px-4',
      )}
    >
      <div className="flex h-full flex-col">
        <Link
          href={logoHref}
          className={cn(
            'flex h-8 w-full items-center',
            collapsed ? 'justify-center' : 'justify-start',
          )}
        >
          {collapsed ? (
            <LogoSmall
              className={cn('block h-8 w-8 shrink-0', collapsed ? 'opacity-100' : 'opacity-0')}
            />
          ) : (
            <LogoLarge
              className={cn('block w-36 shrink-0', collapsed ? 'opacity-0' : 'opacity-100')}
            />
          )}
        </Link>
        {/* 사이드바 접기/열기 버튼 */}
        <button
          type="button"
          className={cn(
            'focus-visible:ring-brand-primary absolute top-6 z-40 flex items-center justify-center transition-transform focus-visible:ring-2 focus-visible:outline-none active:scale-95',
            collapsed
              ? 'border-brand-secondary bg-background-inverse -right-4 h-8 w-8 rounded-full border pl-1'
              : 'right-4 h-6 w-6',
          )}
          onClick={onToggleCollapse}
        >
          {collapsed ? <FoldRightIcon className="h-6 w-6" /> : <FoldLeftIcon className="h-6 w-6" />}
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
        <SidebarFooter
          isLoggedIn={isLoggedIn}
          isAuthLoading={isAuthLoading}
          collapsed={collapsed}
          user={user}
        />
      </div>
    </aside>
  );
}
