'use client';

import { useState } from 'react';

import { useRouter } from 'next/navigation';

import type { ArticleComment } from '@/apis/articleComment/type';
import {
  createArticleCommentAction,
  deleteArticleCommentAction,
  updateArticleCommentAction,
} from '@/app/(protected)/articles/_actions/comment.action';
import Dropdown from '@/components/dropdown/Dropdown';
import InputReply from '@/components/inputReply/InputReply';
import Modal from '@/components/modal/Modal';
import Profile from '@/components/profile/Profile';
import Reply from '@/components/reply/Reply';
import { formatDate } from '@/utils/formatDate';

const CommentSection = ({
  articleId,
  comments,
  currentUserIdentifiers,
}: {
  articleId: string;
  comments: ArticleComment[] | null;
  currentUserIdentifiers: string[];
}) => {
  const [replyValue, setReplyValue] = useState('');
  const [openedCommentId, setOpenedCommentId] = useState<string | null>(null);
  const [editingCommentId, setEditingCommentId] = useState<string | null>(null);
  const [deletingCommentId, setDeletingCommentId] = useState<string | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [editValue, setEditValue] = useState('');
  const hasComments = comments && comments.length > 0;

  const router = useRouter();

  const handleSubmit = async () => {
    if (!replyValue.trim()) return;

    try {
      await createArticleCommentAction(articleId, {
        content: replyValue,
      });

      setReplyValue('');
      router.refresh();
    } catch (error) {
      console.error(error);
    }
  };
  const handleCommentDelete = async () => {
    if (!deletingCommentId) return;

    try {
      await deleteArticleCommentAction({ commentId: deletingCommentId });

      setIsDeleteModalOpen(false);
      setDeletingCommentId(null);
      router.refresh();
    } catch (error) {
      console.error(error);
    }
  };

  const handleCommentEdit = async () => {
    if (!editingCommentId || !editValue.trim()) return;

    try {
      await updateArticleCommentAction(
        {
          commentId: editingCommentId,
        },
        {
          content: editValue,
        },
      );

      setEditingCommentId(null);
      setEditValue('');
      router.refresh();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div className="text-m mb-5 flex gap-1 font-bold">
        댓글
        <span className="text-brand-primary">{comments?.length || 0}</span>
      </div>
      <InputReply size="lg" value={replyValue} onChange={setReplyValue} onSubmit={handleSubmit} />
      <div className="divide-border-primary divide-y">
        {hasComments ? (
          comments.map((comment: ArticleComment) => {
            const writerId = String(comment.writer.id);
            const isOwnComment = currentUserIdentifiers.includes(writerId);

            return (
              <div key={comment.id} className="relative py-2">
                {editingCommentId === comment.id ? (
                  <InputReply
                    value={editValue}
                    onChange={setEditValue}
                    onSubmit={handleCommentEdit}
                  />
                ) : (
                  <Reply
                    size="lg"
                    author={comment.writer.nickname}
                    avatar={
                      <Profile
                        size="md"
                        src={comment.writer.image ?? null}
                        alt="댓글 작성자 프로필"
                      />
                    }
                    date={formatDate(comment.createdAt)}
                    onMenuClick={
                      isOwnComment
                        ? () =>
                            setOpenedCommentId(openedCommentId === comment.id ? null : comment.id)
                        : undefined
                    }
                  >
                    {comment.content}
                  </Reply>
                )}

                {isOwnComment && openedCommentId === comment.id && (
                  <div className="absolute top-10 right-5 z-10">
                    <Dropdown
                      options={[
                        { label: '수정하기', value: 'edit' },
                        { label: '삭제하기', value: 'delete' },
                      ]}
                      onSelect={(option) => {
                        if (option === 'edit') {
                          setEditingCommentId(comment.id);
                          setEditValue(comment.content);
                          setOpenedCommentId(null);
                        }

                        if (option === 'delete') {
                          setDeletingCommentId(comment.id);
                          setIsDeleteModalOpen(true);
                        }
                      }}
                    />
                  </div>
                )}
              </div>
            );
          })
        ) : (
          <div className="text-text-disabled text-md py-4 text-center">
            아직 작성된 댓글이 없습니다.
          </div>
        )}
      </div>
      <Modal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        variant="danger"
        title="댓글을 삭제하시겠어요?"
        description="삭제된 댓글은 복구할 수 없습니다."
        primaryAction={{
          label: '삭제',
          loadingLabel: '삭제 중...',
          isLoading: false,
          onClick: handleCommentDelete,
        }}
        secondaryAction={{
          label: '취소',
          onClick: () => setIsDeleteModalOpen(false),
        }}
      />
    </>
  );
};

export default CommentSection;
