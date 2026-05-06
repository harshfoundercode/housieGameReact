import React from 'react';

const SearchBar = ({ search, setSearch }) => {
  return (
    <div className="w-full flex justify-center p-2 md:p-3 relative">
      <div className="search-container relative w-full sm:w-[90%] md:w-125 lg:w-150 p-2">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="🔍 Search by ticket number..."
          className="search-input w-full px-4 sm:px-6 py-2 sm:py-3 rounded-full bg-white/10 backdrop-blur-sm text-white placeholder-white/50 border-2 border-[#FBEFA4]/40 text-sm sm:text-base outline-none focus:border-[#FBEFA4] transition-all"
        />
        {search && (
          <button
            onClick={() => setSearch("")}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-[#FBEFA4] hover:text-white bg-[#004296]/50 rounded-full w-6 h-6 flex items-center justify-center"
          >
            ✕
          </button>
        )}
      </div>
    </div>
  );
};

export default SearchBar;