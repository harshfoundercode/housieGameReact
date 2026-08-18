import React from 'react';
import TicketGroupDisplay from './TicketGroupDisplay';

const CartModal = ({ 
  showCart, 
  setShowCart, 
  cart, 
  removeFromCart, 
  getCartTotal, 
  getCartCount, 
  clearCart, 
  handleProceedToCheckout,
  apiPricing
}) => {
  if (!showCart) return null;

  // Group tickets to show correct pricing with type information
  const groupTicketsForDisplay = () => {
    if (!cart || cart.length === 0) return [];

    const ticketNumbers = cart.map(ticket => {
      const num = parseInt(ticket.ticketNumber || ticket.ticket_number || ticket.id || '0');
      return { ticket, number: num };
    }).sort((a, b) => a.number - b.number);

    const rows = {};
    ticketNumbers.forEach(({ ticket, number }) => {
      const rowNumber = Math.ceil(number / 6);
      if (!rows[rowNumber]) {
        rows[rowNumber] = [];
      }
      rows[rowNumber].push({ ticket, number });
    });

    const displayItems = [];

    Object.values(rows).forEach(rowTickets => {
      rowTickets.sort((a, b) => a.number - b.number);
      
      let i = 0;
      while (i < rowTickets.length) {
        // Check for full sheet (6 consecutive)
        if (i + 5 < rowTickets.length && 
            rowTickets[i + 5].number - rowTickets[i].number === 5) {
          let isConsecutive = true;
          for (let j = 1; j < 6; j++) {
            if (rowTickets[i + j].number - rowTickets[i + j - 1].number !== 1) {
              isConsecutive = false;
              break;
            }
          }
          
          if (isConsecutive) {
            const sheetTickets = rowTickets.slice(i, i + 6).map(t => t.ticket);
            const price = parseFloat(apiPricing?.full_sheet_price) || 0;
            const ticketType = 'fullsheet';
            
            displayItems.push({
              type: 'fullSheet',
              ticketType: ticketType,
              tickets: sheetTickets,
              price: price,
              ticketNumbers: sheetTickets.map(t => t.ticketNumber || t.ticket_number || t.id),
              ticketDetails: sheetTickets.map(t => ({
                ticket_id: parseInt(t.id || t.ticket_id || 0),
                ticket_name: ticketType,
                ticket_amount: parseFloat(price / 6)
              }))
            });
            i += 6;
            continue;
          }
        }
        
        // Check for half sheet (3 consecutive)
        if (i + 2 < rowTickets.length && 
            rowTickets[i + 2].number - rowTickets[i].number === 2) {
          let isConsecutive = true;
          for (let j = 1; j < 3; j++) {
            if (rowTickets[i + j].number - rowTickets[i + j - 1].number !== 1) {
              isConsecutive = false;
              break;
            }
          }
          
          if (isConsecutive) {
            const sheetTickets = rowTickets.slice(i, i + 3).map(t => t.ticket);
            const price = parseFloat(apiPricing?.half_sheet_price) || 0;
            const ticketType = 'halfsheet';
            
            displayItems.push({
              type: 'halfSheet',
              ticketType: ticketType,
              tickets: sheetTickets,
              price: price,
              ticketNumbers: sheetTickets.map(t => t.ticketNumber || t.ticket_number || t.id),
              ticketDetails: sheetTickets.map(t => ({
                ticket_id: parseInt(t.id || t.ticket_id || 0),
                ticket_name: ticketType,
                ticket_amount: parseFloat(price / 3)
              }))
            });
            i += 3;
            continue;
          }
        }
        
        // Random single ticket
        const ticket = rowTickets[i].ticket;
        const ticketType = 'random';
        const price = ticket.price || 100;
        
        displayItems.push({
          type: 'random',
          ticketType: ticketType,
          tickets: [ticket],
          price: price,
          ticketNumbers: [ticket.ticketNumber || ticket.ticket_number || ticket.id],
          ticketDetails: [{
            ticket_id: parseInt(ticket.id || ticket.ticket_id || 0),
            ticket_name: ticketType,
            ticket_amount: parseFloat(price)
          }]
        });
        i++;
      }
    });

    return displayItems;
  };

  const displayItems = groupTicketsForDisplay();

  const getGroupTypeLabel = (type) => {
    switch(type) {
      case 'fullSheet':
        return { text: 'FULL SHEET', color: 'text-green-400', bg: 'bg-green-500/20', border: 'border-green-400/50' };
      case 'halfSheet':
        return { text: 'HALF SHEET', color: 'text-blue-400', bg: 'bg-blue-500/20', border: 'border-blue-400/50' };
      case 'random':
        return { text: 'RANDOM', color: 'text-yellow-400', bg: 'bg-yellow-500/20', border: 'border-yellow-400/50' };
      default:
        return { text: 'TICKET', color: 'text-white', bg: 'bg-white/10', border: 'border-white/30' };
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/80 backdrop-blur-sm">
      <div className="bg-gradient-to-br from-[#004296] to-[#002b66] rounded-2xl sm:rounded-3xl w-full max-w-[95%] sm:max-w-4xl max-h-[90vh] overflow-y-auto border-2 border-[#FBEFA4]/50 shadow-2xl">
        <div className="sticky top-0 bg-gradient-to-r from-[#004296] to-[#003380] p-4 sm:p-6 rounded-t-2xl sm:rounded-t-3xl border-b-2 border-[#FBEFA4]/50 z-10">
          <div className="flex justify-between items-center">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-[#FBEFA4] flex items-center gap-2">
              🛒 Your Cart ({getCartCount()} items)
            </h2>
            <button
              onClick={() => setShowCart(false)}
              className="w-8 h-8 sm:w-10 sm:h-10 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30"
            >
              <span className="text-xl sm:text-2xl">✕</span>
            </button>
          </div>
        </div>

        <div className="p-4 sm:p-6">
          {cart.length > 0 ? (
            <div className="space-y-4">
              {/* Ticket Group Display */}
              <TicketGroupDisplay cart={cart} apiPricing={apiPricing} />
              
              {/* Individual/Cart Items */}
              <div className="mt-4">
                <h3 className="text-[#FBEFA4] font-semibold text-sm md:text-lg mb-3">
                  📋 Cart Items
                </h3>
                <div className="space-y-3">
                  {displayItems.map((item, index) => {
                    const typeLabel = getGroupTypeLabel(item.type);
                    return (
                      <div 
                        key={index} 
                        className={`${typeLabel.bg} rounded-xl p-4 border ${typeLabel.border}`}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <span className={`${typeLabel.color} font-bold text-xs uppercase`}>
                            {typeLabel.text}
                          </span>
                          <span className="text-[#FBEFA4] font-bold text-lg">
                            ₹{item.price.toFixed(2)}
                          </span>
                        </div>
                        
                        <div className="flex flex-wrap gap-2 mb-2">
                          {item.ticketNumbers.map((num, idx) => (
                            <span 
                              key={idx}
                              className={`${typeLabel.bg} ${typeLabel.color} px-2 py-1 rounded text-xs font-semibold`}
                            >
                              #{num}
                            </span>
                          ))}
                        </div>

                        {/* Show ticket type badge */}
                        <div className="mb-2">
                          <span className="text-xs text-white/50">
                            Type: <span className="text-white/80 font-medium">{item.ticketType}</span>
                          </span>
                        </div>

                        {item.type === 'random' && (
                          <button
                            onClick={() => removeFromCart(item.tickets[0]?.id || item.tickets[0]?.ticket_id)}
                            className="text-red-400 hover:text-red-300 text-xs mt-1"
                          >
                            Remove
                          </button>
                        )}
                        
                        {(item.type === 'halfSheet' || item.type === 'fullSheet') && (
                          <button
                            onClick={() => {
                              // Remove all tickets in the group
                              item.tickets.forEach(ticket => {
                                removeFromCart(ticket.id || ticket.ticket_id);
                              });
                            }}
                            className="text-red-400 hover:text-red-300 text-xs mt-1"
                          >
                            Remove Group
                          </button>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="border-t border-white/20 pt-4 mt-4">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-white/70">Total Amount:</span>
                  <span className="text-[#FBEFA4] text-2xl font-bold">₹{getCartTotal()}</span>
                </div>
                <div className="flex gap-3">
                  <button
                    onClick={clearCart}
                    className="flex-1 py-3 bg-white/20 hover:bg-white/30 rounded-xl text-white font-bold"
                  >
                    Clear Cart
                  </button>
                  <button
                    onClick={handleProceedToCheckout}
                    className="flex-1 py-3 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 rounded-xl text-white font-bold"
                  >
                    Proceed to Checkout →
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-4xl mb-4">🛒</p>
              <p className="text-white/70 text-lg">Your cart is empty</p>
              <p className="text-white/40 text-sm mt-2">Add tickets to get started!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CartModal;