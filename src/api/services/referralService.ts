import api from "./api";

export const referralService = {
  claimReferralReward: async (betsaveId: string) => {
    const response = await api.get(`/referrals/referral-rewards/${betsaveId}`);
    return response.data;
  },
  getReferralMetrics: async (betsaveId: string) => {
    const response = await api.get(`/referrals/referral-metrics/${betsaveId}`);
    return response.data;
  },
  getAffiliateMetrics: async (betsaveId: string) => {
    const response = await api.get(`referrals/affiliate-metrics/${betsaveId}`);
    return response.data;
  },
  getReferUsersData: async (betsaveId: string) => {
    const response = await api.get(`referrals/refer-users-data/${betsaveId}`);
    return response.data;
  },
};
