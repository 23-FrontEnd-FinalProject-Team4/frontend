import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import AddGroupButton from '@/components/sideBar/AddGroupButton';

const meta: Meta<typeof AddGroupButton> = {
  title: 'components/SideBar/AddGroupButton',
  component: AddGroupButton,
  parameters: {
    layout: 'centered',
  },
  decorators: [
    (Story) => (
      <div className="w-[272px]">
        <Story />
      </div>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof AddGroupButton>;

export const Default: Story = {};
