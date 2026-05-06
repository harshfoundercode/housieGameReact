import React from 'react';

const TicketCard = ({ ticket, cart, addToCart }) => {
  const isInCart = cart.some(item => item.id === ticket.id);

  return (
    <div
      className={`ticket-card group relative bg-white rounded-2xl md:rounded-3xl p-3 sm:p-4 shadow-xl hover:shadow-2xl transition-all duration-300 border-2 ${
        isInCart ? 'border-green-500' : 'border-[#FBEFA4] hover:border-[#FBEFA4]'
      } hover:scale-[1.02]`}
    >
      {isInCart && (
        <div className="absolute top-2 right-2 bg-green-500 text-white px-2 py-1 rounded-full text-xs font-bold z-20">
          ✓ In Cart
        </div>
      )}
      
      <div className="relative z-10">
        {/* TITLE */}
        <div className="overflow-hidden bg-linear-to-r from-[#004296] to-[#003380] mb-2 md:mb-3 rounded-xl p-2 border border-[#FBEFA4]/30">
          <h1 className="ticket-title text-xl sm:text-2xl font-bold text-center text-[#FBEFA4] tracking-wider">
            Ticket #{ticket.ticketNumber || ticket.id}
          </h1>
        </div>

        {/* MAIN CONTENT */}
        <div className="ticket-content flex flex-col sm:flex-row gap-3 md:gap-4">
          <div className="flex-1">
            <div className="booked-info bg-[#FBEFA4]/10 text-gray-800 rounded-xl md:rounded-2xl p-2 sm:p-3 mb-2 md:mb-3 text-xs sm:text-sm shadow border border-[#FBEFA4]/30">
              <p><b className="text-[#004296]">Price:</b> ₹{ticket.price || 100}</p>
              <p><b className="text-[#004296]">Status:</b> <span className={ticket.status === 'available' ? 'text-green-600' : 'text-red-600'}>{ticket.status || 'available'}</span></p>
            </div>

            <div className="bg-gray-50 p-1 sm:p-2 rounded-xl md:rounded-2xl shadow-inner border border-gray-200">
              <div className="ticket-grid-numbers grid grid-cols-9 gap-0.5 sm:gap-1">
                {ticket.numbers && ticket.numbers.length > 0 ? (
                  ticket.numbers.map((row, i) => (
                    <React.Fragment key={i}>
                      {row.map((num, j) => (
                        <div
                          key={`${i}-${j}`}
                          className={`number-cell h-6 sm:h-7 md:h-8 flex items-center justify-center text-[0.625rem] sm:text-xs font-bold rounded border
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
                  <div className="col-span-9 text-center py-4 text-gray-400">No numbers available</div>
                )}
              </div>
            </div>
          </div>

          <div className="ticket-right w-full sm:w-[40%] flex flex-col justify-between">
            <p className="text-xs sm:text-sm text-gray-700 mb-2 font-medium">
              Book the ticket. We have big prize for this game.
            </p>

            <div className="ticket-buttons flex flex-row sm:flex-col gap-2 mt-2">
              <button 
                onClick={() => addToCart(ticket)}
                disabled={isInCart || ticket.status !== 'available'}
                className={`py-1.5 sm:py-2 px-3 rounded-lg text-sm sm:text-base font-semibold transition-all shadow-md ${
                  isInCart 
                    ? 'bg-green-500 text-white cursor-not-allowed' 
                    : ticket.status !== 'available'
                    ? 'bg-gray-400 text-white cursor-not-allowed'
                    : 'bg-linear-to-r from-[#004296] to-[#003380] hover:from-[#003380] hover:to-[#004296] text-white border border-[#FBEFA4]/30'
                }`}
              >
                {isInCart ? '✓ Added' : ticket.status !== 'available' ? 'Sold Out' : 'Add to Cart'}
              </button>
              <button 
                onClick={() => addToCart(ticket)}
                disabled={ticket.status !== 'available'}
                className="bg-[#FBEFA4] hover:bg-[#FFE44D] text-[#004296] py-1.5 sm:py-2 px-3 rounded-lg text-sm sm:text-base font-semibold transition-all shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Buy Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TicketCard;