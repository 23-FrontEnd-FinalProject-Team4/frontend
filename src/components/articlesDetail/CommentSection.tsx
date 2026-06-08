'use client';

import { useState } from 'react';

import type { Comment } from '@/components/articlesDetail/Comment.type';
import InputReply from '@/components/inputReply/InputReply';
import Reply from '@/components/reply/Reply';

export default function CommentSection({ comments }: { comments: Comment[] | null }) {
  const [replyValue, setReplyValue] = useState('');

  return (
    <>
      <div className="text-m mb-5 flex gap-1 font-bold">
        댓글
        <span className="text-brand-primary">{comments?.length || 0}</span>
      </div>
      <InputReply
        value={replyValue}
        onChange={setReplyValue}
        onSubmit={() => {
          setReplyValue('');
        }}
      />
      {/* api 연동 시 수정 필요 */}
      <div className="divide-border-primary divide-y">
        {comments && comments.length > 0 ? (
          comments.map((comment: Comment) => (
            <Reply
              key={comment.id}
              size="lg"
              author={comment.writer.nickname}
              avatar={comment.writer.image || null}
              date={comment.createdAt}
            >
              {comment.content}
            </Reply>
          ))
        ) : (
          <div className="text-text-disabled py-4 text-center text-sm">
            아직 작성된 댓글이 없습니다.
          </div>
        )}
      </div>
    </>
  );
}
