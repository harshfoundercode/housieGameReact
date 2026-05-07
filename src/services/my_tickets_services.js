import { API } from "./api_url";

// Get My Tickets
export const getMyTickets = async () => {
    try {
        const token = localStorage.getItem("token");
        
        const response = await fetch(`${API.MY_TICKETS_URL}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        });

        const data = await response.json();
        
        if (!response.ok) {
            throw new Error(data.message || 'Failed to fetch tickets');
        }
        
        return data;
    } catch (error) {
        throw error;
    }
};