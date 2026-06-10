import UploadIcon from '@/assets/icons/img.svg?react';
import { FieldErrors, UseFormRegister } from 'react-hook-form';

import Button from '@/components/button/Button';

import { ArticleFormValues } from './type';

export type ArticleFormProps = {
  register: UseFormRegister<ArticleFormValues>;
  errors: FieldErrors<ArticleFormValues>;
  image: File | null;
  submitText: string;
  onImageChange: (file: File | null) => void;
};

export const ArticleForm = ({
  register,
  errors,
  image,
  submitText,
  onImageChange,
}: ArticleFormProps) => {
  return (
    <>
      <div className="mb-8 flex flex-col gap-2">
        <div className="flex gap-1">
          <span className="text-md font-bold md:text-lg">제목</span>
          <span className="text-point-rose">*</span>
        </div>

        <input
          {...register('title')}
          placeholder="제목을 입력해주세요."
          className="border-border-primary rounded-xl border p-4"
        />

        {errors.title && <p className="text-point-rose">{errors.title.message}</p>}
      </div>

      <div className="mb-8 flex flex-col gap-2">
        <div className="flex gap-1">
          <span className="text-md font-bold md:text-lg">내용</span>
          <span className="text-point-rose">*</span>
        </div>

        <textarea
          {...register('content')}
          placeholder="내용을 입력해주세요."
          className="border-border-primary min-h-[300px] rounded-xl border p-4"
        />

        {errors.content && <p className="text-point-rose">{errors.content.message}</p>}
      </div>

      <div className="mb-8 flex flex-col gap-2">
        <span className="text-md font-bold md:text-lg">이미지</span>

        <label
          htmlFor="article-image"
          className="border-border-primary flex h-20 w-20 cursor-pointer flex-col items-center justify-center gap-1 rounded-xl border"
        >
          <UploadIcon className="size-6" />
          <span className="text-text-disabled text-md">{image ? '1 / 1' : '0 / 1'}</span>

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
        </label>
        {image && <p className="text-text-secondary text-sm">{image.name}</p>}
      </div>

      <Button variant="primary-filled" className="w-full" type="submit">
        {submitText}
      </Button>
    </>
  );
};

export default ArticleForm;
