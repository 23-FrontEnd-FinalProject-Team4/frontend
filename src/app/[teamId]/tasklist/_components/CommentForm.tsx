'use client';

import { useState } from 'react';

import { TaskUser } from '@/apis/task/type';
import InputReply from '@/components/inputReply/InputReply';
import Profile from '@/components/profile/Profile';
import { useCreateTaskComment } from '@/queries/task/comment/queries';

interface CommentFormProps {
  writer: TaskUser | null;
  taskId: number;
}

const CommentForm = ({ writer, taskId }: CommentFormProps) => {
  const [comment, setComment] = useState('');
  const writerName = writer?.nickname ?? '알 수 없음';
  const writerImage = writer?.image ?? null;

  const { mutate: createComment } = useCreateTaskComment({});

  const submitComment = () => {
    if (!comment.trim()) return;
    createComment(
      { content: comment.trim(), taskId },
      {
        onSuccess: () => {
          setComment('');
        },
      },
    );
  };

  const handleSubmit = (e: React.SubmitEvent) => {
    e.preventDefault();
    submitComment();
  };

  return (
    <form className="flex items-center gap-3" onSubmit={handleSubmit}>
      <Profile src={writerImage} alt={writerName} />
      <InputReply value={comment} onChange={setComment} onSubmit={submitComment} size="lg" />
    </form>
  );
};

export default CommentForm;
