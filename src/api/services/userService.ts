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
  getUsers: async () => {
    const response = await api.get(`/users`);
    return response.data;
  },
  getGeoLocation: async (ipAddress: string) => {
    const response = await api.get(`/users/geo-location/${ipAddress}`);
    return response.data;
  },
};
