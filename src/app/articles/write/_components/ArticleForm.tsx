'use client';
import { useEffect, useMemo } from 'react';

import Image from 'next/image';

import { FieldErrors, UseFormRegister } from 'react-hook-form';

import { ArticleFormData } from '@/app/articles/write/_components/schema';
import UploadIcon from '@/assets/icons/img.svg';
import Button from '@/components/button/Button';
import InputBox from '@/components/inputBox/InputBox';

type ArticleFormProps = {
  id?: string;
  register: UseFormRegister<ArticleFormData>;
  errors: FieldErrors<ArticleFormData>;
  image?: File | string | null;
  onImageChange: (file: File | string | null) => void;
  submitText: string;
  onSubmit: () => void;
  isLoading: boolean;
};

const ArticleForm = ({
  id,
  register,
  errors,
  image,
  onImageChange,
  submitText,
  onSubmit,
  isLoading,
}: ArticleFormProps) => {
  const previewUrl = useMemo(() => {
    if (!image) return '';

    if (typeof image === 'string') {
      return image;
    }

    return URL.createObjectURL(image);
  }, [image]);

  useEffect(() => {
    if (!image || typeof image === 'string') return;

    return () => {
      URL.revokeObjectURL(previewUrl);
    };
  }, [image, previewUrl]);

  return (
    <form onSubmit={onSubmit}>
      {id && <input type="hidden" name="id" value={id} />}
      <div className="mb-8 flex w-full">
        <label className="flex w-full flex-col items-start gap-2">
          <div className="flex items-center gap-1">
            <span className="text-md font-bold md:text-lg">제목</span>
            <span className="text-point-rose">*</span>
          </div>

          <input
            type="text"
            {...register('title')}
            placeholder="제목을 입력해주세요."
            className="border-border-primary bg-background-primary text-text-primary placeholder:text-text-default hover:border-interaction-hover focus:border-interaction-pressed h-12 w-full rounded-xl border px-4 py-4 text-base transition-colors outline-none"
          />

          {errors.title && <p className="text-point-rose">{errors.title.message}</p>}
        </label>
      </div>

      <div className="mb-8 flex flex-col gap-2">
        <label className="flex w-full flex-col items-start gap-2">
          <div className="flex items-center gap-1">
            <span className="text-md font-bold md:text-lg">내용</span>
            <span className="text-point-rose">*</span>
          </div>

          <InputBox
            {...register('content')}
            size="lg"
            placeholder="내용을 입력해주세요."
            className="border-border-primary min-h-[300px] w-full rounded-xl border p-4 whitespace-pre-wrap"
          />

          {errors.content && <p className="text-point-rose">{errors.content.message}</p>}
        </label>
      </div>

      <div className="mb-8 flex flex-col gap-2">
        <span className="text-md font-bold md:text-lg">이미지</span>

        {previewUrl ? (
          <div className="border-border-primary relative h-24 w-24 overflow-hidden rounded-xl border">
            <Image
              src={previewUrl}
              alt="미리보기"
              className="h-full w-full object-cover"
              width={120}
              height={120}
            />

            <button
              type="button"
              className="absolute top-1 right-1 flex h-6 w-6 items-center justify-center rounded-full bg-black/70 text-white"
              onClick={() => onImageChange(null)}
            >
              ×
            </button>
          </div>
        ) : (
          <label
            htmlFor="article-image"
            className="border-border-primary flex h-20 w-20 cursor-pointer flex-col items-center justify-center gap-1 rounded-xl border"
          >
            <input
              type="file"
              accept="image/*"
              className="hidden"
              id="article-image"
              onChange={(e) => {
                const file = e.target.files?.[0] ?? null;
                onImageChange(file);
              }}
            />

            <UploadIcon className="size-6" />
            <span className="text-text-disabled text-md">0 / 1</span>
          </label>
        )}
      </div>

      <Button variant="primary-filled" className="w-full" type="submit" disabled={isLoading}>
        {isLoading ? '저장 중...' : submitText}
      </Button>
    </form>
  );
};

export default ArticleForm;
