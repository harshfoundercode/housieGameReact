import { API } from "./api_url";

// Get User Feedback Videos
export const getFeedbackVideos = async () => {
    try {
        const response = await fetch(`${API.FEEDBACK_URL}`, {
            method: 'GET'
        });

        const data = await response.json();
        
        if (!response.ok) {
            throw new Error(data.message || 'Failed to fetch feedback videos');
        }
        
        return data;
    } catch (error) {
        throw error;
    }
};