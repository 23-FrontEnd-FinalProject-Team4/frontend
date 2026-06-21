'use client';

import { useState } from 'react';

import { usePathname } from 'next/navigation';

import MobileHeader from '@/components/sideBar/MobileHeader';
import MobileSideBar from '@/components/sideBar/MobileSideBar';
import SideBarView from '@/components/sideBar/SideBarView';
import type { SideBarProps } from '@/components/sideBar/type';
import useMediaQuery from '@/hooks/useMediaQuery';
import { MEDIA_QUERY } from '@/hooks/useMediaQuery';

export default function Sidebar({ isLoggedIn, isAuthLoading, groups, user }: SideBarProps) {
  const pathname = usePathname();
  const isTablet = useMediaQuery(MEDIA_QUERY.tablet);
  const isDesktop = useMediaQuery(MEDIA_QUERY.desktop);
  const [desktopCollapsed, setDesktopCollapsed] = useState(false);

  if (isDesktop) {
    return (
      <div className="hidden md:block">
        <SideBarView
          isLoggedIn={isLoggedIn}
          isAuthLoading={isAuthLoading}
          collapsed={desktopCollapsed}
          groups={groups}
          user={user}
          onToggleCollapse={() => setDesktopCollapsed((prev) => !prev)}
        />
      </div>
    );
  }

  if (isTablet) {
    return (
      <div className="hidden md:block">
        <TabletSidebar
          key={pathname}
          isLoggedIn={isLoggedIn}
          isAuthLoading={isAuthLoading}
          groups={groups}
          user={user}
        />
      </div>
    );
  }

  return (
    <div className="md:hidden">
      <MobileSidebar
        key={pathname}
        isLoggedIn={isLoggedIn}
        isAuthLoading={isAuthLoading}
        groups={groups}
        user={user}
      />
    </div>
  );
}

function TabletSidebar({ isLoggedIn, isAuthLoading, groups, user }: SideBarProps) {
  const [collapsed, setCollapsed] = useState(true);

  return (
    <SideBarView
      isLoggedIn={isLoggedIn}
      isAuthLoading={isAuthLoading}
      collapsed={collapsed}
      groups={groups}
      user={user}
      onToggleCollapse={() => setCollapsed((prev) => !prev)}
    />
  );
}

function MobileSidebar({ isLoggedIn, isAuthLoading, groups, user }: SideBarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      <MobileHeader
        isLoggedIn={isLoggedIn}
        isAuthLoading={isAuthLoading}
        user={user}
        onOpenSideBar={() => setMobileOpen(true)}
        groups={groups}
      />
      <MobileSideBar
        mobileOpen={mobileOpen}
        groups={groups}
        onCloseMobileMenu={() => setMobileOpen(false)}
      />
    </>
  );
}
