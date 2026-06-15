import { ArticleFormData } from '@/app/articles/write/_components/schema';
import UploadIcon from '@/assets/icons/img.svg';
import { FieldErrors, UseFormRegister } from 'react-hook-form';

import Button from '@/components/button/Button';

type ArticleFormProps = {
  id?: string;
  register: UseFormRegister<ArticleFormData>;
  errors: FieldErrors<ArticleFormData>;
  image?: File | string | null;
  onImageChange: (file: File | string | null) => void;
  submitText: string;
  onSubmit: () => void;
  isloading: boolean;
};

const ArticleForm = ({
  id,
  register,
  errors,
  image,
  onImageChange,
  submitText,
  onSubmit,
  isloading,
}: ArticleFormProps) => {
  return (
    <form onSubmit={onSubmit}>
      {id && <input type="hidden" name="id" value={id} />}
      <div className="mb-8 flex flex-col gap-2">
        <label className="flex gap-1">
          <span className="text-md font-bold md:text-lg">제목</span>
          <span className="text-point-rose">*</span>
        </label>

        <input
          {...register('title')}
          placeholder="제목을 입력해주세요."
          className="border-border-primary rounded-xl border p-4"
        />

        {errors.title && <p className="text-point-rose">{errors.title.message}</p>}
      </div>

      <div className="mb-8 flex flex-col gap-2">
        <label className="flex gap-1">
          <span className="text-md font-bold md:text-lg">내용</span>
          <span className="text-point-rose">*</span>
        </label>

        <textarea
          {...register('content')}
          placeholder="내용을 입력해주세요."
          className="border-border-primary min-h-[300px] rounded-xl border p-4"
        />

        {errors.content && <p className="text-point-rose">{errors.content.message}</p>}
      </div>

      <div className="mb-8 flex flex-col gap-2">
        <label className="flex gap-1" htmlFor="article-image">
          <span className="text-md font-bold md:text-lg">이미지</span>
        </label>

        <div className="border-border-primary flex h-20 w-20 cursor-pointer flex-col items-center justify-center gap-1 rounded-xl border">
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
        </div>
      </div>

      <Button variant="primary-filled" className="w-full" type="submit" disabled={isloading}>
        {isloading ? '저장 중...' : submitText}
      </Button>
    </form>
  );
};

export default ArticleForm;
