
// import React from 'react';

// const TicketGroupDisplay = ({ cart }) => {
//   // Group tickets into Random, Half Sheet, and Full Sheet based on rows of 6
//   const groupTickets = () => {
//     if (!cart || cart.length === 0) return { random: [], halfSheet: [], fullSheet: [] };

//     // Extract ticket numbers and sort them
//     const ticketNumbers = cart.map(ticket => {
//       const num = parseInt(ticket.ticketNumber || ticket.id || '0');
//       return { ticket, number: num };
//     }).sort((a, b) => a.number - b.number);

//     // Group tickets by their row (1-6 = row 1, 7-12 = row 2, etc.)
//     const rows = {};
//     ticketNumbers.forEach(({ ticket, number }) => {
//       // Calculate row number (1-based: 1-6 = row 1, 7-12 = row 2, etc.)
//       const rowNumber = Math.ceil(number / 6);
//       if (!rows[rowNumber]) {
//         rows[rowNumber] = [];
//       }
//       rows[rowNumber].push({ ticket, number });
//     });

//     const groups = {
//       fullSheet: [],
//       halfSheet: [],
//       random: []
//     };

//     // Process each row separately
//     Object.values(rows).forEach(rowTickets => {
//       // Sort tickets within the row by number
//       rowTickets.sort((a, b) => a.number - b.number);
      
//       let i = 0;
//       while (i < rowTickets.length) {
//         // Check for full sheet (6 consecutive tickets in this row)
//         if (i + 5 < rowTickets.length && 
//             rowTickets[i + 5].number - rowTickets[i].number === 5) {
//           // Check if all 6 tickets are consecutive
//           let isConsecutive = true;
//           for (let j = 1; j < 6; j++) {
//             if (rowTickets[i + j].number - rowTickets[i + j - 1].number !== 1) {
//               isConsecutive = false;
//               break;
//             }
//           }
          
//           if (isConsecutive) {
//             groups.fullSheet.push(rowTickets.slice(i, i + 6).map(t => t.ticket));
//             i += 6;
//             continue;
//           }
//         }
        
//         // Check for half sheet (3 consecutive tickets in this row)
//         if (i + 2 < rowTickets.length && 
//             rowTickets[i + 2].number - rowTickets[i].number === 2) {
//           // Check if all 3 tickets are consecutive
//           let isConsecutive = true;
//           for (let j = 1; j < 3; j++) {
//             if (rowTickets[i + j].number - rowTickets[i + j - 1].number !== 1) {
//               isConsecutive = false;
//               break;
//             }
//           }
          
//           if (isConsecutive) {
//             groups.halfSheet.push(rowTickets.slice(i, i + 3).map(t => t.ticket));
//             i += 3;
//             continue;
//           }
//         }
        
//         // Random - single ticket
//         groups.random.push([rowTickets[i].ticket]);
//         i++;
//       }
//     });

//     return groups;
//   };

//   const groups = groupTickets();

//   // Calculate prices
//   const getGroupPrice = (tickets, type) => {
//     const basePrice = tickets.reduce((sum, ticket) => sum + (ticket.price || 0), 0);
    
//     // Apply discounts
//     if (type === 'fullSheet') return basePrice * 0.8; // 20% discount for full sheet
//     if (type === 'halfSheet') return basePrice * 0.9; // 10% discount for half sheet
//     return basePrice; // No discount for random
//   };

//   if (cart.length === 0) return null;

//   // Calculate total grouped tickets
//   const totalGrouped = 
//     groups.fullSheet.reduce((sum, group) => sum + group.length, 0) +
//     groups.halfSheet.reduce((sum, group) => sum + group.length, 0) +
//     groups.random.reduce((sum, group) => sum + group.length, 0);

//   return (
//     <div className="ticket-groups mb-4 md:mb-6">
//       <h3 className="text-[#FBEFA4] font-semibold text-sm md:text-lg mb-3">
//         🎫 Ticket Groups
//       </h3>
      
