export type Group = {
  id: number;
  name: string;
};

export type GroupItemProps = Group & {
  collapsed: boolean;
  selected?: boolean;
};

export type GroupSectionProps = {
  groups: Group[];
  collapsed: boolean;
};

export type SidebarProps = {
  isLoggedIn: boolean;
  groups: Group[];
};

export type SidebarViewProps = {
  isLoggedIn: boolean;
  collapsed: boolean;
  groups: Group[];
  onToggleCollapse: () => void;
};

export type SidebarFooterProps = {
  isLoggedIn: boolean;
  collapsed: boolean;
};

export type MobileHeaderProps = {
  isLoggedIn: boolean;
  onOpenSidebar: () => void;
};

export type MobileSidebarProps = {
  mobileOpen: boolean;
  groups: Group[];
  onCloseMobileMenu: () => void;
};
