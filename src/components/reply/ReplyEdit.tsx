import type { ReplyEditProps } from './type';

const ReplyEdit = ({ author, avatar, value, onChange, onCancel, onSubmit }: ReplyEditProps) => {
  const isDisabled = !value.trim();

  return (
    <div className="bg-slate-50 px-5 py-6">
      <div className="flex items-start gap-3 pl-11">
        <div className="shrink-0">{avatar}</div>

        <div className="-mt-0.5 min-w-0 flex-1">
          <strong className="text-text-primary text-sm font-semibold">{author}</strong>

          <textarea
            value={value}
            rows={1}
            aria-label="댓글 수정"
            onChange={(event) => onChange(event.target.value)}
            className="text-text-primary [field-sizing:content] w-full resize-none py-1 text-sm outline-none"
          />

          <div className="mt-2 flex justify-end gap-6">
            <button
              type="button"
              onClick={onCancel}
              className="text-text-default text-md font-medium"
            >
              취소
            </button>

            <button
              type="button"
              disabled={isDisabled}
              onClick={onSubmit}
              className="border-brand-primary text-brand-primary text-md rounded-lg border px-3 py-2 font-medium disabled:cursor-not-allowed disabled:opacity-40"
            >
              수정하기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReplyEdit;
