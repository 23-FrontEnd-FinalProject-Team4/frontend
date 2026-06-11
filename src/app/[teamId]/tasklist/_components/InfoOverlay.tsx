'use client';

import { Task } from '@/apis/task/type';
import KebabIcon from '@/assets/icons/kebab.svg?react';
import CalendarIcon from '@/assets/icons/calendar.svg?react';
import RepeatIcon from '@/assets/icons/repeat.svg?react';
import Profile from '@/components/profile/Profile';
import { FREQUENCY_TEXT } from '@/constants/listItem';
import CommentForm from './CommentForm';
import { MOCK_COMMENTS } from '../_constants/mockData';
import Reply from '@/components/reply/Reply';
import XIcon from '@/assets/icons/x.svg?react';
import CheckIcon from '@/assets/icons/check_blue.svg?react';
import Button from '@/components/button/Button';
import { useOutsideClick } from '@/hooks/useOutsideClick';
import { useRef } from 'react';

interface InfoOverlayProps {
  task: Task;
  isOpen: boolean;
  onClose: () => void;
}

const InfoOverlay = ({ task, isOpen, onClose }: InfoOverlayProps) => {
  // TODO: API를 통해 Comment 받아오기
  const comments = MOCK_COMMENTS;

  const isDone = Boolean(task.doneAt);

  const overlayRef = useRef<HTMLDivElement>(null);

  useOutsideClick(overlayRef, onClose);

  // TODO: 기능 추가 예정
  const handleMenuClick = () => {

  }

  if (!isOpen) return null;
  return (
    <div
      className="fixed inset-0 top-16 z-200 overflow-y-auto bg-white px-4 py-3 md:top-0 md:left-1/2 md:px-7 md:py-10 xl:px-10 shadow-xl"
      ref={overlayRef}
    >
      <div className="mb-10 md:mb-14 xl:mb-17">
        <button className="mb-4 md:mb-17.5" onClick={onClose}>
          <XIcon />
        </button>

        <div className="text-text-primary flex items-center justify-between pb-4">
          <div className="flex gap-4">
            <span
              className={`text-xl font-bold md:text-2xl ${isDone && 'text-text-default line-through'}`}
            >
              {task.name}
            </span>
            {isDone && (
              <span className="bg-brand-secondary text-brand-primary rounded-lg px-2.5 py-1.5 text-lg font-bold">
                완료
              </span>
            )}
          </div>

          {/* TODO: 해당 버튼에 기능 추가 */}
          <button className="" onClick={() => {}}>
            <KebabIcon />
          </button>
        </div>

        <div className="flex items-center gap-2 pb-4">
          <Profile src={task.writer.image} alt={task.writer.nickname} />
          <span className="text-md font-medium">{task.writer.nickname}</span>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-2">
            <div className="flex gap-3">
              <div className="flex w-[82px] items-center gap-1.5">
                <CalendarIcon />
                <span className="text-text-default text-xs font-normal">시작 날짜</span>
              </div>
              <div className="flex items-center">
                <span className="text-text-primary text-xs font-normal">{task.startDate}</span>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="flex w-[82px] items-center gap-1.5">
                <RepeatIcon />
                <span className="text-text-default text-xs font-normal">반복 설정</span>
              </div>
              <div className="flex items-center">
                <span className="text-text-primary text-xs font-normal">
                  {FREQUENCY_TEXT[task.frequency]}
                </span>
              </div>
            </div>
          </div>

          <div className="fixed right-4 bottom-6 z-10 md:static md:right-0 md:bottom-0">
            <Button
              icon={<CheckIcon className={isDone ? '' : '[&_path]:stroke-white'} />}
              variant={isDone ? 'secondary-whiteFilled' : 'secondary-filled'}
              // TODO: 기능 연결 시 해당 부분 작성
              onClick={() => {}}
            >
              {isDone ? '완료 취소하기' : '완료하기'}
            </Button>
          </div>
        </div>

        <div className="border-border-primary my-6 border-t" />

        <span className="text-md text-text-primary font-normal">{task.description}</span>
      </div>

      <div>
        <div className="mb-4 flex gap-1">
          <span className="text-text-primary text-lg font-bold">댓글</span>
          <span className="text-brand-primary text-lg font-bold">{comments.length}</span>
        </div>

        {/* Comment Input */}
        <CommentForm writer={task.writer} />

        {/* Comment List */}
        <div className="divide-border-primary divide-y divide-solid">
          {comments.map((comment) => (
            <Reply
              key={comment.id}
              author={comment.user.nickname}
              avatar={<Profile src={comment.user.image} alt={comment.user.nickname} />}
              date={comment.createdAt}
              onMenuClick={handleMenuClick}
            >
              {comment.content}
            </Reply>
          ))}
        </div>
      </div>
    </div>
  );
};

export default InfoOverlay;
