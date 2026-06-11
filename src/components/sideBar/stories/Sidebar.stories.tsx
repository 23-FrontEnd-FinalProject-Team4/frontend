import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import SideBar from '@/components/sideBar/SideBar';
import SideBarView from '@/components/sideBar/SideBarView';

const meta: Meta<typeof SideBar> = {
  title: 'components/SideBar',
  component: SideBar,
  parameters: {
    layout: 'fullscreen',
  },
  decorators: [
    (Story) => (
      <div className="bg-background-secondary h-screen">
        <Story />
      </div>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof SideBar>;

export const Default: Story = {
  args: {
    groups: [],
    isLoggedIn: true,
  },
};

export const LoggedOut: Story = {
  args: {
    groups: [],
    isLoggedIn: false,
  },
};

export const CollapsedLoggedIn: Story = {
  render: () => (
    <div className="w-[72px]">
      <SideBarView isLoggedIn={true} collapsed={true} onToggleCollapse={() => {}} groups={[]} />
    </div>
  ),
};

export const CollapsedLoggedOut: Story = {
  render: () => (
    <div className="w-[72px]">
      <SideBarView isLoggedIn={false} collapsed={true} onToggleCollapse={() => {}} groups={[]} />
    </div>
  ),
};
