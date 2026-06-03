'use client';

import { useEffect, useState } from 'react';

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
  const isDesktop = useMediaQuery('(min-width: 1280px)');

  const [collapsed, setCollapsed] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    setCollapsed(!isDesktop);
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
  return (
    <>
      <div className="md:hidden">
        <MobileHeader isLoggedIn={isLoggedIn} onOpenSidebar={handleOpenMobileMenu} />
        <MobileSideBar
          mobileOpen={mobileOpen}
          groups={mockGroups}
          onCloseMobileMenu={handleCloseMobileMenu}
        />
      </div>

      <div className="hidden md:block">
        <SidebarView
          isLoggedIn={isLoggedIn}
          collapsed={collapsed}
          onToggleCollapse={handleToggleCollapse}
          groups={mockGroups}
        />
      </div>
    </>
  );
}
