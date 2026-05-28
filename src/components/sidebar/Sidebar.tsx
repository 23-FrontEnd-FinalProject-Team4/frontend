'use client';

import { useState } from 'react';

import SidebarView from '@/components/sidebar/SidebarView';

interface SidebarProps {
  isLoggedIn: boolean;
  selected: boolean;
  collapsed: boolean;
}

export default function Sidebar({ isLoggedIn, collapsed }: SidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(collapsed);
  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };
  return (
    <SidebarView
      isLoggedIn={isLoggedIn}
      collapsed={isCollapsed}
      onToggleCollapse={toggleCollapse}
    />
  );
}
