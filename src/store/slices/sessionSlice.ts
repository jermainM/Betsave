import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface SessionState {
  isAuthenticated: boolean;
  user: any | null;
  tokens: {
    accessToken: string | null;
    refreshToken: string | null;
  };
}

const initialState: SessionState = {
  isAuthenticated: false,
  user: null,
  tokens: {
    accessToken: null,
    refreshToken: null,
  },
};

const sessionSlice = createSlice({
  name: 'session',
  initialState,
  reducers: {
    setAuthenticated: (state, action: PayloadAction<{ user: any; tokens: { accessToken: string; refreshToken: string } }>) => {
      state.isAuthenticated = true;
      state.user = action.payload.user;
      state.tokens = action.payload.tokens;
    },
    clearSession: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      state.tokens = {
        accessToken: null,
        refreshToken: null,
      };
    },
  },
});

export const { setAuthenticated, clearSession } = sessionSlice.actions;
export default sessionSlice.reducer; 