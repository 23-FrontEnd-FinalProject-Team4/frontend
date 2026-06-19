'use client';

import type { ChangeEvent } from 'react';

import Image from 'next/image';

import PencilIcon from '@/assets/icons/pencil.svg?react';
import { isAllowedImageUrl } from '@/utils/isAllowedImageUrl';

import type { EditableProfileImageProps } from './type';

const sizeStyle = {
  sm: {
    image: 'h-16 w-16 rounded-[20px]',
    imageSize: 64,
    button:
      'absolute left-11 top-11 flex h-6 w-6 items-center justify-center rounded-full border-background-primary bg-background-tertiary',
    icon: 15,
  },
  lg: {
    image: 'h-25 w-25 rounded-4xl',
    imageSize: 100,
    button:
      'absolute left-18 top-18 flex h-8 w-8 items-center justify-center rounded-full border-background-primary bg-background-tertiary',
    icon: 21,
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
      {isAllowedImageUrl(src) ? (
        <Image
          src={src}
          alt={alt}
          width={style.imageSize}
          height={style.imageSize}
          unoptimized
          className={`${style.image} border-background-primary border-2 object-cover`}
        />
      ) : (
        <div
          aria-label={alt}
          className={`${style.image} border-background-primary bg-background-secondary text-text-disabled flex items-center justify-center border-2 text-sm font-medium`}
        >
          ?
        </div>
      )}

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
