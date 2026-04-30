import { API } from './api_url';
import { GameRoundsResponseModel } from '../model/live_schedule_result_model';

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

    // Convert API response to model
    const gameRoundsModel = GameRoundsResponseModel.fromAPIResponse(result);
    console.log("✅ Game Rounds Model created");
    console.log("📊 Total Games:", gameRoundsModel.data.length);
    console.log("🎯 Games with rounds:", gameRoundsModel.getGamesWithRounds().length);
    console.log("📝 Total rounds:", gameRoundsModel.getTotalRoundsCount());
    
    return gameRoundsModel;
    
  } catch (error) {
    console.error("❌ getGameRounds Error:", error);
    throw error;
  }
};