import type { InputBoxProps } from './type';

const sharedBoxStyle = 'min-w-[300px] px-4 py-3' as const;

const sizeStyle = {
  sm: `${sharedBoxStyle} text-md`,
  lg: `${sharedBoxStyle} text-lg`,
} as const;

export default function InputBox({
  size = 'sm',
  value,
  onChange,
  placeholder = '내용을 입력하세요',
  disabled = false,
  className = '',
  ...props
}: InputBoxProps) {
  const inputBoxClassName = `
    resize-none overflow-y-auto overflow-x-hidden
    rounded-xl border border-border-primary
    bg-background-primary

    text-text-primary
    placeholder:text-text-default

    outline-none transition-colors
    hover:border-interaction-hover
    focus:border-interaction-pressed

    disabled:bg-background-secondary
    disabled:text-text-disabled
    disabled:placeholder:text-text-default

    ${sizeStyle[size]}
    ${className}
  `;

  return (
    <textarea
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      disabled={disabled}
      className={inputBoxClassName}
      {...props}
    />
  );
}
