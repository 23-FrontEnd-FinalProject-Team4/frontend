'use client';

import { useState } from 'react';

import { TaskUser } from '@/apis/task/type';
import InputReply from '@/components/inputReply/InputReply';
import Profile from '@/components/profile/Profile';

interface CommentFormProps {
  writer: TaskUser;
}

const CommentForm = ({ writer }: CommentFormProps) => {
  const [comment, setComment] = useState('');

  return (
    <form className="flex items-center gap-3">
      <Profile src={writer.image} alt={writer.nickname} />
      {/* TODO: 기능 구현 시 onSubmit 구현 */}
      <InputReply value={comment} onChange={setComment} onSubmit={() => {}} size="lg" />
    </form>
  );
};

export default CommentForm;
