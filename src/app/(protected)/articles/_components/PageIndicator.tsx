type PageIndicatorProps = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

const dotButtonClassName =
  'focus-visible:ring-brand-primary rounded-full focus-visible:ring-2 focus-visible:outline-none';

const PageIndicator = ({ currentPage, totalPages, onPageChange }: PageIndicatorProps) => {
  return (
    <div className="flex items-center gap-1.5" role="group" aria-label="페이지 선택">
      {Array.from({ length: totalPages }, (_, index) => {
        const pageNumber = index + 1;
        const isActive = pageNumber === currentPage;
        return (
          <button
            type="button"
            key={pageNumber}
            aria-label={`${pageNumber}페이지로 이동`}
            aria-current={isActive ? 'page' : undefined}
            className={
              isActive
                ? `${dotButtonClassName} bg-brand-primary hover:bg-brand-tertiary h-2 w-4`
                : `${dotButtonClassName} bg-text-disabled hover:bg-brand-tertiary h-2 w-2`
            }
            onClick={() => onPageChange(pageNumber)}
          />
        );
      })}
    </div>
  );
};

export default PageIndicator;
