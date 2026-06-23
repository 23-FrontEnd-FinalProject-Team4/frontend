const EmptyHistory = () => {
  return (
    <div className="text-text-default flex flex-col items-center py-50 text-center text-xl">
      <span className="text-text-default mb-2">아직 완료된 작업이 없어요.</span>
      <span className="text-text-default">하나씩 완료해가며 히스토리를 만들어보세요!</span>
    </div>
  );
};

export default EmptyHistory;
