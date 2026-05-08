import { API } from './api_url';
import WinnersListModel  from '../model/winners_model';


export const getWinnerList = async () => {
  try {
    console.log("Fetching winner list...");
    
    const response = await fetch(`${API.WINNER_LIST_URL}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.message || 'Failed to winners list');
    }
    
    const winnersList = WinnersListModel.fromAPIResponse(result);    
    return winnersList;
    
  } catch (error) {
    console.error("❌ winnersList Error:", error);
    throw error;
  }
};