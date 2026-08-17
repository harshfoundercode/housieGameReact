import { API } from "./api_url";

export const getUserProfile = async () => {
    try {
        const token = localStorage.getItem('token'); 
        
        const response = await fetch(`${API.PROFILE_URL}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`, 
            },
        });

        const data = await response.json();

        // Postman status codes ke hisaab se handling
        switch (response.status) {
            case 200:
                return { 
                    success: true, 
                    statusCode: response.status,
                    data: data 
                };
                
            case 401:
                throw new Error('Session expired. Please login again');
                
            case 404:
                throw new Error('Profile not found');
                
            default:
                throw new Error(data.message || `Error ${response.status}`);
        }
        
    } catch (error) {
        if (error.name === 'TypeError') {
            throw new Error('Network error - Check internet connection');
        }
        throw error;
    }
};

export const editUserProfile = async (profileData) => {
    try {
        const token = localStorage.getItem('token');
        
        // Only send first_name, last_name, and name (phone is not editable)
        const payload = {
            first_name: profileData.first_name,
            last_name: profileData.last_name,
            name: `${profileData.first_name} ${profileData.last_name}`.trim()
        };
        
        `${API.PROFILE_URL}`
        const response = await fetch(`${API.PROFILE_EDIT}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(payload),
        });

        const data = await response.json();

        switch (response.status) {
            case 200:
                return { 
                    success: true, 
                    statusCode: response.status,
                    data: data 
                };
                
            case 401:
                throw new Error('Session expired. Please login again');
                
            case 422:
                throw new Error(data.message || 'Validation error');
                
            default:
                throw new Error(data.message || `Error ${response.status}`);
        }
        
    } catch (error) {
        if (error.name === 'TypeError') {
            throw new Error('Network error - Check internet connection');
        }
        throw error;
    }
};