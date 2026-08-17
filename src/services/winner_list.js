// import { API } from './api_url';
// import WinnersListModel  from '../model/winners_model';


// export const getWinnerList = async () => {
//   try {
//     console.log("Fetching winner list...");
    
//     const response = await fetch(`${API.WINNER_LIST_URL}`, {
//       method: 'GET',
//       headers: {
//         'Content-Type': 'application/json',
//         'Accept': 'application/json',
//       },
//     });

//     const result = await response.json();

//     if (!response.ok) {
//       throw new Error(result.message || 'Failed to winners list');
//     }
    
//     const winnersList = WinnersListModel.fromAPIResponse(result);    
//     return winnersList;
    
//   } catch (error) {
//     console.error("❌ winnersList Error:", error);
//     throw error;
//   }
// };
// winner_list.js - Updated with game_id support
import { API } from './api_url';
import WinnersListModel from '../model/winners_model';

export const getWinnerList = async (gameId = null) => {
  try {
    console.log("Fetching winner list for game:", gameId);
    
    // Build URL with query params
    let url = `${API.WINNER_LIST_URL}`;
    if (gameId) {
      url += `?game_id=${gameId}`;
    }
    
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      },
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.message || 'Failed to fetch winners list');
    }
    
    const winnersList = WinnersListModel.fromAPIResponse(result);    
    return winnersList;
    
  } catch (error) {
    console.error("❌ winnersList Error:", error);
    throw error;
  }
};

// New function to fetch live games with pagination
export const getLiveGames = async (page = 1, limit = 10, startDate = null) => {
  try {
    // Get today's date if not provided
    const today = startDate || new Date().toISOString().split('T')[0];
    
    const url = `${API.LIVE_SCHEDULE_RESULT_URL}?page=${page}&limit=${limit}&start_datetime=${today}`;
    
    console.log("Fetching live games:", url);
    
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      },
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.message || 'Failed to fetch live games');
    }
    
    return result;
    
  } catch (error) {
    console.error("❌ getLiveGames Error:", error);
    throw error;
  }
};