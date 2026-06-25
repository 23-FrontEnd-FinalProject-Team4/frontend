'use client';

import { useState } from 'react';

import { useMutation, useQueryClient } from '@tanstack/react-query';

import {
  createArticleLikeAction,
  deleteArticleLikeAction,
} from '@/app/(protected)/articles/_actions/like.action';
import HeartEmptyIcon from '@/assets/icons/heart_empty.svg';
import HeartFillIcon from '@/assets/icons/heart_fill.svg';
import { cn } from '@/utils/cn';

interface LikeButtonProps {
  articleId: string;
  initialIsLiked: boolean;
  initialLikeCount: number;
}

const LikeButton = ({ articleId, initialIsLiked, initialLikeCount }: LikeButtonProps) => {
  const [isLiked, setIsLiked] = useState(initialIsLiked);
  const [likeCount, setLikeCount] = useState(initialLikeCount);
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: async (liked: boolean) => {
      return liked ? deleteArticleLikeAction(articleId) : createArticleLikeAction(articleId);
    },
    onMutate: (liked) => {
      const previousState = { isLiked, likeCount };

      if (liked) {
        setIsLiked(false);
        setLikeCount((prev) => Math.max(0, prev - 1));
      } else {
        setIsLiked(true);
        setLikeCount((prev) => prev + 1);
      }

      return previousState;
    },
    onError: (error, _liked, context) => {
      if (context) {
        setIsLiked(context.isLiked);
        setLikeCount(context.likeCount);
      }
      console.error('좋아요 처리 실패', error);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['articles'] });
      queryClient.invalidateQueries({ queryKey: ['best-articles'] });
    },
  });

  const handleClick = () => {
    if (isPending) return;

    mutate(isLiked);
  };

  return (
    <div className="flex w-full justify-end px-4">
      <button
        type="button"
        disabled={isPending}
        aria-label="좋아요"
        className={cn(
          'text-md flex flex-row items-center gap-1 font-normal',
          isLiked ? 'text-brand-primary' : 'text-text-disabled',
          isPending && 'cursor-not-allowed opacity-50',
        )}
        onClick={handleClick}
      >
        {isLiked ? (
          <HeartFillIcon className="h-6 w-4" aria-hidden="true" />
        ) : (
          <HeartEmptyIcon className="h-6 w-4" aria-hidden="true" />
        )}
        {(likeCount || 0) > 999 ? '999+' : likeCount || 0}
      </button>
    </div>
  );
};

export default LikeButton;
