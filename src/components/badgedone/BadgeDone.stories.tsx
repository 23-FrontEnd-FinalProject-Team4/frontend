import React from 'react';

import type { Meta, StoryObj } from '@storybook/nextjs';

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

// 1. 기본 상태 스토리 (Default)
export const Default: Story = {
  args: {
    status: 'progress',
    current: 3,
    total: 5,
  },
};

// 2. 피그마 시안의 모든 상태를 한눈에 보는 스토리 (AllStates)
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
      {/* 완료 상태 (5/5) */}
      <div>
        <BadgeDone {...args} status="done" current={5} total={5} />
      </div>

      {/* 진행 중 상태 (3/5) */}
      <div>
        <BadgeDone {...args} status="progress" current={3} total={5} />
      </div>

      {/* 목표 없음 / 시작 전 상태 (0/0) */}
      <div>
        <BadgeDone {...args} status="none" current={0} total={0} />
      </div>
    </div>
  ),
};

// 3. 각각의 단일 상태 확인용 스토리들
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
