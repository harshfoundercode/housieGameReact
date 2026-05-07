import { API } from "./api_url";


export const submitKYC = async (kycData) => {
    try {
        const token = localStorage.getItem("token");
        
        // Create FormData object
        const formData = new FormData();
        
        // Append all fields to FormData
        formData.append('first_name', kycData.first_name);
        formData.append('last_name', kycData.last_name);
        formData.append('dob', kycData.dob);
        formData.append('id_type', kycData.id_type);
        formData.append('id_number', kycData.id_number);
        formData.append('account_number', kycData.account_number);
        formData.append('ifsc_code', kycData.ifsc_code);
        formData.append('bank_name', kycData.bank_name);
        formData.append('account_holder_name', kycData.account_holder_name);
        formData.append('pancard_number', kycData.pancard_number || '');
        
        // Append files
        if (kycData.id_front_image) {
            formData.append('id_front_image', kycData.id_front_image);
        }
        if (kycData.id_back_image) {
            formData.append('id_back_image', kycData.id_back_image);
        }
    
        if (kycData.pancard_image) {
            formData.append('pancard_image', kycData.pancard_image);
        }
        
        const response = await fetch(`${API.KYC_SUBMIT_URL}`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
            body: formData,
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

// Update KYC (multipart/form-data)
export const updateKYC = async (kycData) => {
    try {
        const token = localStorage.getItem("token");
        
        // Create FormData object
        const formData = new FormData();
        
        // Append all fields to FormData
        formData.append('first_name', kycData.first_name);
        formData.append('last_name', kycData.last_name);
        formData.append('dob', kycData.dob);
        formData.append('id_type', kycData.id_type);
        formData.append('id_number', kycData.id_number);
        formData.append('account_number', kycData.account_number);
        formData.append('ifsc_code', kycData.ifsc_code);
        formData.append('bank_name', kycData.bank_name);
        formData.append('account_holder_name', kycData.account_holder_name);
        formData.append('pancard_number', kycData.pancard_number || '');
        
        
        // For update, append "_method" to indicate PUT request
        // (Some servers require this workaround for multipart PUT requests)
        formData.append('_method', 'PUT');
        
        // Append files if they are new file objects (not existing URLs)
    
        if (kycData.id_front_image && typeof kycData.id_front_image !== 'string') {
            formData.append('id_front_image', kycData.id_front_image);
        }
        if (kycData.id_back_image && typeof kycData.id_back_image !== 'string') {
            formData.append('id_back_image', kycData.id_back_image);
        }
    
        if (kycData.pancard_image && typeof kycData.pancard_image !== 'string') {
            formData.append('pancard_image', kycData.pancard_image);
        }
        
        const response = await fetch(`${API.UPDATE_KYC_URL}`, {
            method: 'POST', 
            headers: {
                'Authorization': `Bearer ${token}`,
            },
            body: formData,
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