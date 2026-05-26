
import React from 'react';

const TicketCard = ({ ticket, cart, addToCart }) => {
  const isInCart = cart.some(item => item.id === ticket.id);

  return (
    <div
      className={`ticket-card group relative bg-white rounded-xl md:rounded-2xl p-2 sm:p-3 shadow-lg hover:shadow-xl transition-all duration-300 border-2 ${
        isInCart ? 'border-green-500' : 'border-[#FBEFA4] hover:border-[#FBEFA4]'
      } hover:scale-[1.02]`}
    >
      {isInCart && (
        <div className="absolute top-1 right-1 bg-green-500 text-white px-1.5 py-0.5 rounded-full text-[10px] font-bold z-20">
          ✓ In Cart
        </div>
      )}
      
      <div className="relative z-10">
        {/* TITLE */}
        <div className="overflow-hidden bg-linear-to-r from-[#004296] to-[#003380] mb-1.5 rounded-lg p-1.5 border border-[#FBEFA4]/30">
          <h1 className="ticket-title text-sm sm:text-base font-bold text-center text-[#FBEFA4] tracking-wider">
            Ticket #{ticket.ticketNumber || ticket.id}
          </h1>
        </div>

        {/* MAIN CONTENT - Stacked for compact view */}
        <div className="ticket-content flex flex-col gap-1.5">
          <div className="booked-info bg-[#FBEFA4]/10 text-gray-800 rounded-lg p-1.5 text-[10px] sm:text-xs shadow border border-[#FBEFA4]/30">
            <p><b className="text-[#004296]">Price:</b> ₹{ticket.price || 100}</p>
            <p><b className="text-[#004296]">Status:</b> <span className={ticket.status === 'available' ? 'text-green-600' : 'text-red-600'}>{ticket.status || 'available'}</span></p>
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
            <button 
              onClick={() => addToCart(ticket)} 
              disabled={isInCart || ticket.status !== 'available'}
              className={`flex-1 py-1 px-2 rounded-lg text-[10px] sm:text-xs font-semibold transition-all shadow-md ${
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
              className="flex-1 bg-[#FBEFA4] hover:bg-[#FFE44D] text-[#004296] py-1 px-2 rounded-lg text-[10px] sm:text-xs font-semibold transition-all shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Buy Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TicketCard;