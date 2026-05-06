import { useState, useEffect } from 'react';
import { TICKETS_PER_PAGE, MAX_VISIBLE_PAGES } from '../utils/constants';

export const usePagination = (tickets, search) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [filteredTickets, setFilteredTickets] = useState([]);
  const [paginatedTickets, setPaginatedTickets] = useState([]);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const filtered = tickets.filter((ticket) => {
      const searchText = search.toLowerCase();
      return (
        ticket.name.toLowerCase().includes(searchText) ||
        ticket.id.toString().includes(searchText) ||
        ticket.ticketNumber?.toString().includes(searchText)
      );
    });

    setFilteredTickets(filtered);
    
    const total = Math.ceil(filtered.length / TICKETS_PER_PAGE);
    setTotalPages(total);

    const startIndex = (currentPage - 1) * TICKETS_PER_PAGE;
    const endIndex = startIndex + TICKETS_PER_PAGE;
    setPaginatedTickets(filtered.slice(startIndex, endIndex));

    if (currentPage > total && total > 0) {
      setCurrentPage(1);
    }
  }, [tickets, search, currentPage]);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    const ticketsGrid = document.querySelector('.tickets-grid');
    if (ticketsGrid) {
      ticketsGrid.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const getPageNumbers = () => {
    const pages = [];
    
    if (totalPages <= MAX_VISIBLE_PAGES) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      pages.push(1);
      
      let startPage = Math.max(2, currentPage - 1);
      let endPage = Math.min(totalPages - 1, currentPage + 1);
      
      if (currentPage <= 3) endPage = 4;
      if (currentPage >= totalPages - 2) startPage = totalPages - 3;
      
      if (startPage > 2) pages.push('...');
      
      for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
      }
      
      if (endPage < totalPages - 1) pages.push('...');
      
      pages.push(totalPages);
    }
    
    return pages;
  };

  return {
    paginatedTickets,
    filteredTickets,
    currentPage,
    totalPages,
    handlePageChange,
    getPageNumbers
  };
};