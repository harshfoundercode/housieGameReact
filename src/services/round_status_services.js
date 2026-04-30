import { API } from './api_url';
import { RoundStatusResponseModel } from '../model/roundStatus_model';

export const getRoundStatus = async (roundId) => {
  try {
    console.log("🎯 Fetching round status for round:", roundId);
    
    const response = await fetch(`${API.ROUND_STATUS_URL}?round_id=${roundId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
    });

    const result = await response.json();
    console.log("📦 Raw API Response:", result);

    if (!response.ok) {
      throw new Error(result.message || 'Failed to fetch round status');
    }

    // Convert API response to model
    const roundStatusModel = RoundStatusResponseModel.fromAPIResponse(result);
    console.log("✅ Round Status Model created");
    console.log("🔢 Total Called Numbers:", roundStatusModel.data?.totalCalled);
    console.log("🏆 Total Winners:", roundStatusModel.data?.winners.length);
    
    return roundStatusModel;
    
  } catch (error) {
    console.error("❌ getRoundStatus Error:", error);
    throw error;
  }
};