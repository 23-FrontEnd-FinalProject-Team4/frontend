'use client';

import { useState } from 'react';

import InputReply from '@/components/inputReply/InputReply';
import Reply from '@/components/reply/Reply';

export default function CommentSection({
  writer,
  createdAt,
  content,
}: {
  writer: string;
  createdAt: string;
  content: string;
}) {
  const [replyValue, setReplyValue] = useState('');

  return (
    <>
      <div className="text-m mb-5 font-bold">
        댓글
        <span className="text-brand-primary"> 4</span>
      </div>
      <InputReply
        value={replyValue}
        onChange={setReplyValue}
        onSubmit={() => {
          setReplyValue('');
        }}
      />
      <div className="divide-border-primary divide-y">
        <Reply size="lg" author={writer} avatar={null} date={createdAt}>
          {content}
        </Reply>
        <Reply size="lg" author={writer} avatar={null} date={createdAt}>
          {content}
        </Reply>
        <Reply size="sm" author={writer} avatar={null} date={createdAt}>
          {content}
        </Reply>
      </div>
    </>
  );
}
