// import { useState, useEffect, useCallback } from 'react';
// import { getTicketsByGame } from "../../../services/ticket_services";
// import { formatTickets } from '../../BuyTickets/Utils/parsers';

// export const useTickets = (gameId) => {
//   const [tickets, setTickets] = useState([]);
//   const [loadingTickets, setLoadingTickets] = useState(true);
//   const [ticketError, setTicketError] = useState(null);
//     const [apiPricing, setApiPricing] = useState(null);


//   const fetchTickets = useCallback(async () => {
//     if (!gameId) {
//       setTicketError("No game selected");
//       setLoadingTickets(false);
//       return;
//     }

//     setLoadingTickets(true);
//     setTicketError(null);

//     try {
//       const response = await getTicketsByGame(gameId);
//       console.log("Fetched tickets:", response);

//       if (response.success) {
//         const formattedTickets = formatTickets(response.data.tickets);
//         setTickets(formattedTickets);
//          // Extract pricing from API response
//         if (response.data) {
//           setApiPricing({
//             half_sheet_price: response.data.half_sheet_price || "5.00",
//             full_sheet_price: response.data.full_sheet_price || "10.00"
//           });
//         }
//       } else {
//         throw new Error(response.message || "Failed to load tickets");
//       }
//     } catch (error) {
//       console.error("Error fetching tickets:", error);
//       setTicketError(error.message || "Failed to load tickets");
//       setTickets([]);
//     } finally {
//       setLoadingTickets(false);
//     }
//   }, [gameId]);

//   useEffect(() => {
//     fetchTickets();
//   }, [fetchTickets]);

//   return {
//     tickets,
//     loadingTickets,
//     ticketError,
//     apiPricing,
//     refetchTickets: fetchTickets
//   };
// };
import { useState, useEffect, useCallback } from 'react';
import { getTicketsByGame } from "../../../services/ticket_services";
import { formatTickets } from '../../BuyTickets/Utils/parsers';

export const useTickets = (gameId) => {
  const [tickets, setTickets] = useState([]);
  const [loadingTickets, setLoadingTickets] = useState(true);
  const [ticketError, setTicketError] = useState(null);
  const [apiPricing, setApiPricing] = useState(null);

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
      console.log("📊 Full API Response:", response);

      if (response.success) {
        const formattedTickets = formatTickets(response.data.tickets);
        setTickets(formattedTickets);

        if (response.data) {
          // ✅ ticket_price top-level pe nahi hai — pehle ticket se lo
          const derivedTicketPrice = response.data.tickets?.[0]?.price;

          const pricing = {
            ticket_price: derivedTicketPrice != null ? Number(derivedTicketPrice) : 15,
            half_sheet_price: response.data.half_sheet_price ?? "5.00",
            full_sheet_price: response.data.full_sheet_price ?? "10.00"
          };

          console.log("✅ apiPricing extracted:", pricing);
          setApiPricing(pricing);
        }
      } else {
        throw new Error(response.message || "Failed to load tickets");
      }
    } catch (error) {
      console.error("❌ Error fetching tickets:", error);
      setTicketError(error.message || "Failed to load tickets");
      setTickets([]);
    } finally {
      setLoadingTickets(false);
    }
  }, [gameId]);

  // Update specific ticket status (optimistic update)
  const updateTicketStatus = useCallback((ticketIds, newStatus) => {
    setTickets(prevTickets =>
      prevTickets.map(ticket =>
        ticketIds.includes(ticket.id)
          ? { ...ticket, status: newStatus }
          : ticket
      )
    );
  }, []);

  // Remove tickets from list
  const removeTickets = useCallback((ticketIds) => {
    setTickets(prevTickets =>
      prevTickets.filter(ticket => !ticketIds.includes(ticket.id))
    );
  }, []);

  useEffect(() => {
    fetchTickets();
  }, [fetchTickets]);

  // Auto-refresh every 30 seconds
  useEffect(() => {
    if (!gameId) return;

    const intervalId = setInterval(() => {
      fetchTickets();
    }, 30000);

    return () => clearInterval(intervalId);
  }, [gameId, fetchTickets]);

  return {
    tickets,
    loadingTickets,
    ticketError,
    apiPricing,
    refetchTickets: fetchTickets,
    updateTicketStatus,
    removeTickets
  };
};