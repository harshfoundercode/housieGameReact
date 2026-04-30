import { API } from './api_url';

export const getMediaNews = async () => {
  try {
    console.log("🎯 Fetching data...");
    
    const response = await fetch(`${API.NEWS_MEDIA_URL}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
    });

    const result = await response.json();
    console.log("✅ Media News Response:", result);

    if (!response.ok) {
      throw new Error(result.message || 'Failed to fetch media news');
    }


    return result;
    
  } catch (error) {
    console.error("❌ media news Error:", error);
    throw error;
  }
};