import { ENDPOINTS } from "../endpoints";
import api from "./api";

export const casinoService = {
  createAccount: async (betsaveId: string, offerId: string) => {
    try {
      console.log({ betsaveId })
      const response = await api.post('casino/create-account', {
        betsaveId,
        offerId
      });
      return response.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  },

};