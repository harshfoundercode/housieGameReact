import React from 'react';
import TicketCard from './TicketCard';
import TicketGroupDisplay from './TicketGroupDisplay';

const TicketsGrid = ({ 
  paginatedTickets, 
  cart, 
  addToCart, 
  removeFromCart,
  apiPricing
}) => {
  return (
    <div className="tickets-container">
      <TicketGroupDisplay cart={cart} apiPricing={apiPricing} />
      
      <div className="tickets-grid grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2 sm:gap-3 md:gap-4 pb-6 p-2 md:p-4 relative">
        {paginatedTickets.length > 0 ? (
          paginatedTickets.map((ticket) => (
            <TicketCard
              key={ticket.id}
              ticket={ticket}
              cart={cart}
              addToCart={addToCart}
              removeFromCart={removeFromCart}
              apiPricing={apiPricing}
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