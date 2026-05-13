// components/TicketGrid.jsx
import React from 'react';
import TicketCard from './TicketCard';
import TicketGroupDisplay from './TicketGroupDisplay';

const TicketsGrid = ({ paginatedTickets, cart, addToCart }) => {
  return (
    <div className="tickets-container">
      {/* Ticket Groups Display - Shows above the grid */}
      <TicketGroupDisplay cart={cart} />
      
      {/* Existing Tickets Grid */}
      <div className="tickets-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-6 pb-6 p-2 md:p-4 relative">
        {paginatedTickets.length > 0 ? (
          paginatedTickets.map((ticket) => (
            <TicketCard
              key={ticket.id}
              ticket={ticket}
              cart={cart}
              addToCart={addToCart}
            />
          ))
        ) : (
          <div className="col-span-full text-center py-8 sm:py-12">
            <p className="text-lg sm:text-2xl text-[#FBEFA4]">No tickets found</p>
            <p className="text-white/60 text-sm sm:text-base mt-2">Try a different search term</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TicketsGrid;