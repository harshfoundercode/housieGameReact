
import { API } from '../services/api_url';

export const getWithdrawalHistory = async () => {
  try {
    const token = localStorage.getItem("token");
    
    const response = await fetch(`${API.withdrawalHistory}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': token ? `Bearer ${token}` : '',
      },
    });

    const result = await response.json();
    console.log("Withdrawal History Response:", result);

    if (!response.ok) {
      throw new Error(result.message || 'Failed to fetch withdrawal history');
    }

    return result;
  } catch (error) {
    console.error("getWithdrawalHistory Error:", error);
    throw error;
  }
};


// Request withdrawal
export const requestWithdrawal = async (withdrawalData) => {
  try {
    const token = localStorage.getItem("token");
    
    const response = await fetch(`${API.WITHDRAWAL_REQUEST_URL}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': token ? `Bearer ${token}` : '',
      },
      body: JSON.stringify(withdrawalData),
    });

    const result = await response.json();
    console.log("Withdrawal Request Response:", result);

    if (!response.ok) {
      throw new Error(result.message || 'Failed to request withdrawal');
    }

    return result;
  } catch (error) {
    console.error("requestWithdrawal Error:", error);
    throw error;
  }
};
