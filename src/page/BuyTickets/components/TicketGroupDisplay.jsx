// components/TicketGroupDisplay.jsx
import React from 'react';

const TicketGroupDisplay = ({ cart }) => {
  // Group tickets into Random, Half Sheet, and Full Sheet
  const groupTickets = () => {
    if (!cart || cart.length === 0) return { random: [], halfSheet: [], fullSheet: [] };

    const groups = {
      random: [],
      halfSheet: [],
      fullSheet: []
    };

    // Sort tickets by some criteria (e.g., ticket number or ID)
    const sortedTickets = [...cart].sort((a, b) => {
      const numA = parseInt(a.ticketNumber || a.id || '0');
      const numB = parseInt(b.ticketNumber || b.id || '0');
      return numA - numB;
    });

    // Group tickets in sets of 1 (Random), 3 (Half Sheet), and 6 (Full Sheet)
    let i = 0;
    
    // Full sheets (groups of 6)
    while (i + 5 < sortedTickets.length) {
      groups.fullSheet.push(sortedTickets.slice(i, i + 6));
      i += 6;
    }
    
    // Half sheets (groups of 3)
    while (i + 2 < sortedTickets.length) {
      groups.halfSheet.push(sortedTickets.slice(i, i + 3));
      i += 3;
    }
    
    // Random (single tickets)
    while (i < sortedTickets.length) {
      groups.random.push([sortedTickets[i]]);
      i++;
    }

    return groups;
  };

  const groups = groupTickets();

  // Calculate prices (you can adjust these based on your pricing logic)
  const getGroupPrice = (tickets, type) => {
    const basePrice = tickets.reduce((sum, ticket) => sum + (ticket.price || 0), 0);
    
    // Apply discounts
    if (type === 'fullSheet') return basePrice * 0.8; // 20% discount for full sheet
    if (type === 'halfSheet') return basePrice * 0.9; // 10% discount for half sheet
    return basePrice; // No discount for random
  };

  if (cart.length === 0) return null;

  return (
    <div className="ticket-groups mb-4 md:mb-6">
      <h3 className="text-[#FBEFA4] font-semibold text-sm md:text-lg mb-3">
        🎫 Ticket Groups
      </h3>
      
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 md:gap-4">
        {/* Full Sheet */}
        {groups.fullSheet.length > 0 && (
          <div className="bg-linear-to-br from-green-500/20 to-green-600/20 border border-green-400/50 rounded-lg md:rounded-xl p-3 md:p-4">
            <div className="flex items-center justify-between mb-2">
              <h4 className="text-green-400 font-bold text-xs md:text-sm">FULL SHEET</h4>
              <span className="text-green-400 text-xs md:text-sm font-semibold">
                {groups.fullSheet.length}x
              </span>
            </div>
            {groups.fullSheet.map((sheet, index) => (
              <div key={index} className="mb-2 last:mb-0">
                <div className="flex flex-wrap gap-1 mb-1">
                  {sheet.map(ticket => (
                    <span 
                      key={ticket.id}
                      className="bg-green-500/30 text-green-300 px-2 py-0.5 rounded text-xs"
                    >
                      {ticket.ticketNumber || `#${ticket.id}`}
                    </span>
                  ))}
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span className="text-green-400/70">Set {index + 1}</span>
                  <span className="text-green-400 font-semibold">
                    ₹{getGroupPrice(sheet, 'fullSheet').toFixed(2)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Half Sheet */}
        {groups.halfSheet.length > 0 && (
          <div className="bg-linear-to-br from-blue-500/20 to-blue-600/20 border border-blue-400/50 rounded-lg md:rounded-xl p-3 md:p-4">
            <div className="flex items-center justify-between mb-2">
              <h4 className="text-blue-400 font-bold text-xs md:text-sm">HALF SHEET</h4>
              <span className="text-blue-400 text-xs md:text-sm font-semibold">
                {groups.halfSheet.length}x
              </span>
            </div>
            {groups.halfSheet.map((sheet, index) => (
              <div key={index} className="mb-2 last:mb-0">
                <div className="flex flex-wrap gap-1 mb-1">
                  {sheet.map(ticket => (
                    <span 
                      key={ticket.id}
                      className="bg-blue-500/30 text-blue-300 px-2 py-0.5 rounded text-xs"
                    >
                      {ticket.ticketNumber || `#${ticket.id}`}
                    </span>
                  ))}
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span className="text-blue-400/70">Set {index + 1}</span>
                  <span className="text-blue-400 font-semibold">
                    ₹{getGroupPrice(sheet, 'halfSheet').toFixed(2)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Random */}
        {groups.random.length > 0 && (
          <div className="bg-linear-to-br from-yellow-500/20 to-yellow-600/20 border border-yellow-400/50 rounded-lg md:rounded-xl p-3 md:p-4">
            <div className="flex items-center justify-between mb-2">
              <h4 className="text-yellow-400 font-bold text-xs md:text-sm">RANDOM</h4>
              <span className="text-yellow-400 text-xs md:text-sm font-semibold">
                {groups.random.length}x
              </span>
            </div>
            {groups.random.map((ticketGroup, index) => (
              <div key={index} className="mb-2 last:mb-0">
                <div className="flex flex-wrap gap-1 mb-1">
                  {ticketGroup.map(ticket => (
                    <span 
                      key={ticket.id}
                      className="bg-yellow-500/30 text-yellow-300 px-2 py-0.5 rounded text-xs"
                    >
                      {ticket.ticketNumber || `#${ticket.id}`}
                    </span>
                  ))}
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span className="text-yellow-400/70">Single</span>
                  <span className="text-yellow-400 font-semibold">
                    ₹{getGroupPrice(ticketGroup, 'random').toFixed(2)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Total Summary */}
      <div className="mt-3 md:mt-4 p-2 md:p-3 bg-[#FBEFA4]/10 rounded-lg md:rounded-xl border border-[#FBEFA4]/30">
        <div className="flex justify-between items-center">
          <div className="text-white/80 text-xs md:text-sm">
            <span className="mr-4">Full: {groups.fullSheet.length}</span>
            <span className="mr-4">Half: {groups.halfSheet.length}</span>
            <span>Random: {groups.random.length}</span>
          </div>
          <div className="text-[#FBEFA4] font-bold text-sm md:text-lg">
            Total: ₹{cart.reduce((sum, item) => sum + (item.price || 0), 0).toFixed(2)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TicketGroupDisplay;