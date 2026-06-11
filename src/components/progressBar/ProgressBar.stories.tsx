import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import ProgressBar from './ProgressBar';
import type { ProgressBarProps } from './type';

const meta = {
  title: 'Components/ProgressBar',
  component: ProgressBar,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'radio',
      options: ['sm', 'md', 'lg'],
    },
    value: {
      control: {
        type: 'range',
        min: 0,
        max: 100,
        step: 1,
      },
    },
    max: {
      control: {
        type: 'number',
        min: 1,
      },
    },
    showTrackPattern: {
      control: 'boolean',
    },
  },
  args: {
    value: 35,
    max: 100,
    size: 'lg',
    showTrackPattern: true,
    label: 'Progress rate',
  },
} satisfies Meta<typeof ProgressBar>;

export default meta;

type Story = StoryObj<typeof meta>;

const PROGRESS_BAR_PREVIEW_CLASS =
  'flex w-180 flex-col gap-8 bg-text-default p-8 text-background-inverse';

const ProgressBarPreview = ({
  value = 0,
  max = 100,
  size = 'lg',
  showTrackPattern = true,
  label = 'Progress rate',
}: ProgressBarProps) => (
  <div className={PROGRESS_BAR_PREVIEW_CLASS}>
    <div className="flex flex-col gap-3">
      <div className="flex items-center justify-between text-lg font-semibold">
        <span>Controls</span>
        <span>{value}%</span>
      </div>
      <ProgressBar
        value={value}
        max={max}
        size={size}
        showTrackPattern={showTrackPattern}
        label={label}
      />
    </div>
  </div>
);

export const Default: Story = {
  render: (args) => <ProgressBarPreview {...args} />,
};

export const Sizes: Story = {
  render: () => (
    <div className={PROGRESS_BAR_PREVIEW_CLASS}>
      <div className="flex flex-col gap-3">
        <span className="text-lg font-semibold">Large</span>
        <ProgressBar value={75} size="lg" label="large progress" />
      </div>
      <div className="flex flex-col gap-3">
        <span className="text-lg font-semibold">Medium</span>
        <ProgressBar value={35} size="md" label="medium progress" />
      </div>
      <div className="flex flex-col gap-3">
        <span className="text-lg font-semibold">Small</span>
        <ProgressBar value={35} size="sm" label="small progress" />
      </div>
    </div>
  ),
};

export const States: Story = {
  render: () => (
    <div className={PROGRESS_BAR_PREVIEW_CLASS}>
      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between text-lg font-semibold">
          <span>Full</span>
          <span>100%</span>
        </div>
        <ProgressBar value={100} label="full progress" />
      </div>
      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between text-lg font-semibold">
          <span>Progress</span>
          <span>42%</span>
        </div>
        <ProgressBar value={42} label="ongoing progress" />
      </div>
      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between text-lg font-semibold">
          <span>Empty</span>
          <span>0%</span>
        </div>
        <ProgressBar value={0} label="empty progress" />
      </div>
    </div>
  ),
};

export const WithoutPattern: Story = {
  args: {
    value: 55,
    showTrackPattern: false,
    label: 'Plain progress',
  },
  render: (args) => <ProgressBarPreview {...args} />,
};
