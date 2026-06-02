import React from 'react';

import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import BadgeDone from './BadgeDone';

const meta: Meta<typeof BadgeDone> = {
  title: 'Components/BadgeDone',
  component: BadgeDone,
  argTypes: {
    status: {
      control: 'select',
      options: ['done', 'progress', 'none'],
      description: '배지의 달성 상태를 결정합니다.',
    },
    current: {
      control: { type: 'number', min: 0 },
      description: '현재 달성한 개수입니다.',
    },
    total: {
      control: { type: 'number', min: 0 },
      description: '총 목표 개수입니다.',
    },
  },
};

export default meta;
type Story = StoryObj<typeof BadgeDone>;

export const Default: Story = {
  args: {
    status: 'progress',
    current: 3,
    total: 5,
  },
};

export const AllStates: Story = {
  render: (args) => (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
        padding: '20px',
        backgroundColor: '#333333',
        width: 'fit-content',
        borderRadius: '12px',
      }}
    >
      <div>
        <BadgeDone {...args} status="done" current={5} total={5} />
      </div>

      <div>
        <BadgeDone {...args} status="progress" current={3} total={5} />
      </div>

      <div>
        <BadgeDone {...args} status="none" current={0} total={0} />
      </div>
    </div>
  ),
};

export const Done: Story = {
  args: {
    status: 'done',
    current: 5,
    total: 5,
  },
};

export const Progress: Story = {
  args: {
    status: 'progress',
    current: 3,
    total: 5,
  },
};

export const None: Story = {
  args: {
    status: 'none',
    current: 0,
    total: 0,
  },
};
