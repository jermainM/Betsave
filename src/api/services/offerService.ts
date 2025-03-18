import { ENDPOINTS } from "../endpoints"; 

export const offerService = {

  getOffers: async () => {
    const response = await fetch(ENDPOINTS.OFFERS.GET);
    const data = await response.json();
    return data;
  },

};
