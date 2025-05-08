import api from "./api";

interface HistoryItem {
  offerId: string;
  offerImage: string;
  offerTitle: string;
  lossAmount: number;
  dateTime: string;
  withdrawable: boolean;
}


export const transactionService = {
  requestCashback: async (betsaveId: string, method: string, token: string, requestedAmount: number, address: string, tier: string, cashbackRate: number, history: HistoryItem[]) => {
    const response = await api.post("/transaction/request", {
      betsaveId,
      method,
      token,
      requestedAmount,
      address,
      tier,
      cashbackRate,
      history
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
