'use client';

import { useState } from 'react';

import SidebarView from '@/components/sidebar/SidebarView';

interface SidebarProps {
  isLoggedIn: boolean;
  selected: boolean;
  collapsed: boolean;
}

export default function Sidebar({ isLoggedIn, selected, collapsed }: SidebarProps) {
  const [collapsedState, setCollapsedState] = useState(collapsed);
  const handleToggleCollapse = () => {
    setCollapsedState((prev) => !prev);
  };
  return (
    <SidebarView
      isLoggedIn={isLoggedIn}
      collapsed={collapsedState}
      onToggleCollapse={handleToggleCollapse}
      selected={selected}
    />
  );
}
