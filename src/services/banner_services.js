import { API } from './api_url';

export const getBanner = async () => {
  try {
    console.log("🎯 Fetching banner...");
    
    const response = await fetch(`${API.BANNER_URL}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
    });

    const result = await response.json();
    console.log("✅ Banner Response:", result);

    if (!response.ok) {
      throw new Error(result.message || 'Failed to fetch banner');
    }


    return result;
    
  } catch (error) {
    console.error("❌ Banner Error:", error);
    throw error;
  }
};