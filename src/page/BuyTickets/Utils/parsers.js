// export const parseGameDateTime = (gameDate, roundTime) => {
//   if (!gameDate) return null;
  
//   try {
//     let dateStr = gameDate;
//     if (dateStr.includes('T')) {
//       dateStr = dateStr.split('T')[0];
//     }
//     const [year, month, day] = dateStr.split('-');
//     let hours = 21;
//     let minutes = 0;
//     let seconds = 0;
    
//     if (roundTime) {
//       const timeParts = roundTime.split(':');
//       hours = parseInt(timeParts[0]);
//       minutes = parseInt(timeParts[1]);
//       seconds = timeParts[2] ? parseInt(timeParts[2]) : 0;
//     }
    
//     const gameDateTimeObj = new Date(year, month - 1, day, hours, minutes, seconds);
//     return gameDateTimeObj;
//   } catch (error) {
//     console.error("Error parsing date/time:", error);
//     const defaultTime = new Date();
//     defaultTime.setHours(21, 0, 0, 0);
//     return defaultTime;
//   }
// };

// export const parseGrid = (gridString) => {
//   try {
//     const parsed = JSON.parse(gridString);
//     return parsed;
//   } catch (e) {
//     console.error("Error parsing grid:", e);
//     return [[], [], []];
//   }
// };

// export const formatTickets = (apiTickets) => {
//   return apiTickets.map(ticket => ({
//     id: ticket.ticket_id,
//     ticketNumber: ticket.ticket_number,
//     name: `Ticket ${ticket.ticket_number}`,
//     price: ticket.price,
//     status: ticket.status,
//     numbers: parseGrid(ticket.grid),
//   }));
// };
export const parseGameDateTime = (gameDate, roundTime) => {
  if (!gameDate) return null;
  
  try {
    let dateStr = gameDate;
    if (dateStr.includes('T')) {
      dateStr = dateStr.split('T')[0];
    }
    const [year, month, day] = dateStr.split('-');
    let hours = 21;
    let minutes = 0;
    let seconds = 0;
    
    if (roundTime) {
      const timeParts = roundTime.split(':');
      hours = parseInt(timeParts[0]) || 21;
      minutes = parseInt(timeParts[1]) || 0;
      seconds = timeParts[2] ? parseInt(timeParts[2]) : 0;
    }
    
    const gameDateTimeObj = new Date(year, month - 1, day, hours, minutes, seconds);
    return gameDateTimeObj;
  } catch (error) {
    console.error("Error parsing date/time:", error);
    const defaultTime = new Date();
    defaultTime.setHours(21, 0, 0, 0);
    return defaultTime;
  }
};

export const parseGrid = (gridString) => {
  try {
    // Handle both string and already parsed array
    if (typeof gridString === 'string') {
      const parsed = JSON.parse(gridString);
      // Ensure it's a valid grid format (array of arrays)
      if (Array.isArray(parsed) && parsed.every(row => Array.isArray(row))) {
        return parsed;
      }
      return [[], [], []];
    } else if (Array.isArray(gridString)) {
      return gridString;
    }
    return [[], [], []];
  } catch (e) {
    console.error("Error parsing grid:", e);
    return [[], [], []];
  }
};

export const formatTickets = (apiTickets) => {
  if (!apiTickets || !Array.isArray(apiTickets)) return [];
  
  return apiTickets.map(ticket => ({
    id: ticket.ticket_id,
    ticketId: ticket.ticket_id, // Added for flexibility
    ticketNumber: ticket.ticket_number,
    ticket_number: ticket.ticket_number, // Keep original field
    name: `Ticket ${ticket.ticket_number}`,
    price: ticket.price || 100, // Default price fallback
    status: ticket.status || 'available',
    numbers: parseGrid(ticket.grid),
    grid: ticket.grid, // Keep original grid string for reference
  }));
};

// Helper function to check if tickets form a group (full sheet, half sheet, or random)
export const getTicketGroupType = (selectedTickets) => {
  if (!selectedTickets || selectedTickets.length === 0) return null;
  
  // Sort tickets by number
  const sortedTickets = [...selectedTickets].sort((a, b) => {
    const numA = parseInt(a.ticketNumber || a.ticket_number || '0');
    const numB = parseInt(b.ticketNumber || b.ticket_number || '0');
    return numA - numB;
  });
  
  const ticketNumbers = sortedTickets.map(t => 
    parseInt(t.ticketNumber || t.ticket_number || '0')
  );
  
  // Check if all tickets are in the same row (row size = 6)
  const firstTicketRow = Math.ceil(ticketNumbers[0] / 6);
  const lastTicketRow = Math.ceil(ticketNumbers[ticketNumbers.length - 1] / 6);
  
  if (firstTicketRow !== lastTicketRow) return 'random'; // Cross-row selection
  
  // Check for full sheet (6 consecutive tickets)
  if (ticketNumbers.length === 6) {
    const isConsecutive = ticketNumbers.every((num, index) => {
      if (index === 0) return true;
      return num === ticketNumbers[index - 1] + 1;
    });
    if (isConsecutive) return 'fullSheet';
  }
  
  // Check for half sheet (3 consecutive tickets)
  if (ticketNumbers.length === 3) {
    const isConsecutive = ticketNumbers.every((num, index) => {
      if (index === 0) return true;
      return num === ticketNumbers[index - 1] + 1;
    });
    if (isConsecutive) return 'halfSheet';
  }
  
  return 'random';
};

// Helper to calculate price based on API pricing
export const calculateTicketPrice = (selectedTickets, apiPricing) => {
  if (!selectedTickets || selectedTickets.length === 0) return 0;
  
  const groupType = getTicketGroupType(selectedTickets);
  
  switch (groupType) {
    case 'fullSheet':
      return parseFloat(apiPricing?.full_sheet_price) || 0;
    case 'halfSheet':
      return parseFloat(apiPricing?.half_sheet_price) || 0;
    case 'random':
      return selectedTickets.reduce((sum, ticket) => sum + (ticket.price || 100), 0);
    default:
      return selectedTickets.reduce((sum, ticket) => sum + (ticket.price || 100), 0);
  }
};