type PageIndicatorProps = {
  currentPage: number;
  totalPages: number;
};

export default function PageIndicator({ currentPage, totalPages }: PageIndicatorProps) {
  return (
    <div className="flex items-center gap-1.5">
      {Array.from({ length: totalPages }, (_, index) => {
        const isActive = index + 1 === currentPage;
        return (
          <span
            key={index}
            className={
              isActive
                ? 'bg-brand-primary h-2 w-4 rounded-full'
                : 'bg-text-disabled h-2 w-2 rounded-full'
            }
          />
        );
      })}
    </div>
  );
}
