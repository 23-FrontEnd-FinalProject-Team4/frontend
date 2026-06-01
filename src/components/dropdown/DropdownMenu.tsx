import type { DropdownMenuProps } from './type';

export default function DropdownMenu({ options }: DropdownMenuProps) {
  return (
    <div
      className={`border-border-primary bg-background-primary text-md mt-1 flex flex-col rounded-xl border`}
    >
      {options.map((option) => (
        <button key={option.value} className="hover:bg-background-secondary px-3 py-3 text-left">
          {option.label}
        </button>
      ))}
    </div>
  );
}
