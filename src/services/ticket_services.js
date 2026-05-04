import { API } from './api_url';

export const getTicketsByGame = async (gameId) => {
  try {
    const token = localStorage.getItem("token");
    
    const response = await fetch(`${API.TICKET_LIST_BY_GAMEID_URL}${gameId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': token ? `Bearer ${token}` : '',
      },
    });

    const result = await response.json();
    console.log("Tickets API Response:", result);

    if (!response.ok) {
      throw new Error(result.message || 'Failed to fetch tickets');
    }

    return result;
  } catch (error) {
    console.error("getTicketsByGame Error:", error);
    throw error;
  }
};
  