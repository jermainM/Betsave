import { ENDPOINTS } from "../endpoints";
import { store } from "../../store";
import { updateTokens } from "../../store/slices/sessionSlice";

const TOKEN_KEY = 'auth_tokens';
const TOKEN_REFRESH_INTERVAL = 4 * 60 * 1000; // 4 minutes

let refreshTokenInterval: number | null = null;

// Store tokens in localStorage and start refresh interval
export const storeTokens = (accessToken: string, refreshToken: string) => {
  localStorage.setItem(TOKEN_KEY, JSON.stringify({
    accessToken,
    refreshToken,
    lastRefresh: new Date().getTime()
  }));
  
  // Update Redux store
  store.dispatch(updateTokens({ accessToken, refreshToken }));
  
  // Clear existing interval if any
  if (refreshTokenInterval) {
    clearInterval(refreshTokenInterval);
  }
  
  // Start new refresh interval
  refreshTokenInterval = setInterval(refreshToken, TOKEN_REFRESH_INTERVAL);
};

// Get stored tokens
export const getStoredTokens = () => {
  const tokens = localStorage.getItem(TOKEN_KEY);
  return tokens ? JSON.parse(tokens) : null;
};

// Remove stored tokens and clear refresh interval
export const removeTokens = () => {
  localStorage.removeItem(TOKEN_KEY);
  if (refreshTokenInterval) {
    clearInterval(refreshTokenInterval);
    refreshTokenInterval = null;
  }
};

export const authService = {
  // Headers with access token
  getHeaders() {
    const tokens = getStoredTokens();
    return {
      'Content-Type': 'application/json',
      ...(tokens?.accessToken ? { 'Authorization': `Bearer ${tokens.accessToken}` } : {})
    };
  },
  
  login: async (email: string, password: string) => {
    const response = await fetch(ENDPOINTS.AUTH.LOGIN, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password }),
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.message);

    // Store tokens and start refresh interval
    storeTokens(data.data.tokens.accessToken, data.data.tokens.refreshToken);
    return data;
  },

  signup: async (email: string, password: string) => {  
    const response = await fetch(ENDPOINTS.AUTH.SIGNUP, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password }),
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.message);

    // Store tokens and start refresh interval
    storeTokens(data.data.tokens.accessToken, data.data.tokens.refreshToken);
    return data;
  },

  signout: async () => {
    const tokens = getStoredTokens();
    try {
      const response = await fetch(ENDPOINTS.AUTH.SIGNOUT, {
        method: "POST",
        headers: authService.getHeaders(),
        body: JSON.stringify({ refreshToken: tokens.refreshToken })
      });
      const data = await response.json();
      return data;
    } finally {
      removeTokens();
    }
  },

  refreshToken: async () => {
    const tokens = getStoredTokens();
    if (!tokens?.refreshToken) throw new Error('No refresh token available');

    const response = await fetch(ENDPOINTS.AUTH.REFRESH_TOKEN, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ refreshToken: tokens.refreshToken })
    });

    const data = await response.json();
    if (!response.ok) {
      removeTokens();
      throw new Error(data.message);
    }

    // Store new tokens and update refresh interval
    storeTokens(data.data.tokens.accessToken, data.data.tokens.refreshToken);
    return data.data.tokens;
  },

  fetchWithToken: async (url: string, options: RequestInit = {}) => {
    try {
      // Add auth headers
      const headers = authService.getHeaders();
      const response = await fetch(url, {
        ...options,
        headers: { ...headers, ...(options.headers || {}) }
      });

      // If token expired, try to refresh
      if (response.status === 401) {
        const newTokens = await authService.refreshToken();
        
        // Retry original request with new token
        const newHeaders = {
          ...options.headers,
          'Authorization': `Bearer ${newTokens.accessToken}`
        };
        
        return fetch(url, {
          ...options,
          headers: newHeaders
        });
      }

      return response;
    } catch (error: any) {
      if (error.message.includes('refresh token')) {
        removeTokens();
        // Redirect to login or handle unauthorized state
      }
      throw error;
    }
  }
};
