'use client';

import { useEffect, useRef, useState } from 'react';

import { usePathname } from 'next/navigation';

import MobileHeader from '@/components/sidebar/MobileHeader';
import SidebarView from '@/components/sidebar/SidebarView';

import useMediaQuery from '@/hooks/useMediaQuery';

interface SidebarProps {
  isLoggedIn: boolean;
  selected: boolean;
}

export default function Sidebar({ isLoggedIn, selected }: SidebarProps) {
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
    console.log('close');
    setMobileOpen(false);
  };

  if (isMobile) {
    return (
      /* 모바일 화면에서 -> 태블릿 화면으로 넘어갈 때 보였다가 들어가는 문제 */
      //모바일 분기 처리
      <>
        <MobileHeader isLoggedIn={isLoggedIn} onOpenSidebar={handleOpenMobileMenu} />
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
            collapsed={collapsed}
            selected={selected}
            onToggleCollapse={handleCloseMobileMenu}
          />
        </div>
      </>
    );
  }

  return (
    <SidebarView
      isLoggedIn={isLoggedIn}
      collapsed={collapsed}
      onToggleCollapse={handleToggleCollapse}
      selected={selected}
    />
  );
}
