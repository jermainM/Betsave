import { userService } from "../services/userService";

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

export const getUserWalletData = async (betsaveId: string): Promise<any> => {
    if (!betsaveId) {
        return {
            balance: 0,
            totalCashback: 0,
            cashbackDetails: [],
            cpaDetails: [],
            referralDetails: [],
        }
    }
    try {
        const response = await userService.getUserWalletData(betsaveId);
        const balance = response.data.balance;
        const totalCashback = response.data.totalCashback;
        const cashbackDetails = response.data.cashbackDetails;
        const cpaDetails = response.data.cpaDetails;
        const referralDetails = response.data.referralDetails;
        const walletData = {
            balance,
            totalCashback,
            cashbackDetails,
            cpaDetails,
            referralDetails,
        }
        return walletData;
    } catch (err) {
        throw err;
    }
}