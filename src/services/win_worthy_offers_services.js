import { API } from './api_url';
import OfferModel from '../model/win_worthy_offers_model';


export const getWinWorthyOffers = async () => {
  try {
    console.log("Fetching offers...");
    
    const response = await fetch(`${API.WIN_WORHTY_OFFERS_URL}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
    });

    const result = await response.json();
    console.log(" Raw API Response:", result);

    if (!response.ok) {
      throw new Error(result.message || 'Failed to fetch offers');
    }

    
    //  API response se OfferModel array create karo
    const offersList = OfferModel.fromAPIResponse(result);
    console.log("Offers List (Models):", offersList);
    console.log("Total Offers:", offersList.length);
    
  
    return offersList; 
    
  } catch (error) {
    console.error("❌ Offers Error:", error);
    throw error;
  }
};