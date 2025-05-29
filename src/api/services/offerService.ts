import api from "./api";

export const offerService = {

  getOffers: async () => {
    try {
      const response = await api.get('/offers');
      console.log({ offers: response.data })
      return response.data;
    } catch (err: any) {
      // For other errors, show a user-friendly message
      console.log('Error fetching offers:', err);
      throw new Error('Unable to load offers. Please try again later.');
    }
  },

};
