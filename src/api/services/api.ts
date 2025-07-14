import axios from 'axios';
import { getStoredTokens, storeTokens, removeTokens } from './authService';
import { API_CONFIG } from '../../config/api.config';
import { store } from '../../store';
import { clearSession } from '../../store/slices/sessionSlice';

// Create a custom event for notifications
const createNotificationEvent = (message: string, severity: 'success' | 'error' | 'info' | 'warning') => {
  return new CustomEvent('showNotification', {
    detail: {
      message,
      severity
    }
  });
};

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
    console.log({ config })
    return config;
  },
  (error: any) => {
    // Silently handle request errors
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response: any) => {
    // Show success notification if there's a success message
    if (response.data?.message) {
      window.dispatchEvent(createNotificationEvent(response.data.message, 'success'));
    }
    return response;
  },
  async (error: any) => {
    // Handle 401 unauthorized error
    if (error.response?.status === 401) {
      store.dispatch(clearSession());
      removeTokens();
      window.location.href = '/';
      // window.dispatchEvent(createNotificationEvent('Session expired. Please login again.', 'error'));
      return Promise.reject(new Error('Session expired. Please login again.'));
    }

    // Handle other errors gracefully
    let errorMessage = 'An unexpected error occurred. Please try again.';
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      errorMessage = error.response.data.message || 'Something went wrong. Please try again.';
    } else if (error.request) {
      // The request was made but no response was received
      errorMessage = 'No response from server. Please check your connection.';
    }

    // Show error notification
    // window.dispatchEvent(createNotificationEvent(errorMessage, 'error'));

    return Promise.reject(new Error(errorMessage));
  }
);

export default api;