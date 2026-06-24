import type { ComponentPropsWithoutRef } from 'react';

import { cn } from '@/utils/cn';

type SkeletonProps = ComponentPropsWithoutRef<'div'>;

const Skeleton = ({ className, ...props }: SkeletonProps) => {
  return (
    <div
      {...props}
      aria-hidden="true"
      className={cn(
        'bg-background-tertiary motion-safe:animate-pulse motion-reduce:animate-none',
        className,
      )}
    />
  );
};

export default Skeleton;
