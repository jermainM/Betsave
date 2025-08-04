import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface SessionState {
  isAuthenticated: boolean;
  user: any | null;
  tokens: {
    accessToken: string | null;
  };
}

// Load initial state from localStorage
const loadState = (): SessionState => {
  try {
    const serializedState = localStorage.getItem('session');
    if (serializedState === null) {
      return initialState;
    }
    return JSON.parse(serializedState) as SessionState;
  } catch (err) {
    return initialState;
  }
};

const initialState: SessionState = {
  isAuthenticated: false,
  user: null,
  tokens: {
    accessToken: null,
  },
};

const sessionSlice = createSlice({
  name: 'session',
  initialState: loadState(),
  reducers: {
    setAuthenticated: (state, action: PayloadAction<{ user: any; tokens: { accessToken: string } }>) => {
      state.isAuthenticated = true;
      state.user = action.payload.user;
      state.tokens = action.payload.tokens;
      // Save to localStorage
      localStorage.setItem('session', JSON.stringify({
        isAuthenticated: true,
        user: action.payload.user,
        tokens: action.payload.tokens,
      }));
    },
    clearSession: (state) => {
      // First update the state
      state.isAuthenticated = false;
      state.user = null;
      state.tokens = {
        accessToken: null,
      };
      
      // Then handle localStorage in a try-catch block
      try {
        localStorage.removeItem('session');
        localStorage.removeItem('auth_token');
      } catch (error) {
        console.error('Error clearing session storage:', error);
      }
    },
    updateTokens: (state, action: PayloadAction<{ accessToken: string }>) => {
      state.tokens = action.payload;
      // Update localStorage
      const serializedState = localStorage.getItem('session');
      if (serializedState) {
        const currentState = JSON.parse(serializedState);
        localStorage.setItem('session', JSON.stringify({
          ...currentState,
          tokens: action.payload,
        }));
      }
    },
    updateUser: (state, action: PayloadAction<any>) => {
      state.user = action.payload;
      // Update localStorage
      const serializedState = localStorage.getItem('session');
      if (serializedState) {
        const currentState = JSON.parse(serializedState);
        localStorage.setItem('session', JSON.stringify({
          ...currentState,
          user: action.payload,
        }));
      }
    },
  },
});

export const { setAuthenticated, clearSession, updateTokens, updateUser } = sessionSlice.actions;
export default sessionSlice.reducer; 