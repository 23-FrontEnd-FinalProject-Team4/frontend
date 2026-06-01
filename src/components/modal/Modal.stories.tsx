import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { fn } from 'storybook/test';

import Input from '../Input/Input';
import Modal from './Modal';

const meta = {
  title: 'Components/Modal',
  component: Modal,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'danger'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
  },
  args: {
    isOpen: true,
    onClose: fn(),
  },
} satisfies Meta<typeof Modal>;

export default meta;

type Story = StoryObj<typeof meta>;

export const InviteMember: Story = {
  args: {
    title: '멤버 초대',
    description: '그룹에 참여할 수 있는 링크를 복사합니다.',
    primaryAction: {
      label: '링크 복사하기',
      onClick: fn(),
    },
  },
};

export const PasswordReset: Story = {
  args: {
    title: '비밀번호 재설정',
    description: '비밀번호 재설정 링크를 보내드립니다.',
    children: (
      <Input type="email" aria-label="이메일" placeholder="이메일을 입력해주세요." size="sm" />
    ),
    primaryAction: {
      label: '링크 보내기',
      onClick: fn(),
    },
    secondaryAction: {
      label: '닫기',
      onClick: fn(),
    },
  },
};

export const Danger: Story = {
  args: {
    title: '회원 탈퇴를 진행하시겠어요?',
    description: '그룹장으로 있는 그룹은  자동으로 삭제되고, 모든 그룹에서 나가집니다.',
    variant: 'danger',
    primaryAction: {
      label: '회원 탈퇴',
      onClick: fn(),
    },
    secondaryAction: {
      label: '닫기',
      onClick: fn(),
    },
  },
};
