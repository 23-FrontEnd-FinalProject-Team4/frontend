import React from 'react';

import type { Meta, StoryObj } from '@storybook/nextjs';

import ProfileMember from './ProfileMember';
import { MemberData } from './type';

const meta: Meta<typeof ProfileMember> = {
  title: 'Components/ProfileMember',
  component: ProfileMember,
  decorators: [
    (Story) => (
      <div style={{ padding: '24px', maxWidth: '360px', backgroundColor: '#ffffff' }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof ProfileMember>;

const MOCK_ADMIN_MEMBER: MemberData = {
  userId: 3002,
  groupId: 4079,
  userName: 'qwerqwer',
  userEmail: 'qwerqwer@email.com',
  userImage: null,
  role: 'ADMIN',
};

const MOCK_REGULAR_MEMBER: MemberData = {
  userId: 3003,
  groupId: 4079,
  userName: '우지은',
  userEmail: 'jieun@codeit.com',
  userImage:
    'https://crowdticket0.s3.ap-northeast-1.amazonaws.com/real/files/user/437745/1700398803264_thumb_img.jpg',
  role: 'MEMBER',
};

export const Default: Story = {
  args: {
    member: MOCK_ADMIN_MEMBER,
    onKebabClick: (member) => alert(`클릭된 멤버 ID: ${member.userId}`),
  },
};

export const FigmaDesign: Story = {
  args: {
    member: MOCK_REGULAR_MEMBER,
    onKebabClick: (member) => alert(`케밥 클릭: ${member.userName}`),
  },
};

export const MemberList: Story = {
  render: (args) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <ProfileMember {...args} member={MOCK_REGULAR_MEMBER} />
      <ProfileMember {...args} member={MOCK_ADMIN_MEMBER} />
      <ProfileMember
        {...args}
        member={{
          ...MOCK_REGULAR_MEMBER,
          userId: 3004,
          userName: '이름이엄청나게길어지면어떻게처리될까요검수용',
          userEmail: 'long-email-address-test-value@codeit.com',
        }}
      />
    </div>
  ),
};
