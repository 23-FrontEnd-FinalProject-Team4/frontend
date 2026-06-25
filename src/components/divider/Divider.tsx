import { cn } from '@/utils/cn';

interface DividerProps {
  label?: string;
  className?: string;
}

const Divider = ({ label = 'OR', className }: DividerProps) => {
  return (
    <div className={cn('flex items-center gap-8', className)}>
      <div className="bg-border-primary h-px flex-1" />
      <span className="text-text-default text-md font-normal">{label}</span>
      <div className="bg-border-primary h-px flex-1" />
    </div>
  );
};

export default Divider;
