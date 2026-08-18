import React from 'react';

const TicketCard = ({ ticket, cart, addToCart, removeFromCart, apiPricing }) => {
  const isInCart = cart.some(item => item.id === ticket.id);
  const ticketStatus = ticket.status || ticket.ticket_status || 'available';
  
  const isBooked = ticketStatus === 'booked' || ticketStatus === 'Booked' || ticketStatus === 'sold';
  const isAvailable = ticketStatus === 'available' || ticketStatus === 'Available';

  // ✅ Calculate display price based on ticket type
  const getDisplayPrice = () => {
    if (!apiPricing) return ticket.price || ticket.ticket_amount || 100;
    
    if (ticket.ticket_type) {
      if (ticket.ticket_type === 'fullsheet') {
        return parseFloat(apiPricing.full_sheet_price) || ticket.price || 100;
      } else if (ticket.ticket_type === 'halfsheet') {
        return parseFloat(apiPricing.half_sheet_price) || ticket.price || 100;
      }
    }
    return ticket.price || ticket.ticket_amount || 100;
  };

  const displayPrice = getDisplayPrice();

  const handleRemoveFromCart = (e) => {
    e.stopPropagation();
    if (window.confirm(`Remove ticket #${ticket.ticketNumber || ticket.id} from cart?`)) {
      removeFromCart(ticket.id);
    }
  };

  return (
    <div
      className={`ticket-card group relative bg-white rounded-xl md:rounded-2xl p-2 sm:p-3 shadow-lg hover:shadow-xl transition-all duration-300 border-2 ${
        isInCart ? 'border-green-500' : 
        isBooked ? 'border-red-400 opacity-70' : 
        'border-[#FBEFA4] hover:border-[#FBEFA4]'
      } hover:scale-[1.02]`}
    >
      {/* Status Badges */}
      {isInCart && (
        <div className="absolute top-1 right-1 bg-green-500 text-white px-1.5 py-0.5 rounded-full text-[10px] font-bold z-20">
          ✓ In Cart
        </div>
      )}
      {isBooked && (
        <div className="absolute top-1 right-1 bg-red-500 text-white px-1.5 py-0.5 rounded-full text-[10px] font-bold z-20">
          Booked
        </div>
      )}
      
      <div className="relative z-10">
        {/* TITLE */}
        <div className={`overflow-hidden bg-linear-to-r from-[#004296] to-[#003380] mb-1.5 rounded-lg p-1.5 border ${isBooked ? 'border-red-400/30' : 'border-[#FBEFA4]/30'}`}>
          <h1 className="ticket-title text-sm sm:text-base font-bold text-center text-[#FBEFA4] tracking-wider">
            Ticket #{ticket.ticketNumber || ticket.id}
          </h1>
        </div>

        {/* MAIN CONTENT */}
        <div className="ticket-content flex flex-col gap-1.5">
          <div className="booked-info bg-[#FBEFA4]/10 text-gray-800 rounded-lg p-1.5 text-[10px] sm:text-xs shadow border border-[#FBEFA4]/30">
            <p><b className="text-[#004296]">Price:</b> ₹{displayPrice}</p>
            {ticket.ticket_type && (
              <p><b className="text-[#004296]">Type:</b> 
                <span className={
                  ticket.ticket_type === 'fullsheet' ? 'text-green-600 font-semibold' :
                  ticket.ticket_type === 'halfsheet' ? 'text-blue-600 font-semibold' :
                  'text-yellow-600 font-semibold'
                }>
                  {' '}{ticket.ticket_type}
                </span>
              </p>
            )}
            <p><b className="text-[#004296]">Status:</b> 
              <span className={
                isAvailable ? 'text-green-600 font-semibold' : 
                isBooked ? 'text-red-600 font-semibold' : 
                'text-orange-600 font-semibold'
              }>
                {' '}{isAvailable ? 'Available' : isBooked ? 'Booked' : ticketStatus}
              </span>
            </p>
          </div>

          <div className="bg-gray-50 p-1 rounded-lg shadow-inner border border-gray-200">
            <div className="ticket-grid-numbers grid grid-cols-9 gap-[1px]">
              {ticket.numbers && ticket.numbers.length > 0 ? (
                ticket.numbers.map((row, i) => (
                  <React.Fragment key={i}>
                    {row.map((num, j) => (
                      <div
                        key={`${i}-${j}`}
                        className={`number-cell h-4 sm:h-5 md:h-6 flex items-center justify-center text-[8px] sm:text-[10px] font-bold rounded
                          ${num !== null && num !== 0 && num !== ""
                            ? "bg-linear-to-br from-[#004296] to-[#003380] text-white border-[#FBEFA4]/40"
                            : "bg-gray-200 text-gray-400"}`}
                      >
                        {num !== null && num !== 0 && num !== "" ? num : ""}
                      </div>
                    ))}
                  </React.Fragment>
                ))
              ) : (
                <div className="col-span-9 text-center py-2 text-gray-400 text-[10px]">No numbers available</div>
              )}
            </div>
          </div>

          <div className="ticket-buttons flex gap-1.5 mt-1">
            {!isInCart ? (
              <button 
                onClick={() => addToCart(ticket)} 
                disabled={!isAvailable}
                className={`flex-1 py-1 px-2 rounded-lg text-[10px] sm:text-xs font-semibold transition-all shadow-md ${
                  !isAvailable
                    ? 'bg-gray-400 text-white cursor-not-allowed'
                    : 'bg-linear-to-r from-[#004296] to-[#003380] hover:from-[#003380] hover:to-[#004296] text-white border border-[#FBEFA4]/30'
                }`}
              >
                {!isAvailable ? 'Sold Out' : 'Add to Cart'}
              </button>
            ) : (
              <button 
                onClick={handleRemoveFromCart}
                className="flex-1 py-1 px-2 rounded-lg text-[10px] sm:text-xs font-semibold transition-all shadow-md bg-red-500 hover:bg-red-600 text-white"
              >
                Remove from Cart
              </button>
            )}
            
            <button 
              onClick={() => addToCart(ticket)}
              disabled={!isAvailable || isInCart}
              className="flex-1 bg-[#FBEFA4] hover:bg-[#FFE44D] text-[#004296] py-1 px-2 rounded-lg text-[10px] sm:text-xs font-semibold transition-all shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isInCart ? 'In Cart' : 'Buy Now'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TicketCard;