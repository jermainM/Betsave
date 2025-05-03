import { TIER_CONFIG } from "../constants/static-data";

export const calculateTierAndCashback = (totalLossAmount: number) => {
  for (const tier of Object.values(TIER_CONFIG)) {
    if (totalLossAmount >= tier.min && totalLossAmount <= tier.max) {
      return {
        tier: tier.name,
        maxLossAmount: tier.max,
        cashbackRate: tier.cashbackRate,
      };
    }
  }

  return {
    tier: TIER_CONFIG.BRONZE.name,
    maxLossAmount: TIER_CONFIG.BRONZE.max,
    cashbackRate: TIER_CONFIG.BRONZE.cashbackRate,
  };
};