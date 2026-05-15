import { API } from './api_url';

export const getAllGameResultDetails = async (filter) => {
  try {
    const token = localStorage.getItem("token");
    
    const response = await fetch(`${API.ALL_GAMES_RESULT_URL}${filter}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': token ? `Bearer ${token}` : '',
      },
    });

    const result = await response.json();
    console.log("All Game Result Details API Response:", result);

    if (!response.ok) {
      throw new Error(result.message || 'Failed to fetch game result details');
    }

    return result;
  } catch (error) {
    console.error("getAllGameResultDetails Error:", error);
    throw error;
  }
};