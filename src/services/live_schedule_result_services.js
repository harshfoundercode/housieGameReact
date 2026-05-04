import { API } from './api_url';

export const getGameRounds = async () => {
  try {
    console.log("🎮 Fetching game rounds...");
    
    const response = await fetch(`${API.LIVE_SCHEDULE_RESULT_URL}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
    });

    const result = await response.json();
    console.log("📦 Raw API Response:", result);

    if (!response.ok) {
      throw new Error(result.message || 'Failed to fetch game rounds');
    }

    return result;
    
  } catch (error) {
    console.error("❌ getGameRounds Error:", error);
    throw error;
  }
};