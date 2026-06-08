'use client';

import type { ChangeEvent } from 'react';

import PencilIcon from '@/assets/icons/pencil.svg?react';

import type { EditableProfileImageProps } from './type';

const sizeStyle = {
  sm: {
    image: 'h-16 w-16 rounded-[20px]',
    button:
      'absolute left-11 top-11 flex h-6 w-6 items-center justify-center rounded-full border-background-primary bg-background-tertiary',
    icon: 15,
  },
  lg: {
    image: 'h-25 w-25 rounded-4xl',
    button:
      'absolute left-18 top-18 flex h-8 w-8 items-center justify-center rounded-full border-background-primary bg-background-tertiary',
    icon: 20,
  },
} as const;

const EditableProfileImage = ({
  src,
  alt = '프로필 이미지',
  size = 'sm',
  onChange,
}: EditableProfileImageProps) => {
  const style = sizeStyle[size];

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (!file) return;

    onChange?.(file);
  };

  return (
    <div className="relative inline-block">
      <img
        src={src}
        alt={alt}
        className={`${style.image} border-background-primary border-2 object-cover`}
      />

      <label className={`${style.button} cursor-pointer`}>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="sr-only"
          aria-label="프로필 이미지 수정"
        />

        <PencilIcon
          width={style.icon}
          height={style.icon}
          className="text-icon-primary"
          aria-hidden
        />
      </label>
    </div>
  );
};

export default EditableProfileImage;
