import { useState, useEffect, useCallback } from 'react';
import { getTicketsByGame } from "../../../services/ticket_services";
import { formatTickets } from '../../BuyTickets/Utils/parsers';

export const useTickets = (gameId) => {
  const [tickets, setTickets] = useState([]);
  const [loadingTickets, setLoadingTickets] = useState(true);
  const [ticketError, setTicketError] = useState(null);

  const fetchTickets = useCallback(async () => {
    if (!gameId) {
      setTicketError("No game selected");
      setLoadingTickets(false);
      return;
    }

    setLoadingTickets(true);
    setTicketError(null);
    
    try {
      const response = await getTicketsByGame(gameId);
      console.log("Fetched tickets:", response);
      
      if (response.success) {
        const formattedTickets = formatTickets(response.data.tickets);
        setTickets(formattedTickets);
      } else {
        throw new Error(response.message || "Failed to load tickets");
      }
    } catch (error) {
      console.error("Error fetching tickets:", error);
      setTicketError(error.message || "Failed to load tickets");
      setTickets([]);
    } finally {
      setLoadingTickets(false);
    }
  }, [gameId]);

  useEffect(() => {
    fetchTickets();
  }, [fetchTickets]);

  return {
    tickets,
    loadingTickets,
    ticketError,
    refetchTickets: fetchTickets
  };
};