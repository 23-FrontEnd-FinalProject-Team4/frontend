import AlertIcon from '@/assets/icons/alert.svg';

interface SettingSaveBarProps {
  description: string;
  buttonText: string;
  disabled?: boolean;
  onSave?: () => void | Promise<void>;
}

const SettingSaveBar = ({
  description,
  buttonText,
  disabled = false,
  onSave,
}: SettingSaveBarProps) => {
  return (
    <aside className="bg-brand-primary text-md mx-6 flex items-center justify-between rounded-xl px-4 py-3 text-white">
      <p className="flex items-center gap-2">
        <AlertIcon className="h-4 w-4 text-white" aria-hidden />
        <span>{description}</span>
      </p>
      <button
        type="button"
        disabled={disabled}
        onClick={onSave}
        className="bg-background-primary text-brand-primary rounded-lg px-4 py-2"
      >
        {buttonText}
      </button>
    </aside>
  );
};

export default SettingSaveBar;
