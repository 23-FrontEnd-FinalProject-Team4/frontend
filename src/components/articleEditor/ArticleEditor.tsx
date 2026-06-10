'use client';

import { useState } from 'react';

import { SubmitHandler, useForm } from 'react-hook-form';

import { ArticleForm } from '../articleForm/ArticleForm';
import { ArticleFormValues } from '../articleForm/type';

type ArticleEditorProps = {
  mode: 'write' | 'edit';
  defaultValues: ArticleFormValues;
  onSubmit: SubmitHandler<ArticleFormValues>;
};
const submitText = {
  write: '등록하기',
  edit: '수정하기',
};

export const ArticleEditor = ({ mode, defaultValues, onSubmit }: ArticleEditorProps) => {
  const [image, setImage] = useState<File | null>(defaultValues.image ?? null);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ArticleFormValues>({ defaultValues });
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <ArticleForm
        register={register}
        errors={errors}
        image={image}
        submitText={submitText[mode]}
        onImageChange={setImage}
      />
    </form>
  );
};
