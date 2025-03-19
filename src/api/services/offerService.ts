import api from "./api";
export const offerService = {

  getOffers: async () => {
    const response = await api.get('/offers');
    return response.data;
  },

};
