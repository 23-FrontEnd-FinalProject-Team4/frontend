'use client';

import { useEffect, useState } from 'react';

import { usePathname } from 'next/navigation';

import MobileHeader from '@/components/sidebar/MobileHeader';
import SidebarView from '@/components/sidebar/SidebarView';

import useMediaQuery from '@/hooks/useMediaQuery';

interface SidebarProps {
  isLoggedIn: boolean;
  selected: boolean;
  collapsed: boolean;
}

export default function Sidebar({ isLoggedIn, selected, collapsed }: SidebarProps) {
  const [collapsedState, setCollapsedState] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const isMobile = useMediaQuery('(max-width: 743px)');
  const isDesktop = useMediaQuery('(min-width: 1280px)');

  const actualCollapsed = !isDesktop ? true : collapsedState;

  const pathname = usePathname();

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  const handleToggleCollapse = () => {
    setCollapsedState((prev) => !prev);
  };

  const handleOpenMobileMenu = () => {
    setMobileOpen(true);
  };

  const handleCloseMobileMenu = () => {
    console.log('close');
    setMobileOpen(false);
  };

  if (isMobile) {
    return (
      /* 모바일 화면에서 -> 태블릿 화면으로 넘어갈 때 보였다가 들어가는 문제 */
      //모바일 분기 처리
      <>
        <MobileHeader isLoggedIn={true} onOpenSidebar={handleOpenMobileMenu} />
        <div
          className={`fixed inset-0 z-40 bg-black/40 transition-opacity duration-300 ${
            mobileOpen ? 'opacity-100' : 'pointer-events-none opacity-0'
          } `}
          onClick={handleCloseMobileMenu}
        />

        <div
          className={`fixed top-0 left-0 z-50 transition-transform duration-300 ease-in-out ${
            mobileOpen ? 'translate-x-0 opacity-100' : '-translate-x-full opacity-0'
          } `}
        >
          <SidebarView
            isLoggedIn={isLoggedIn}
            collapsed={actualCollapsed}
            selected={selected}
            onToggleCollapse={handleCloseMobileMenu}
          />
        </div>
      </>
    );
  }

  return (
    //데스크톱, 태블릿 분기 처리
    <SidebarView
      isLoggedIn={isLoggedIn}
      collapsed={!isDesktop ? true : collapsed}
      onToggleCollapse={handleToggleCollapse}
      selected={selected}
    />
  );
}
