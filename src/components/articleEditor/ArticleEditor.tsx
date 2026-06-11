'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm, useWatch } from 'react-hook-form';
import { z } from 'zod';

import { ArticleForm } from '@/components/articleForm/ArticleForm';
import { articleSchema } from '@/components/articleForm/schema';

type ArticleEditorProps = {
  mode: 'write' | 'edit';
  defaultValues: z.infer<typeof articleSchema>;
  onSubmit: SubmitHandler<z.infer<typeof articleSchema>>;
};
const submitText = {
  write: '등록하기',
  edit: '수정하기',
};

export const ArticleEditor = ({ mode, defaultValues, onSubmit }: ArticleEditorProps) => {
  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm<z.infer<typeof articleSchema>>({
    defaultValues,
    resolver: zodResolver(articleSchema),
  });
  const image = useWatch({ control, name: 'image' });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <ArticleForm
        register={register}
        errors={errors}
        image={image}
        submitText={submitText[mode]}
        onImageChange={(file) => setValue('image', file)}
      />
    </form>
  );
};
