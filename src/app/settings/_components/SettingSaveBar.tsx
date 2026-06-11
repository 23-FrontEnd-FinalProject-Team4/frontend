import AlertIcon from '@/assets/icons/alert.svg';

interface SettingSaveBarProps {
  description: string;
  formId: string;
  buttonText: string;
}

const SettingSaveBar = ({ description, formId, buttonText }: SettingSaveBarProps) => {
  return (
    <aside className="bg-brand-primary text-md mx-6 flex items-center justify-between rounded-xl px-4 py-3 text-white">
      <p className="flex items-center gap-2">
        <AlertIcon className="h-4 w-4 text-white" aria-hidden />
        <span>{description}</span>
      </p>
      <button
        type="submit"
        form={formId}
        className="bg-background-primary text-brand-primary rounded-lg px-4 py-2"
      >
        {buttonText}
      </button>
    </aside>
  );
};

export default SettingSaveBar;
