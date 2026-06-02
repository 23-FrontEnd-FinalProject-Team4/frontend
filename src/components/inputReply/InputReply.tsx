'use client';

import { useEffect, useRef, useState } from 'react';

import SendArrowIcon from '@/assets/icons/send_arrow.svg?react';
import { cn } from '@/utils/cn';

import type { InputReplyProps } from './type';

const sizeClass = {
  sm: {
    textarea: 'text-xs',
    button: 'right-3 top-2.5',
  },
  lg: {
    textarea: 'text-md',
    button: 'right-3 top-3',
  },
} as const;

const hasMultipleLines = (textarea: HTMLTextAreaElement) => {
  const lineHeight = Number.parseFloat(getComputedStyle(textarea).lineHeight);

  return textarea.scrollHeight > lineHeight + 1;
};

const InputReply = ({
  size = 'sm',
  value,
  placeholder = '댓글을 달아주세요',
  onChange,
  onSubmit,
}: InputReplyProps) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [isMultiline, setIsMultiline] = useState(false);

  const isDisabled = !value.trim();
  const isSmallSize = size === 'sm';

  useEffect(() => {
    const textarea = textareaRef.current;

    if (!textarea || !isSmallSize) {
      setIsMultiline(false);
      return;
    }

    setIsMultiline(hasMultipleLines(textarea));
  }, [value, isSmallSize]);

  const roundedClass = isSmallSize && !isMultiline ? 'rounded-full' : 'rounded-2xl';

  return (
    <div
      className={cn(
        'border-border-primary relative min-h-12 w-full border bg-white py-4 pr-11 pl-4',
        roundedClass,
      )}
    >
      <textarea
        ref={textareaRef}
        value={value}
        placeholder={placeholder}
        rows={1}
        onChange={(event) => onChange(event.target.value)}
        className={cn(
          'placeholder:text-text-default block [field-sizing:content] w-full resize-none bg-transparent outline-none',
          sizeClass[size].textarea,
        )}
      />

      <button
        type="button"
        aria-label="댓글 등록"
        disabled={isDisabled}
        onClick={onSubmit}
        className={cn(
          'absolute flex size-6 items-center justify-center rounded-full text-white transition-colors',
          sizeClass[size].button,
          isDisabled ? 'bg-icon-primary cursor-not-allowed' : 'bg-icon-brand cursor-pointer',
        )}
      >
        <SendArrowIcon width={16} height={16} aria-hidden />
      </button>
    </div>
  );
};

export default InputReply;
