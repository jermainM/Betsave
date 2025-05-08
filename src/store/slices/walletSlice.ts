import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface WalletState {
  totalCashback: number;
  availableCashback: number;
  history: Array<{
    offerId: string;
    offerImage: string;
    offerTitle: string;
    lossAmount: number;
    dateTime: string;
    withdrawable: boolean;
  }>;
  isLoading: boolean;
  error: string | null;
}

const initialState: WalletState = {
  totalCashback: 0,
  availableCashback: 0,
  history: [],
  isLoading: false,
  error: null,
};

const walletSlice = createSlice({
  name: "wallet",
  initialState,
  reducers: {
    setWalletData: (state, action: PayloadAction<{
      totalCashback: number;
      availableCashback: number;
      history: WalletState["history"];
    }>) => {
      state.totalCashback = action.payload.totalCashback;
      state.availableCashback = action.payload.availableCashback;
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
      state.totalCashback = 0;
      state.availableCashback = 0;
      state.history = [];
      state.isLoading = false;
      state.error = null;
    },
  },
});

export const { setWalletData, setLoading, setError, clearWalletData } = walletSlice.actions;
export default walletSlice.reducer; 