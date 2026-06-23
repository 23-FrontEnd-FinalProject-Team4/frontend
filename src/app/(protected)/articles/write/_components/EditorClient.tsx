'use client';

import { useRouter } from 'next/navigation';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, useWatch } from 'react-hook-form';
import { toast } from 'react-hot-toast';

import {
  ArticleFormData,
  articleSchema,
} from '@/app/(protected)/articles/write/_components/schema';
import {
  ARTICLE_EDITOR_MODE,
  UseArticleEditorProps,
  useArticleEditor,
} from '@/hooks/useArticleEditor';

import ArticleForm from './ArticleForm';

export const ARTICLE_FORM_FIELDS = {
  TITLE: 'title',
  CONTENT: 'content',
  IMAGE: 'image',
} as const;

export default function EditorClient({ mode, defaultValues }: UseArticleEditorProps) {
  const router = useRouter();

  const {
    register,
    handleSubmit: formHandleSubmit,
    setValue,
    control,
    formState: { errors, isSubmitting },
  } = useForm<ArticleFormData>({
    resolver: zodResolver(articleSchema),
    defaultValues,
  });
  const { handleFormSubmit } = useArticleEditor({ mode, defaultValues });

  const handleSubmit = async (values: ArticleFormData) => {
    try {
      const result = await handleFormSubmit(values);
      if (!result) return;
      router.push(`/articles/${result.id}`);
    } catch (error) {
      console.error(error);
      toast.error('게시글 저장에 실패했습니다.');
    }
  };

  const image = useWatch({ control, name: ARTICLE_FORM_FIELDS.IMAGE });

  return (
    <ArticleForm
      id={defaultValues.id}
      register={register}
      errors={errors}
      image={image}
      onImageChange={(file) => {
        setValue(ARTICLE_FORM_FIELDS.IMAGE, file, {
          shouldDirty: true,
          shouldValidate: true,
        });
      }}
      isLoading={isSubmitting}
      submitText={mode === ARTICLE_EDITOR_MODE.EDIT ? '수정하기' : '등록하기'}
      onSubmit={formHandleSubmit(handleSubmit)}
    />
  );
}
