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
      hours = parseInt(timeParts[0]);
      minutes = parseInt(timeParts[1]);
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
    const parsed = JSON.parse(gridString);
    return parsed;
  } catch (e) {
    console.error("Error parsing grid:", e);
    return [[], [], []];
  }
};

export const formatTickets = (apiTickets) => {
  return apiTickets.map(ticket => ({
    id: ticket.ticket_id,
    ticketNumber: ticket.ticket_number,
    name: `Ticket ${ticket.ticket_number}`,
    price: ticket.price,
    status: ticket.status,
    numbers: parseGrid(ticket.grid),
  }));
};