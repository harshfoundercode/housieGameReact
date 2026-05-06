import React from 'react';

const Pagination = ({ 
  currentPage, 
  totalPages, 
  getPageNumbers, 
  handlePageChange,
  filteredTickets,
  ticketsPerPage 
}) => {
  if (totalPages <= 1) return null;

  return (
    <div className="pagination-container px-2 md:px-4 pb-4 md:pb-6">
      <div className="flex items-center justify-between bg-[#004296]/30 backdrop-blur-sm rounded-xl md:rounded-2xl p-3 md:p-4 border border-[#FBEFA4]/20">
        
        {/* Previous Button */}
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className={`px-3 md:px-4 py-1.5 md:py-2 rounded-lg text-sm md:text-base font-semibold transition-all ${
            currentPage === 1
              ? 'bg-white/10 text-white/40 cursor-not-allowed'
              : 'bg-[#FBEFA4] text-[#004296] hover:bg-[#FFE44D] hover:scale-105'
          }`}
        >
          ← Prev
        </button>

        {/* Page Numbers */}
        <div className="flex items-center gap-1 md:gap-2">
          {getPageNumbers().map((page, index) => (
            page === '...' ? (
              <span key={`ellipsis-${index}`} className="text-white/60 px-1 md:px-2">
                ...
              </span>
            ) : (
              <button
                key={`page-${page}`}
                onClick={() => handlePageChange(page)}
                className={`w-8 h-8 md:w-10 md:h-10 rounded-lg text-sm md:text-base font-bold transition-all ${
                  currentPage === page
                    ? 'bg-[#FBEFA4] text-[#004296] shadow-lg scale-110'
                    : 'bg-white/10 text-white hover:bg-white/20'
                }`}
              >
                {page}
              </button>
            )
          ))}
        </div>

        {/* Next Button */}
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={`px-3 md:px-4 py-1.5 md:py-2 rounded-lg text-sm md:text-base font-semibold transition-all ${
            currentPage === totalPages
              ? 'bg-white/10 text-white/40 cursor-not-allowed'
              : 'bg-[#FBEFA4] text-[#004296] hover:bg-[#FFE44D] hover:scale-105'
          }`}
        >
          Next →
        </button>
      </div>

      {/* Page Info */}
      <div className="text-center mt-2 md:mt-3">
        <p className="text-white/50 text-xs md:text-sm">
          Showing {((currentPage - 1) * ticketsPerPage) + 1} - {Math.min(currentPage * ticketsPerPage, filteredTickets.length)} of {filteredTickets.length} tickets
        </p>
      </div>
    </div>
  );
};

export default Pagination;