'use client';

import { useEffect, useState } from 'react';

import { usePathname } from 'next/navigation';

import MobileHeader from '@/components/sideBar/MobileHeader';
import MobileSideBar from '@/components/sideBar/MobileSideBar';
import SideBarView from '@/components/sideBar/SideBarView';
import type { SideBarProps } from '@/components/sideBar/type';
import useMediaQuery from '@/hooks/useMediaQuery';
import { MEDIA_QUERY } from '@/hooks/useMediaQuery';

export default function Sidebar({ isLoggedIn, isAuthLoading, groups, user }: SideBarProps) {
  const isDesktop = useMediaQuery(MEDIA_QUERY.desktop);
  const [desktopCollapsed, setDesktopCollapsed] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    if (isDesktop) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setCollapsed(desktopCollapsed);
      return;
    }

    // Desktop -> Tablet/Mobile 전환 시에는 자동으로 접힘
    setCollapsed(true);
  }, [desktopCollapsed, isDesktop]);

  useEffect(() => {
    // 페이지 이동 시 모바일 사이드바를 닫음
    // ESLint 예외처리
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMobileOpen(false);

    if (!isDesktop) {
      // 태블릿/모바일에서는 라우트 이동 시 사이드바를 자동으로 접음
      setCollapsed(true);
    }
  }, [isDesktop, pathname]);

  const handleToggleCollapse = () => {
    setCollapsed((prev) => {
      const next = !prev;

      if (isDesktop) {
        setDesktopCollapsed(next);
      }

      return next;
    });
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
        <MobileHeader
          isLoggedIn={isLoggedIn}
          isAuthLoading={isAuthLoading}
          user={user}
          onOpenSideBar={handleOpenMobileMenu}
          groups={groups}
        />
        <MobileSideBar
          mobileOpen={mobileOpen}
          groups={groups}
          onCloseMobileMenu={handleCloseMobileMenu}
        />
      </div>

      <div className="hidden md:block">
        <SideBarView
          isLoggedIn={isLoggedIn}
          isAuthLoading={isAuthLoading}
          collapsed={collapsed}
          groups={groups}
          user={user}
          onToggleCollapse={handleToggleCollapse}
        />
      </div>
    </>
  );
}
