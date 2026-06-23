'use client';
import { useState } from 'react';

import { useRouter } from 'next/navigation';

import { useMutation, useQueryClient } from '@tanstack/react-query';

import { deleteArticleAction } from '@/app/(protected)/articles/_actions/article.action';
import KebabIcon from '@/assets/icons/kebab.svg';
import Dropdown from '@/components/dropdown/Dropdown';
import Modal from '@/components/modal/Modal';
import Profile from '@/components/profile/Profile';

export type ArticleHeaderProps = {
  writer: string;
  writerImage?: string | null;
  createdAt: string;
  title: string;
  id: string;
  isAuthor: boolean;
};

const ArticleHeader = ({
  writer,
  writerImage,
  createdAt,
  title,
  id,
  isAuthor,
}: ArticleHeaderProps) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const router = useRouter();
  const queryClient = useQueryClient();

  const { mutate: deleteArticle, isPending: isDeleting } = useMutation({
    mutationFn: deleteArticleAction,
    onSuccess: async () => {
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ['articles'] }),
        queryClient.invalidateQueries({ queryKey: ['best-articles'] }),
      ]);

      router.replace('/articles');
    },
    onError: (error) => {
      console.error(error);
    },
  });

  const handleDelete = () => {
    deleteArticle(`${id}`);
  };
  return (
    <header className="border-border-primary mb-4 flex w-full items-start justify-between border-b pb-3">
      <div className="flex flex-col gap-2">
        <h1 className="text-text-primary text-2lg font-bold md:text-xl">{title} </h1>
        <div className="flex items-center gap-2">
          <Profile alt="작성자 프로필" size="md" src={writerImage ?? null} />
          <span className="text-text-primary md:text-md text-xs">{writer}</span>
          <div className="bg-text-default h-3 w-px" />
          <span className="text-text-disabled md:text-md text-xs">{createdAt}</span>
        </div>
      </div>
      {isAuthor && (
        <>
          <div className="relative">
            <button type="button" onClick={() => setIsDropdownOpen((prev) => !prev)}>
              <KebabIcon className="size-6" />
            </button>

            {isDropdownOpen && (
              <Dropdown
                size="md"
                options={[
                  { label: '수정하기', value: 'edit' },
                  { label: '삭제하기', value: 'delete' },
                ]}
                onSelect={(value) => {
                  setIsDropdownOpen(false);

                  if (value === 'edit') {
                    router.push(`/articles/${id}/edit`);
                  }

                  if (value === 'delete') {
                    setIsDeleteModalOpen(true);
                  }
                }}
                onClose={() => setIsDropdownOpen(false)}
              />
            )}
          </div>
          <Modal
            isOpen={isDeleteModalOpen}
            onClose={() => setIsDeleteModalOpen(false)}
            variant="danger"
            title="게시글을 삭제하시겠어요?"
            description="삭제된 게시글은 복구할 수 없습니다."
            primaryAction={{
              label: '삭제',
              loadingLabel: '삭제 중...',
              isLoading: isDeleting,
              onClick: handleDelete,
            }}
            secondaryAction={{
              label: '취소',
              onClick: () => setIsDeleteModalOpen(false),
            }}
          />
        </>
      )}
    </header>
  );
};

export default ArticleHeader;
