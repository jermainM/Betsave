import api from "./api";

export const userService = {
  getUserBalance: async (betsaveId: string) => {
    const response = await api.get(`/casino/wallet-balance/${betsaveId}`);
    return response.data;
  },
  checkEligibility: async (betsaveId: string) => {
    const response = await api.get(`/users/eligibility/${betsaveId}`);
    return response.data;
  },
};
