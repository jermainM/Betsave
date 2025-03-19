import axios from 'axios';
import { getStoredTokens, storeTokens, removeTokens } from './authService';
import { API_CONFIG } from '../../config/api.config';
import { ENDPOINTS } from '../endpoints';

const api = axios.create({
  baseURL: API_CONFIG.BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Request interceptor
api.interceptors.request.use(
  (config: any) => {
    const tokens = getStoredTokens();
    if (tokens?.accessToken) {
      config.headers.Authorization = `Bearer ${tokens.accessToken}`;
    }
    return config;
  },
  (error: any) => Promise.reject(error)
);

// Response interceptor
api.interceptors.response.use(
  (response: any) => response,
  async (error: any) => {
    const originalRequest = error.config;

    // If error is 401 and we haven't tried to refresh token yet
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const tokens = getStoredTokens();
        const response = await axios.post(ENDPOINTS.AUTH.REFRESH_TOKEN, {
          refreshToken: tokens.refreshToken
        });

        const { accessToken, refreshToken } = response.data.data.tokens;
        storeTokens(accessToken, refreshToken);

        // Retry original request with new token
        originalRequest.headers.Authorization = `Bearer ${accessToken}`;
        return api(originalRequest);
      } catch (error) {
        removeTokens();
        // Redirect to login
        return Promise.reject(error);
      }
    }

    return Promise.reject(error);
  }
);

export default api;