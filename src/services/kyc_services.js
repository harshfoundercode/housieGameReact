import { API } from "./api_url";

// Submit KYC
export const submitKYC = async (kycData) => {
    try {
        const token = localStorage.getItem("token");
        
        const response = await fetch(`${API.KYC_SUBMIT_URL}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(kycData),
        });

        const data = await response.json();
        
        if (!response.ok) {
            throw new Error(data.message || 'KYC submission failed');
        }
        
        return data;
    } catch (error) {
        throw error;
    }
};

// Update KYC
export const updateKYC = async (kycData) => {
    try {
        const token = localStorage.getItem("token");
        
        const response = await fetch(`${API.UPDATE_KYC_URL}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(kycData),
        });

        const data = await response.json();
        
        if (!response.ok) {
            throw new Error(data.message || 'KYC update failed');
        }
        
        return data;
    } catch (error) {
        throw error;
    }
};

// Get KYC details
export const getKYC = async () => {
    try {
        const token = localStorage.getItem("token");
        
        const response = await fetch(`${API.GET_KYC_URL}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        });

        const data = await response.json();
        
        if (!response.ok) {
            throw new Error(data.message || 'Failed to fetch KYC details');
        }
        
        return data;
    } catch (error) {
        throw error;
    }
};

// Verify IFSC code
export const verifyIFSC = async (ifscCode) => {
    try {
        
        const response = await fetch(`${API.IFSC_AUTO_FILL_URL}${ifscCode}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        const data = await response.json();
        
        if (!response.ok) {
            throw new Error(data.message || 'IFSC verification failed');
        }
        
        return data;
    } catch (error) {
        throw error;
    }
};