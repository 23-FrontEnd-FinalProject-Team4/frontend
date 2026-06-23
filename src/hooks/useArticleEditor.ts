'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';

import { CreateArticleRequest, UpdateArticleRequest } from '@/apis/article/type';
import {
  createArticleAction,
  updateArticleAction,
  uploadArticleImageAction,
} from '@/app/(protected)/articles/_actions/article.action';
import { ArticleFormData } from '@/app/(protected)/articles/write/_components/schema';

export const ARTICLE_EDITOR_MODE = {
  WRITE: 'write',
  EDIT: 'edit',
} as const;

export type UseArticleEditorProps = {
  mode: (typeof ARTICLE_EDITOR_MODE)[keyof typeof ARTICLE_EDITOR_MODE];
  defaultValues: ArticleFormData;
};
export const useArticleEditor = ({ mode, defaultValues }: UseArticleEditorProps) => {
  const queryClient = useQueryClient();

  const uploadImageMutation = useMutation({
    mutationFn: async (file: File) => {
      const formData = new FormData();
      formData.append('image', file);
      return uploadArticleImageAction(formData);
    },
  });

  const createArticleMutation = useMutation({
    mutationFn: createArticleAction,
    onSuccess: async () => {
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ['articles'] }),
        queryClient.invalidateQueries({ queryKey: ['best-articles'] }),
      ]);
    },
  });

  const updateArticleMutation = useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: UpdateArticleRequest }) =>
      updateArticleAction(id, payload),
    onSuccess: async () => {
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ['articles'] }),
        queryClient.invalidateQueries({ queryKey: ['best-articles'] }),
      ]);
    },
  });

  const handleFormSubmit = async (values: ArticleFormData) => {
    const imageUrl =
      values.image instanceof File ? await uploadImageMutation.mutateAsync(values.image) : null;
    const payload: CreateArticleRequest = {
      title: values.title,
      content: values.content,
      image: imageUrl?.url ?? (typeof values.image === 'string' ? values.image : undefined),
    };

    if (mode === ARTICLE_EDITOR_MODE.WRITE) {
      return createArticleMutation.mutateAsync(payload);
    }

    if (mode === ARTICLE_EDITOR_MODE.EDIT && defaultValues.id) {
      return updateArticleMutation.mutateAsync({
        id: defaultValues.id,
        payload,
      });
    }

    return null;
  };

  return {
    uploadImageMutation,
    createArticleMutation,
    updateArticleMutation,
    handleFormSubmit,
  };
};
