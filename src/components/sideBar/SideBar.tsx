'use client';

import { useEffect, useRef, useState } from 'react';

import { usePathname } from 'next/navigation';

import MobileHeader from '@/components/sideBar/MobileHeader';
import MobileSideBar from '@/components/sideBar/MobileSideBar';
import SidebarView from '@/components/sideBar/SideBarView';
import type { SidebarProps } from '@/components/sideBar/type';

import useMediaQuery from '@/hooks/useMediaQuery';

const mockGroups = [
  {
    id: 1,
    name: '프론트엔드',
  },
  {
    id: 2,
    name: '백엔드',
  },
  {
    id: 3,
    name: '디자인',
  },
];

export default function Sidebar({ isLoggedIn, groups = mockGroups }: SidebarProps) {
  const isMobile = useMediaQuery('(max-width: 743px)');
  const isDesktop = useMediaQuery('(min-width: 1280px)');

  const [collapsed, setCollapsed] = useState(() => !isDesktop);
  const [mobileOpen, setMobileOpen] = useState(false);
  const prevIsDesktop = useRef(isDesktop);

  useEffect(() => {
    if (prevIsDesktop.current !== isDesktop) {
      setCollapsed(!isDesktop);

      prevIsDesktop.current = isDesktop;
    }
  }, [isDesktop]);

  const pathname = usePathname();
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  const handleToggleCollapse = () => {
    setCollapsed((prev) => !prev);
  };

  const handleOpenMobileMenu = () => {
    setMobileOpen(true);
  };

  const handleCloseMobileMenu = () => {
    setMobileOpen(false);
  };

  if (isMobile) {
    return (
      /* 모바일 화면에서 -> 태블릿 화면으로 넘어갈 때 보였다가 들어가는 문제 */
      //모바일 분기 처리
      <>
        <MobileHeader isLoggedIn={isLoggedIn} onOpenSidebar={handleOpenMobileMenu} />
        <MobileSideBar
          mobileOpen={mobileOpen}
          groups={mockGroups}
          onCloseMobileMenu={handleCloseMobileMenu}
        />
      </>
    );
  }

  return (
    <SidebarView
      isLoggedIn={isLoggedIn}
      collapsed={collapsed}
      onToggleCollapse={handleToggleCollapse}
      groups={mockGroups}
    />
  );
}
