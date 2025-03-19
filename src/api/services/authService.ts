import { ENDPOINTS } from "../endpoints"; 

const TOKEN_KEY = 'auth_tokens';
// Store tokens in localStorage
export const storeTokens = (accessToken: string, refreshToken: string) => {
  localStorage.setItem(TOKEN_KEY, JSON.stringify({
    accessToken,
    refreshToken,
    lastRefresh: new Date().getTime()
  }));
};

// Get stored tokens
export const getStoredTokens = () => {
  const tokens = localStorage.getItem(TOKEN_KEY);
  return tokens ? JSON.parse(tokens) : null;
};

// Remove stored tokens
export const removeTokens = () => {
  localStorage.removeItem(TOKEN_KEY);
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
        'Content-Type': 'application/json'  // Add this header
      },
      body: JSON.stringify({ email, password }),
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.message);

    // Store tokens
    storeTokens(data.data.tokens.accessToken, data.data.tokens.refreshToken);
    return data;
  },

  signup: async (email: string, password: string) => {  
    const response = await fetch(ENDPOINTS.AUTH.SIGNUP, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'  // Add this header
      },
      body: JSON.stringify({ email, password }),
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.message);

    // Store tokens
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

    // Store new tokens
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
