import { API } from "./api_url";

export const getWinnerBannerApi = async () => {
    try {
        const token = localStorage.getItem('token'); 
        
        const response = await fetch(`${API.WINNER_BANNER_URL}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,  
            },
        });

        const responseData = await response.json();
        console.log("📸 Raw Winner Banner API Response:", responseData);

        // Postman status codes ke hisaab se handling
        switch (response.status) {
            case 200:
                // ✅ Direct response data return karo, wrap mat karo
                // API returns: { success: true, data: { id, image_url, ... } }
                return responseData;
                
            case 401:
                throw new Error('Session expired. Please login again');
                
            case 404:
                throw new Error('Winner banner not found');
                
            default:
                throw new Error(responseData.message || `Error ${response.status}`);
        }
        
    } catch (error) {
        if (error.name === 'TypeError') {
            throw new Error('Network error - Check internet connection');
        }
        throw error;
    }
};