import { referralService } from "../services/referralService";
import { transactionService } from "../services/transactionService";
import { userService } from "../services/userService";

export const getUserBalance = async (user: any): Promise<{
    balance: number;
    totalCashback: number;
    pendingAmount: number;
    referralReward: number;
}> => {
    if (!user || !user.betsaveId) {
      return {
        balance: 0,
        totalCashback: 0,
        pendingAmount: 0,
        referralReward: 0,
      }
    }

    try {
      const response1 = await userService.getUserBalance(user.betsaveId);
      console.log({ response1 })
      let totalCashback = response1.data.totalCashbackAmount ?? 0;
      let referralReward = 0;
      
      const response2 = await referralService.claimReferralReward(
        user.betsaveId
      );
      if (
        response2.data.reward > 0 &&
        response2.data.isEligibleToPay &&
        !response2.data.isRewardPaid
      ) {
        referralReward = response2.data.reward;
      }

      const response3 = await transactionService.getTransactionByBetsaveId(
        user.betsaveId
      );

      const pendingAmount = response3.data.reduce((acc: number, curr: any) => {
        if (curr.status?.toLowerCase() === "pending") {
          return acc + curr.totalRequestedAmount;
        }
        return acc;
      }, 0);

      const balance = totalCashback + referralReward - pendingAmount;

      console.log({ balance, totalCashback, pendingAmount, referralReward })
      return {
        balance,
        totalCashback,
        pendingAmount,
        referralReward,
      }
    } catch (error) {
        throw error;
    }
};

export const getUserBetHistory = async (user: any): Promise<any[]> => {
    if (!user || !user.betsaveId) {
        return [];
    }
    try {
        const response = await userService.getUserBalance(user.betsaveId);
        const history = response.data.cashbackDetails ?? [];
        return history;
    } catch (err) {
        throw err;
    }
}