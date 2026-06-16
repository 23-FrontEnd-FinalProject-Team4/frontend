import { Meta, StoryObj } from '@storybook/nextjs-vite';
import { fn } from 'storybook/test';

import { MOCK_TASKLISTS } from '../_constants/mockData';
import InfoOverlay from './InfoOverlay';

const meta = {
  component: InfoOverlay,
  title: 'TaskList/InfoOverlay',
  tags: ['autodocs'],
} satisfies Meta<typeof InfoOverlay>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    task: MOCK_TASKLISTS[0].tasks[0],
    isOpen: true,
    onClose: fn(),
    onToggle: fn(),
  },
};
