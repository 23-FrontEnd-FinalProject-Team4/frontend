'use client';
import { useState } from 'react';

import { useRouter } from 'next/navigation';

import {
  deleteArticle,
  getArticleDetail,
  likeArticle,
  unlikeArticle,
  updateArticle,
} from '@/apis/article';
import KebabIcon from '@/assets/icons/kebab.svg';

import Dropdown from '@/components/dropdown/Dropdown';
import Modal from '@/components/modal/Modal';
import Profile from '@/components/profile/Profile';

export type ArticleHeaderProps = {
  writer: string;
  createdAt: string;
  title: string;
  id: string;
};

const ArticleHeader = ({ writer, createdAt, title, id }: ArticleHeaderProps) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const router = useRouter();

  const handleDelete = async () => {
    try {
      await deleteArticle(`${id}`);

      router.push('/articles');
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <header className="border-border-primary mb-4 flex w-full items-start justify-between border-b pb-3">
      <div className="flex flex-col gap-2">
        <h1 className="text-text-primary text-2lg font-bold md:text-xl">{title} </h1>
        <div className="flex items-center gap-2">
          <Profile alt="작성자 프로필" size="md" src={null} />
          <span className="text-text-primary md:text-md text-xs">{writer}</span>
          <div className="bg-text-default h-3 w-px" />
          <span className="text-text-disabled md:text-md text-xs">{createdAt}</span>
        </div>
      </div>
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
          isLoading: false,
          onClick: handleDelete,
        }}
        secondaryAction={{
          label: '취소',
          onClick: () => setIsDeleteModalOpen(false),
        }}
      />
    </header>
  );
};

export default ArticleHeader;
