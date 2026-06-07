type PageIndicatorProps = {
  currentPage: number;
  totalPages: number;
};

const PageIndicator = ({ currentPage, totalPages }: PageIndicatorProps) => {
  return (
    <div className="flex items-center gap-1.5">
      {Array.from({ length: totalPages }, (_, index) => {
        const isActive = index + 1 === currentPage;
        return (
          <button
            key={index}
            className={
              isActive
                ? 'bg-brand-primary hover:bg-brand-tertiary h-2 w-4 rounded-full'
                : 'bg-text-disabled hover:bg-brand-tertiary h-2 w-2 rounded-full'
            }
          />
        );
      })}
    </div>
  );
};

export default PageIndicator;
