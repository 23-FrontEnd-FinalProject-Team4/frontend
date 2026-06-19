import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import SideBarView from '@/components/sideBar/SideBarView';

const meta: Meta<typeof SideBarView> = {
  title: 'components/SideBar',
  component: SideBarView,
  parameters: {
    layout: 'fullscreen',
    nextjs: {
      appDirectory: true,
      navigation: {
        pathname: '/',
      },
    },
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

type Story = StoryObj<typeof SideBarView>;

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
      <SideBarView
        isLoggedIn={true}
        collapsed={true}
        onToggleCollapse={() => {}}
        groups={[]}
        user={{
          id: 1,
          nickname: 'John Doe',
          email: 'john.doe@example.com',
          image: '/images/profile.jpg',
          teamId: '1',
          createdAt: '2026-06-19',
          updatedAt: '2026-06-19',
        }}
      />
    </div>
  ),
};

export const CollapsedLoggedOut: Story = {
  render: () => (
    <div className="w-[72px]">
      <SideBarView
        isLoggedIn={false}
        collapsed={true}
        onToggleCollapse={() => {}}
        groups={[]}
        user={undefined}
      />
    </div>
  ),
};
