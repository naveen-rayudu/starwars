import "./CustomPagination.css";

type PaginationProps = {
  currentPageNumber: number;
  finalPageNumber: number;
  setNewPageNumber: (newPageNumber: number) => any;
};

function CustomPagination({
  currentPageNumber,
  finalPageNumber,
  setNewPageNumber,
}: PaginationProps) {
  return (
    <div className="custom-pagination">
      <button
        onClick={() => setNewPageNumber(currentPageNumber - 1)}
        disabled={currentPageNumber === 1}
        className="prev-button"
      >
        Prev
      </button>
      <div>{`${currentPageNumber} of ${finalPageNumber}`}</div>
      <button
        onClick={() => setNewPageNumber(currentPageNumber + 1)}
        disabled={currentPageNumber === finalPageNumber}
        className="prev-button"
      >
        Next
      </button>
    </div>
  );
}
export default CustomPagination;
