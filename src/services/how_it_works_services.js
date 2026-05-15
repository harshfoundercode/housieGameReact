import { API } from "./api_url";

export const getHowItsWorks = async () => {
    try {
        const token = localStorage.getItem('token'); 
        
        const response = await fetch(`${API.HOW_IT_WORKS_URL}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`, 
            },
        });

        const responseData = await response.json();
        console.log("📹 Raw API Response:", responseData);

        // Postman status codes ke hisaab se handling
        switch (response.status) {
            case 200:
                // ✅ Direct response data return karo, wrap mat karo
                return responseData;
                
            case 401:
                throw new Error('Session expired. Please login again');
                
            case 404:
                throw new Error('Video not found');
                
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