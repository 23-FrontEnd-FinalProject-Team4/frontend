'use client';

import { useEffect, useState } from 'react';

import { usePathname } from 'next/navigation';

import MobileHeader from '@/components/sideBar/MobileHeader';
import MobileSideBar from '@/components/sideBar/MobileSideBar';
import SideBarView from '@/components/sideBar/SideBarView';
import type { SideBarProps } from '@/components/sideBar/type';

import useMediaQuery from '@/hooks/useMediaQuery';

export default function Sidebar({ isLoggedIn, groups }: SideBarProps) {
  const isDesktop = useMediaQuery('(min-width: 1024px)');
  const [userCollapsed, setUserCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  // Mobile에서는 항상 접힌 상태를 사용하고,
  // Tablet/Desktop에서는 사용자가 선택한 상태를 유지
  const collapsed = isDesktop ? userCollapsed : true;

  useEffect(() => {
    // 페이지 이동 시 모바일 사이드바를 닫음
    // ESlint 예외처리
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMobileOpen(false);
  }, [pathname]);

  const handleToggleCollapse = () => {
    setUserCollapsed((prev) => !prev);
  };

  const handleOpenMobileMenu = () => {
    setMobileOpen(true);
  };

  const handleCloseMobileMenu = () => {
    setMobileOpen(false);
  };

  return (
    <>
      <div className="md:hidden">
        <MobileHeader isLoggedIn={isLoggedIn} onOpenSideBar={handleOpenMobileMenu} />
        <MobileSideBar
          mobileOpen={mobileOpen}
          groups={groups}
          onCloseMobileMenu={handleCloseMobileMenu}
        />
      </div>

      <div className="hidden md:block">
        <SideBarView
          isLoggedIn={isLoggedIn}
          collapsed={collapsed}
          onToggleCollapse={handleToggleCollapse}
          groups={groups}
        />
      </div>
    </>
  );
}
