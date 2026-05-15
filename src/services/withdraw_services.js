
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

// Get user's wallet balance
export const getWalletBalance = async () => {
  try {
    const token = localStorage.getItem("token");
    
    const response = await fetch(`${API.walletBalance}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': token ? `Bearer ${token}` : '',
      },
    });

    const result = await response.json();
    console.log("Wallet Balance Response:", result);

    if (!response.ok) {
      throw new Error(result.message || 'Failed to fetch wallet balance');
    }

    return result;
  } catch (error) {
    console.error("getWalletBalance Error:", error);
    throw error;
  }
};

// Request withdrawal
export const requestWithdrawal = async (withdrawalData) => {
  try {
    const token = localStorage.getItem("token");
    
    const response = await fetch(`${API.requestWithdrawal}`, {
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

// Get withdrawal methods (bank accounts, UPI, etc.)
export const getWithdrawalMethods = async () => {
  try {
    const token = localStorage.getItem("token");
    
    const response = await fetch(`${API.withdrawalMethods}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': token ? `Bearer ${token}` : '',
      },
    });

    const result = await response.json();
    console.log("Withdrawal Methods Response:", result);

    if (!response.ok) {
      throw new Error(result.message || 'Failed to fetch withdrawal methods');
    }

    return result;
  } catch (error) {
    console.error("getWithdrawalMethods Error:", error);
    throw error;
  }
};

// Add new withdrawal method (bank account/UPI)
export const addWithdrawalMethod = async (methodData) => {
  try {
    const token = localStorage.getItem("token");
    
    const response = await fetch(`${API.addWithdrawalMethod}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': token ? `Bearer ${token}` : '',
      },
      body: JSON.stringify(methodData),
    });

    const result = await response.json();
    console.log("Add Withdrawal Method Response:", result);

    if (!response.ok) {
      throw new Error(result.message || 'Failed to add withdrawal method');
    }

    return result;
  } catch (error) {
    console.error("addWithdrawalMethod Error:", error);
    throw error;
  }
};

// Delete withdrawal method
export const deleteWithdrawalMethod = async (methodId) => {
  try {
    const token = localStorage.getItem("token");
    
    const response = await fetch(`${API.deleteWithdrawalMethod}/${methodId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': token ? `Bearer ${token}` : '',
      },
    });

    const result = await response.json();
    console.log("Delete Withdrawal Method Response:", result);

    if (!response.ok) {
      throw new Error(result.message || 'Failed to delete withdrawal method');
    }

    return result;
  } catch (error) {
    console.error("deleteWithdrawalMethod Error:", error);
    throw error;
  }
};

// Get withdrawal settings (min amount, max amount, fees, etc.)
export const getWithdrawalSettings = async () => {
  try {
    const token = localStorage.getItem("token");
    
    const response = await fetch(`${API.withdrawalSettings}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': token ? `Bearer ${token}` : '',
      },
    });

    const result = await response.json();
    console.log("Withdrawal Settings Response:", result);

    if (!response.ok) {
      throw new Error(result.message || 'Failed to fetch withdrawal settings');
    }

    return result;
  } catch (error) {
    console.error("getWithdrawalSettings Error:", error);
    throw error;
  }
};