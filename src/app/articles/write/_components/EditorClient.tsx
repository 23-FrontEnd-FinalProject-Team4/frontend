'use client';

import { useState } from 'react';

import { useRouter } from 'next/navigation';

import { createArticle, updateArticle } from '@/apis/article';
import { CreateArticleRequest, UpdateArticleRequest } from '@/apis/article/type';
import { uploadImage } from '@/apis/image';
import { ArticleFormData, articleSchema } from '@/app/articles/write/_components/schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';

import ArticleForm from './ArticleForm';

type EditorClientProps = {
  mode: 'write' | 'edit';
  defaultValues: ArticleFormData;
};

export default function EditorClient({ mode, defaultValues }: EditorClientProps) {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ArticleFormData>({
    resolver: zodResolver(articleSchema),
    defaultValues,
  });

  const [image, setImage] = useState<File | string | null>(defaultValues?.image ?? null);

  const createArticleMutation = useMutation({
    mutationFn: createArticle,
  });

  const updateArticleMutation = useMutation({
    mutationFn: ({ id, payload }: { id: number; payload: UpdateArticleRequest }) =>
      updateArticle(id, payload),
  });

  const resolveImageUrl = async (currentImage: File | string | null) => {
    if (!currentImage) return null;
    if (typeof currentImage === 'string') return currentImage;

    const formData = new FormData();
    formData.append('image', currentImage);
    const { url } = await uploadImage(formData);
    return url;
  };

  const handleFormSubmit = async (values: ArticleFormData) => {
    const imageUrl = await resolveImageUrl(image);
    const payload: CreateArticleRequest = {
      title: values.title,
      content: values.content,
      image: imageUrl ?? undefined,
    };

    if (mode === 'write') {
      const createdArticle = await createArticleMutation.mutateAsync(payload);
      router.push(`/articles/${createdArticle.id}`);
      return;
    }

    if (mode === 'edit' && defaultValues.id) {
      await updateArticleMutation.mutateAsync({
        id: defaultValues.id,
        payload,
      });
      router.push(`/articles/${defaultValues.id}`);
    }
  };

  return (
    <ArticleForm
      id={defaultValues.id}
      register={register}
      errors={errors}
      image={image}
      onImageChange={setImage}
      submitText={mode === 'edit' ? '수정하기' : '등록하기'}
      onSubmit={handleSubmit(handleFormSubmit)}
    />
  );
}
