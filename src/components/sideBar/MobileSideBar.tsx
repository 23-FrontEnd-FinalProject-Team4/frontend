import CloseIcon from '@/assets/icons/x.svg?react';
import { cn } from '@/utils/cn';

import AddGroupButton from '@/components/sideBar/AddGroupButton';
import ArticleMenu from '@/components/sideBar/ArticleMenu';
import GroupSection from '@/components/sideBar/GroupSection';
import type { MobileSidebarProps } from '@/components/sideBar/type';

export default function MobileSidebar({
  mobileOpen,
  groups,
  onCloseMobileMenu,
}: MobileSidebarProps) {
  return (
    <>
      {/* Overlay */}
      <div
        role="presentation"
        className={cn(
          'fixed inset-0 z-40 bg-black/50 transition-opacity',
          mobileOpen ? 'opacity-100' : 'pointer-events-none opacity-0',
        )}
        onClick={onCloseMobileMenu}
      />

      {/* Drawer */}
      <aside
        className={cn(
          'bg-background-primary border-border-primary fixed top-0 left-0 z-50 flex h-screen w-[204px] flex-col border-b px-4 py-6 transition-transform duration-300',
          mobileOpen ? 'translate-x-0' : '-translate-x-full',
        )}
      >
        <button type="button" onClick={onCloseMobileMenu} className="mb-4 ml-auto">
          <CloseIcon className="h-6 w-6" />
        </button>

        <div className="border-border-primary border-b pb-2">
          <GroupSection collapsed={false} groups={groups} />

          <div className="mt-4">
            <AddGroupButton />
          </div>
        </div>

        <div className="pt-4">
          <ArticleMenu collapsed={false} />
        </div>
      </aside>
    </>
  );
}
