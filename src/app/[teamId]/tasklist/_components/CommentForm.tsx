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

  const handleSubmit = () => {
    if (!comment) return;
    createComment(
      { content: comment, taskId },
      {
        onSuccess: () => {
          setComment('');
        },
      },
    );
  };

  return (
    <form className="flex items-center gap-3" onSubmit={(event) => event.preventDefault()}>
      <Profile src={writerImage} alt={writerName} />
      <InputReply value={comment} onChange={setComment} onSubmit={handleSubmit} size="lg" />
    </form>
  );
};

export default CommentForm;
