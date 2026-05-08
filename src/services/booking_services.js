import { API } from "./api_url";

// Book Ticket API
export const bookTicket = async (bookingData) => {
    try {
        const token = localStorage.getItem("token");
        
        const response = await fetch(`${API.BOOK_TICKET_URL}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(bookingData),
        });

        const data = await response.json();
        
        if (!response.ok) {
            throw new Error(data.message || 'Ticket booking failed');
        }
        console.log("Book Ticket API Response:", data);
        return data;
    } catch (error) {
        throw error;
    }
};

