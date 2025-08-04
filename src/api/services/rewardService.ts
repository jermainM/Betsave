import api from "./api";

export const rewardService = {
  getCpaReward: async (betsaveId: string) => {
    const response = await api.get(`/rewards/cpa-rewards/${betsaveId}`);
    return response.data;
  },
};
