import React from 'react';

import type { Meta, StoryObj } from '@storybook/nextjs';

import Profile from './Profile';

const meta: Meta<typeof Profile> = {
  title: 'Components/Profile',
  component: Profile,
  argTypes: {
    size: {
      control: 'select',
      options: ['lg', 'md', 'sm'],
      description: '프로필의 크기를 결정합니다. (lg: 40px, md: 32px, sm: 24px)',
    },
    src: {
      control: 'text',
      description: '프로필 이미지의 URL 주소. 빈 값이면 profile.svg 기본 아이콘이 뜸',
    },
    alt: {
      control: 'text',
      description: '이미지 로딩에 실패하거나 스크린 리더가 읽을 대체 텍스트',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Profile>;

const MOCK_IMAGE =
  'https://crowdticket0.s3.ap-northeast-1.amazonaws.com/real/files/user/437745/1700398803264_thumb_img.jpg';

export const Default: Story = {
  args: {
    size: 'md',
    src: MOCK_IMAGE,
    alt: '사용자 프로필 이미지',
  },
};

export const AllStates: Story = {
  render: (args) => (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '24px',
        padding: '24px',
        backgroundColor: '#333333',
        width: 'fit-content',
        borderRadius: '16px',
      }}
    >
      <div style={{ display: 'flex', gap: '30px', alignItems: 'center' }}>
        <div style={{ color: '#fff', width: '90px', fontWeight: 'bold', fontSize: '14px' }}>
          상태 / 크기
        </div>
        <div style={{ color: '#ccc', fontSize: '12px', width: '50px', textAlign: 'center' }}>
          Large (40)
        </div>
        <div style={{ color: '#ccc', fontSize: '12px', width: '50px', textAlign: 'center' }}>
          Medium (32)
        </div>
        <div style={{ color: '#ccc', fontSize: '12px', width: '50px', textAlign: 'center' }}>
          Small (24)
        </div>
      </div>

      <hr style={{ border: 'none', borderTop: '1px solid #444', margin: '0' }} />

      <div style={{ display: 'flex', gap: '30px', alignItems: 'center' }}>
        <div style={{ color: '#aaa', width: '90px', fontSize: '13px' }}>이미지 있음</div>
        <div style={{ width: '50px', display: 'flex', justifyContent: 'center' }}>
          <Profile {...args} size="lg" src={MOCK_IMAGE} />
        </div>
        <div style={{ width: '50px', display: 'flex', justifyContent: 'center' }}>
          <Profile {...args} size="md" src={MOCK_IMAGE} />
        </div>
        <div style={{ width: '50px', display: 'flex', justifyContent: 'center' }}>
          <Profile {...args} size="sm" src={MOCK_IMAGE} />
        </div>
      </div>

      <div style={{ display: 'flex', gap: '30px', alignItems: 'center' }}>
        <div style={{ color: '#aaa', width: '90px', fontSize: '13px' }}>이미지 없음</div>
        <div style={{ width: '50px', display: 'flex', justifyContent: 'center' }}>
          <Profile {...args} size="lg" src={null} />
        </div>
        <div style={{ width: '50px', display: 'flex', justifyContent: 'center' }}>
          <Profile {...args} size="md" src={null} />
        </div>
        <div style={{ width: '50px', display: 'flex', justifyContent: 'center' }}>
          <Profile {...args} size="sm" src={null} />
        </div>
      </div>
    </div>
  ),
};

export const Large: Story = {
  args: {
    size: 'lg',
    src: MOCK_IMAGE,
    alt: 'Large Profile',
  },
};

export const Medium: Story = {
  args: {
    size: 'md',
    src: MOCK_IMAGE,
    alt: 'Medium Profile',
  },
};

export const Small: Story = {
  args: {
    size: 'sm',
    src: MOCK_IMAGE,
    alt: 'Small Profile',
  },
};

export const Placeholder: Story = {
  args: {
    size: 'md',
    src: null,
    alt: 'Default Profile',
  },
};
