import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface WalletState {
  balance: number;
  totalCashback: number;
  history: Array<{
    offerId: string;
    offerImage: string;
    offerTitle: string;
    brandName: string;
    lossAmount: number;
    dateTime: string;
    isPaid: boolean;
  }>;
  isLoading: boolean;
  error: string | null;
}

const initialState: WalletState = {
  balance: 0,
  totalCashback: 0,
  history: [],
  isLoading: false,
  error: null,
};

const walletSlice = createSlice({
  name: "wallet",
  initialState,
  reducers: {
    setWalletData: (state, action: PayloadAction<{
      balance: number;
      totalCashback: number;
      history: WalletState["history"];
    }>) => {
      state.balance = action.payload.balance;
      state.totalCashback = action.payload.totalCashback;
      state.history = action.payload.history;
      state.isLoading = false;
      state.error = null;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.isLoading = false;
    },
    clearWalletData: (state) => {
      state.balance = 0;
      state.totalCashback = 0;
      state.history = [];
      state.isLoading = false;
      state.error = null;
    },
    updateWalletBalance: (state, action: PayloadAction<number>) => {
      state.balance = action.payload;
    },
  },
});

export const { setWalletData, setLoading, setError, clearWalletData, updateWalletBalance } = walletSlice.actions;
export default walletSlice.reducer; 