//       <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 md:gap-4">
//         {/* Full Sheet */}
//         {groups.fullSheet.length > 0 && (
//           <div className="bg-linear-to-br from-green-500/20 to-green-600/20 border border-green-400/50 rounded-lg md:rounded-xl p-3 md:p-4">
//             <div className="flex items-center justify-between mb-2">
//               <h4 className="text-green-400 font-bold text-xs md:text-sm">FULL SHEET</h4>
//               <span className="text-green-400 text-xs md:text-sm font-semibold">
//                 {groups.fullSheet.length}x
//               </span>
//             </div>
//             {groups.fullSheet.map((sheet, index) => (
//               <div key={index} className="mb-2 last:mb-0">
//                 <div className="flex flex-wrap gap-1 mb-1">
//                   {sheet.map(ticket => (
//                     <span 
//                       key={ticket.id}
//                       className="bg-green-500/30 text-green-300 px-2 py-0.5 rounded text-xs"
//                     >
//                       {ticket.ticketNumber || `#${ticket.id}`}
//                     </span>
//                   ))}
//                 </div>
//                 <div className="flex justify-between items-center text-xs">
//                   <span className="text-green-400/70">
//                     Row {Math.ceil((parseInt(sheet[0]?.ticketNumber || sheet[0]?.id || '0')) / 6)}
//                   </span>
//                   <span className="text-green-400 font-semibold">
//                     ₹{getGroupPrice(sheet, 'fullSheet').toFixed(2)}
//                   </span>
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}

//         {/* Half Sheet */}
//         {groups.halfSheet.length > 0 && (
//           <div className="bg-linear-to-br from-blue-500/20 to-blue-600/20 border border-blue-400/50 rounded-lg md:rounded-xl p-3 md:p-4">
//             <div className="flex items-center justify-between mb-2">
//               <h4 className="text-blue-400 font-bold text-xs md:text-sm">HALF SHEET</h4>
//               <span className="text-blue-400 text-xs md:text-sm font-semibold">
//                 {groups.halfSheet.length}x
//               </span>
//             </div>
//             {groups.halfSheet.map((sheet, index) => (
//               <div key={index} className="mb-2 last:mb-0">
//                 <div className="flex flex-wrap gap-1 mb-1">
//                   {sheet.map(ticket => (
//                     <span 
//                       key={ticket.id}
//                       className="bg-blue-500/30 text-blue-300 px-2 py-0.5 rounded text-xs"
//                     >
//                       {ticket.ticketNumber || `#${ticket.id}`}
//                     </span>
//                   ))}
//                 </div>
//                 <div className="flex justify-between items-center text-xs">
//                   <span className="text-blue-400/70">
//                     Row {Math.ceil((parseInt(sheet[0]?.ticketNumber || sheet[0]?.id || '0')) / 6)}
//                   </span>
//                   <span className="text-blue-400 font-semibold">
//                     ₹{getGroupPrice(sheet, 'halfSheet').toFixed(2)}
//                   </span>
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}

//         {/* Random */}
//         {groups.random.length > 0 && (
//           <div className="bg-linear-to-br from-yellow-500/20 to-yellow-600/20 border border-yellow-400/50 rounded-lg md:rounded-xl p-3 md:p-4">
//             <div className="flex items-center justify-between mb-2">
//               <h4 className="text-yellow-400 font-bold text-xs md:text-sm">RANDOM</h4>
//               <span className="text-yellow-400 text-xs md:text-sm font-semibold">
//                 {groups.random.length}x
//               </span>
//             </div>
//             {groups.random.map((ticketGroup, index) => (
//               <div key={index} className="mb-2 last:mb-0">
//                 <div className="flex flex-wrap gap-1 mb-1">
//                   {ticketGroup.map(ticket => (
//                     <span 
//                       key={ticket.id}
//                       className="bg-yellow-500/30 text-yellow-300 px-2 py-0.5 rounded text-xs"
//                     >
//                       {ticket.ticketNumber || `#${ticket.id}`}
//                     </span>
//                   ))}
//                 </div>
//                 <div className="flex justify-between items-center text-xs">
//                   <span className="text-yellow-400/70">Single</span>
//                   <span className="text-yellow-400 font-semibold">
//                     ₹{getGroupPrice(ticketGroup, 'random').toFixed(2)}
//                   </span>
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}
//       </div>

//       {/* Total Summary */}
//       <div className="mt-3 md:mt-4 p-2 md:p-3 bg-[#FBEFA4]/10 rounded-lg md:rounded-xl border border-[#FBEFA4]/30">
//         <div className="flex justify-between items-center">
//           <div className="text-white/80 text-xs md:text-sm">
//             <span className="mr-4">Full: {groups.fullSheet.length}</span>
//             <span className="mr-4">Half: {groups.halfSheet.length}</span>
//             <span>Random: {groups.random.length}</span>
//           </div>
//           <div className="text-[#FBEFA4] font-bold text-sm md:text-lg">
//             Total: ₹{cart.reduce((sum, item) => sum + (item.price || 0), 0).toFixed(2)}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default TicketGroupDisplay;
// components/TicketGroupDisplay.jsx
import React from 'react';

