type PageIndicatorProps = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

const PageIndicator = ({ currentPage, totalPages, onPageChange }: PageIndicatorProps) => {
  return (
    <div className="flex items-center gap-1.5">
      {Array.from({ length: totalPages }, (_, index) => {
        const isActive = index + 1 === currentPage;
        return (
          <button
            type="button"
            key={index + 1}
            className={
              isActive
                ? 'bg-brand-primary hover:bg-brand-tertiary h-2 w-4 rounded-full'
                : 'bg-text-disabled hover:bg-brand-tertiary h-2 w-2 rounded-full'
            }
            onClick={() => onPageChange(index + 1)}
          />
        );
      })}
    </div>
  );
};

export default PageIndicator;
