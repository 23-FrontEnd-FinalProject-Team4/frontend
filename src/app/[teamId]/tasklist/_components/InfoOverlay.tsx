'use client';

import { useRef, useState } from 'react';

import CalendarIcon from '@/assets/icons/calendar.svg?react';
import CheckIcon from '@/assets/icons/check_blue.svg?react';
import KebabIcon from '@/assets/icons/kebab.svg?react';
import RepeatIcon from '@/assets/icons/repeat.svg?react';
import XIcon from '@/assets/icons/x.svg?react';
import Button from '@/components/button/Button';
import Dropdown from '@/components/dropdown/Dropdown';
import Profile from '@/components/profile/Profile';
import Reply from '@/components/reply/Reply';
import { FREQUENCY_TEXT, OPTIONS } from '@/constants/listItem';
import { useOutsideClick } from '@/hooks/useOutsideClick';
import {
  useDeleteTaskComment,
  useGetTaskComments,
  useUpdateTaskComment,
} from '@/queries/task/comment/queries';
import { useGetTask, useToggleTask } from '@/queries/task/queries';
import { formatYearMonthDay } from '@/utils/date';

import CommentForm from './CommentForm';

interface InfoOverlayProps {
  groupId: number;
  taskListId: number;
  taskId: number;
  isOpen: boolean;
  onClose: () => void;
}

const InfoOverlay = ({ taskId, isOpen, onClose, taskListId, groupId }: InfoOverlayProps) => {
  const { data: task } = useGetTask({ taskId, taskListId, groupId });
  const { mutate: toggleTask } = useToggleTask();

  const { data: comments, isPending } = useGetTaskComments({ taskId });
  const { mutate: editComment } = useUpdateTaskComment();
  const { mutate: deleteComment } = useDeleteTaskComment();

  const overlayRef = useRef<HTMLDivElement>(null);
  useOutsideClick(overlayRef, onClose);

  const [selectedCommentId, setSelectedCommentId] = useState<number | null>(null);
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  useOutsideClick(dropdownRef, () => {
    setSelectedCommentId(null);
  });

  if (!task) return null;

  const isDone = Boolean(task.doneAt);

  const handleMenuClick = (id: number) => {
    setSelectedCommentId(id);
  };

  const handleMenuItemSelect = (value: string, commentId: number) => {
    if (value === 'DELETE') {
      deleteComment({ taskId: task!.id, commentId });
    }
    setSelectedCommentId(null);
  };

  const handleToggle = async () => {
    toggleTask({ groupId, taskId, done: !isDone, taskListId });
  };

  if (!isOpen || isPending || !task) return null;
  return (
    <div
      className="fixed inset-0 top-16 z-200 overflow-y-auto bg-white px-4 py-3 shadow-xl md:top-0 md:left-1/2 md:px-7 md:py-10 xl:px-10"
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
          <Profile src={task.writer?.image} alt={task.writer?.nickname ?? ''} />
          <span className="text-md font-medium">{task.writer?.nickname}</span>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-2">
            <div className="flex gap-3">
              <div className="flex w-[82px] items-center gap-1.5">
                <CalendarIcon />
                <span className="text-text-default text-xs font-normal">시작 날짜</span>
              </div>
              <div className="flex items-center">
                <span className="text-text-primary text-xs font-normal">
                  {task.startDate
                    ? formatYearMonthDay(new Date(task.startDate))
                    : formatYearMonthDay(new Date())}
                </span>
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
              onClick={handleToggle}
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
          <span className="text-brand-primary text-lg font-bold">{comments?.length ?? 0}</span>
        </div>

        {/* Comment Input */}
        <CommentForm writer={task.writer} taskId={task.id} />

        {/* Comment List */}
        <div className="divide-border-primary divide-y divide-solid">
          {comments &&
            comments.map((comment) => (
              <div className="relative" key={comment.id}>
                <Reply
                  author={comment.user.nickname}
                  avatar={<Profile src={comment.user.image} alt={comment.user.nickname} />}
                  date={formatYearMonthDay(new Date(comment.createdAt))}
                  onMenuClick={() => handleMenuClick(comment.id)}
                >
                  {comment.content}
                </Reply>
                {selectedCommentId === comment.id && (
                  <div className="absolute top-10 right-30" ref={dropdownRef}>
                    <Dropdown
                      options={OPTIONS}
                      onSelect={(value) => handleMenuItemSelect(value, comment.id)}
                    />
                  </div>
                )}
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default InfoOverlay;