const TicketGroupDisplay = ({ cart, apiPricing }) => {
  // Group tickets into Random, Half Sheet, and Full Sheet based on rows of 6
  const groupTickets = () => {
    if (!cart || cart.length === 0) return { random: [], halfSheet: [], fullSheet: [] };

    // Extract ticket numbers and sort them
    const ticketNumbers = cart.map(ticket => {
      const num = parseInt(ticket.ticketNumber || ticket.id || '0');
      return { ticket, number: num };
    }).sort((a, b) => a.number - b.number);

    // Group tickets by their row (1-6 = row 1, 7-12 = row 2, etc.)
    const rows = {};
    ticketNumbers.forEach(({ ticket, number }) => {
      // Calculate row number (1-based: 1-6 = row 1, 7-12 = row 2, etc.)
      const rowNumber = Math.ceil(number / 6);
      if (!rows[rowNumber]) {
        rows[rowNumber] = [];
      }
      rows[rowNumber].push({ ticket, number });
    });

    const groups = {
      fullSheet: [],
      halfSheet: [],
      random: []
    };

    // Process each row separately
    Object.values(rows).forEach(rowTickets => {
      // Sort tickets within the row by number
      rowTickets.sort((a, b) => a.number - b.number);
      
      let i = 0;
      while (i < rowTickets.length) {
        // Check for full sheet (6 consecutive tickets in this row)
        if (i + 5 < rowTickets.length && 
            rowTickets[i + 5].number - rowTickets[i].number === 5) {
          // Check if all 6 tickets are consecutive
          let isConsecutive = true;
          for (let j = 1; j < 6; j++) {
            if (rowTickets[i + j].number - rowTickets[i + j - 1].number !== 1) {
              isConsecutive = false;
              break;
            }
          }
          
          if (isConsecutive) {
            groups.fullSheet.push(rowTickets.slice(i, i + 6).map(t => t.ticket));
            i += 6;
            continue;
          }
        }
        
        // Check for half sheet (3 consecutive tickets in this row)
        if (i + 2 < rowTickets.length && 
            rowTickets[i + 2].number - rowTickets[i].number === 2) {
          // Check if all 3 tickets are consecutive
          let isConsecutive = true;
          for (let j = 1; j < 3; j++) {
            if (rowTickets[i + j].number - rowTickets[i + j - 1].number !== 1) {
              isConsecutive = false;
              break;
            }
          }
          
          if (isConsecutive) {
            groups.halfSheet.push(rowTickets.slice(i, i + 3).map(t => t.ticket));
            i += 3;
            continue;
          }
        }
        
        // Random - single ticket
        groups.random.push([rowTickets[i].ticket]);
        i++;
      }
    });

    return groups;
  };

  const groups = groupTickets();

  // Calculate prices using API pricing
  const getGroupPrice = (type) => {
    if (apiPricing) {
      if (type === 'fullSheet') {
        return parseFloat(apiPricing.full_sheet_price) || 0;
      }
      if (type === 'halfSheet') {
        return parseFloat(apiPricing.half_sheet_price) || 0;
      }
    }
    return 0;
  };

  // Calculate total price based on groups
  const calculateTotalPrice = () => {
    let total = 0;
    
    // Full sheets total - using API full_sheet_price
    total += groups.fullSheet.length * getGroupPrice('fullSheet');
    
    // Half sheets total - using API half_sheet_price
    total += groups.halfSheet.length * getGroupPrice('halfSheet');
    
    // Random tickets total - using individual ticket prices
    groups.random.forEach(group => {
      group.forEach(ticket => {
        total += ticket.price || 100;
      });
    });
    
    return total;
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
                  <span className="text-green-400/70">
                    Row {Math.ceil((parseInt(sheet[0]?.ticketNumber || sheet[0]?.id || '0')) / 6)}
                  </span>
                  <span className="text-green-400 font-semibold">
                    ₹{getGroupPrice('fullSheet').toFixed(2)}
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
                  <span className="text-blue-400/70">
                    Row {Math.ceil((parseInt(sheet[0]?.ticketNumber || sheet[0]?.id || '0')) / 6)}
                  </span>
                  <span className="text-blue-400 font-semibold">
                    ₹{getGroupPrice('halfSheet').toFixed(2)}
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
                    ₹{(ticketGroup[0]?.price || 100).toFixed(2)}
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
            Total: ₹{calculateTotalPrice().toFixed(2)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TicketGroupDisplay;