import api from "./api";

export const rewardService = {
  activatePromoCode: async (promoCode: string, email: string) => {
    const response = await api.post("/promo/activate", {
      code: promoCode,
      email,
    });
    return response.data;
  },
  isActivePromo: async (email: string) => {
    const response = await api.post("/promo/is-active/", {
      email
    });
    return response.data;
  },
};
