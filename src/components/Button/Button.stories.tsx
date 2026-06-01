import Image from 'next/image';

import CheckBlue from '@/assets/icons/check_blue.svg';
import CheckWhite from '@/assets/icons/check_white.svg';
import HeartEmpty from '@/assets/icons/heart_empty.svg';
import HeartFill from '@/assets/icons/heart_fill.svg';
import PlusGray from '@/assets/icons/plus_gray.svg';
import PlusWhite from '@/assets/icons/plus_white.svg';
import type { Meta, StoryObj } from '@storybook/nextjs';

import Button from './Button';

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  argTypes: {
    variant: {
      control: 'select',
      options: [
        'primary-filled',
        'primary-outline',
        'secondary-filled',
        'secondary-whiteFilled',
        'danger-filled',
        'icon-circle',
        'icon-circle-white',
        'input-btn',
      ],
    },
    buttonState: {
      control: 'select',
      options: ['default', 'disabled'],
    },
    disabled: {
      control: 'boolean',
    },
    fullWidth: {
      control: 'boolean',
    },
    icon: {
      control: 'select',
      options: [
        'None',
        'Check_Blue',
        'Check_White',
        'Plus_White',
        'Plus_Gray',
        'Heart_Fill',
        'Heart_Empty',
      ],
      mapping: {
        None: undefined,
        Check_Blue: <Image src={CheckBlue.src || CheckBlue} alt="check" width={16} height={16} />,
        Check_White: (
          <Image src={CheckWhite.src || CheckWhite} alt="check" width={16} height={16} />
        ),
        Plus_White: <Image src={PlusWhite.src || PlusWhite} alt="plus" width={24} height={24} />,
        Plus_Gray: <Image src={PlusGray.src || PlusGray} alt="plus" width={16} height={16} />,
        Heart_Fill: <Image src={HeartFill.src || HeartFill} alt="heart" width={16} height={16} />,
        Heart_Empty: (
          <Image src={HeartEmpty.src || HeartEmpty} alt="heart" width={16} height={16} />
        ),
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Default: Story = {
  args: {
    variant: 'primary-filled',
    children: '생성하기',
    disabled: false,
    fullWidth: false,
  },
};

export const AllVariants: Story = {
  render: (args: React.ComponentProps<typeof Button>) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', padding: '20px' }}>
      <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
        <Button {...args} variant="primary-filled">
          primary-filled
        </Button>
        <Button {...args} variant="primary-outline">
          primary-outline
        </Button>
        <Button {...args} variant="danger-filled">
          danger-filled
        </Button>
      </div>

      <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
        <Button {...args} variant="secondary-filled">
          secondary-filled
        </Button>
        <Button {...args} variant="secondary-whiteFilled">
          secondary-whiteFilled
        </Button>
      </div>

      <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
        <Button
          {...args}
          variant="icon-circle"
          icon={<Image src={PlusWhite.src || PlusWhite} alt="plus" width={24} height={24} />}
        />

        <Button
          {...args}
          variant="icon-circle-white"
          icon={<Image src={PlusGray.src || PlusGray} alt="plus" width={24} height={24} />}
        />

        <Button
          {...args}
          variant="input-btn"
          icon={<Image src={PlusGray.src || PlusGray} alt="plus" width={16} height={16} />}
        >
          할 일
        </Button>
      </div>
    </div>
  ),
};

export const Disabled: Story = {
  args: {
    variant: 'primary-filled',
    children: '완료 취소하기',
    disabled: true,
  },
};

export const WithIcon: Story = {
  args: {
    variant: 'secondary-whiteFilled',
    children: '완료 취소하기',
    icon: <span>✓</span>,
  },
};

export const FullWidth: Story = {
  args: {
    variant: 'primary-filled',
    children: '전체 너비 버튼',
    fullWidth: true,
  },
};
