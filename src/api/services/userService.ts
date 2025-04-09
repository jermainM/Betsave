import api from "./api";

export const userService = {
  getUserBalance: async (userId: string) => {
    const response = await api.get(`/users/${userId}/wallet-balance`);
    return response.data;
  },
};

