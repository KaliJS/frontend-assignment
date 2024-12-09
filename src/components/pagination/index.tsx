import React from "react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
  const pageNumbers = [];

  const startPage = Math.max(1, currentPage - 1);
  const endPage = Math.min(totalPages, currentPage + 1);

  if (currentPage > 2) {
    pageNumbers.push(1);
    if (startPage > 2) {
      pageNumbers.push("...");
    }
  }

  for (let i = startPage; i <= endPage; i++) {
    pageNumbers.push(i);
  }

  if (currentPage < totalPages - 1) {
    if (endPage < totalPages - 1) {
      pageNumbers.push("...");
    }
    pageNumbers.push(totalPages);
  }

  return (
    <div className="pagination">
      <button onClick={() => onPageChange(currentPage - 1)} disabled={currentPage === 1} aria-label="Go to previous page">
        Previous
      </button>

      {pageNumbers.map((page, index) =>
        page === "..." ? (
          <span key={index} className="dots">
            ...
          </span>
        ) : (
          <button key={index} onClick={() => onPageChange(page as number)} className={currentPage === page ? "active" : ""} aria-label={`Go to page ${page}`}>
            {page}
          </button>
        )
      )}

      <button onClick={() => onPageChange(currentPage + 1)} disabled={currentPage === totalPages} aria-label="Go to next page">
        Next
      </button>
    </div>
  );
};

export default Pagination;
