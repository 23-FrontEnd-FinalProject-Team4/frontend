'use client';

import { useState } from 'react';

import { useMutation } from '@tanstack/react-query';

import { likeArticle, unlikeArticle } from '@/apis/article';
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

  const { mutate, isPending } = useMutation({
    mutationFn: async (liked: boolean) => {
      return liked ? unlikeArticle(articleId) : likeArticle(articleId);
    },
    onSuccess: (_, liked) => {
      if (liked) {
        setIsLiked(false);
        setLikeCount((prev) => Math.max(0, prev - 1));
      } else {
        setIsLiked(true);
        setLikeCount((prev) => prev + 1);
      }
    },
    onError: (error) => {
      console.error('좋아요 처리 실패', error);
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
        className={cn(
          'text-md flex flex-row items-center gap-1 font-light',
          isLiked ? 'text-brand-primary' : 'text-text-disabled',
          isPending && 'cursor-not-allowed opacity-50',
        )}
        onClick={handleClick}
      >
        {isLiked ? <HeartFillIcon className="h-6 w-4" /> : <HeartEmptyIcon className="h-6 w-4" />}
        {(likeCount || 0) > 999 ? '999+' : likeCount || 0}
      </button>
    </div>
  );
};

export default LikeButton;
