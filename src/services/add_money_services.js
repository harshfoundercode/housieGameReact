// Update your api.js file
import { API } from "./api_url";

export const addMoney = async (amount) => {
    try {
        const token = localStorage.getItem("token");
        
        const response = await fetch(`${API.ADD_MONEY_URL}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`, // Add token here
            },
            body: JSON.stringify({ amount: amount }),
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || 'Add Money failed');
        }

        return data;
    } catch (error) {
        throw error;
    }
};

export const transactionHistory = async () => {
    try {
        const token = localStorage.getItem("token");
        
        const response = await fetch(`${API.TRANSACTION_HISTORY_URL}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${token}`, // Add token here
            },
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || 'Transaction history failed');
        }

        return data;
    } catch (error) {
        throw error;
    }
};