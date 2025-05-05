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
  claimReferralReward: async (betsaveId: string) => {
    const response = await api.get(`/users/referral-rewards/${betsaveId}`);
    return response.data;
  },
  getReferralMetrics: async (betsaveId: string) => {
    const response = await api.get(`/users/referral-metrics/${betsaveId}`);
    return response.data;
  },
};
