import api from "./api";

export const transactionService = {
  requestCashback: async (betsaveId: string, method: string, token: string, requestedAmount: number, address: string, tier: string, cashbackRate: number) => {
    const response = await api.post("/transaction/request", {
      betsaveId,
      method,
      token,
      requestedAmount,
      address,
      tier,
      cashbackRate,
    });
    return response.data;
  },
  getTransactionByBetsaveId: async (betsaveId: string) => {
    const response = await api.get("/transactions/betsaveId", {
      params: { betsaveId },
    });
    return response.data;
  },
};
