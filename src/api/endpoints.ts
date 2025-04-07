import { API_CONFIG } from '../config/api.config';

export const ENDPOINTS = {
  OFFERS: {
    CREATE: `${API_CONFIG.BASE_URL}/offers`,
    GET: `${API_CONFIG.BASE_URL}/offers`,
    UPDATE: `${API_CONFIG.BASE_URL}/offers`,
    DELETE: `${API_CONFIG.BASE_URL}/offers`,
  },
  AUTH: {
    LOGIN: `${API_CONFIG.BASE_URL}/auth/signin`,
    SIGNUP: `${API_CONFIG.BASE_URL}/auth/signup`,
    SIGNOUT: `${API_CONFIG.BASE_URL}/auth/signout`,
    VERIFY_EMAIL: `${API_CONFIG.BASE_URL}/auth/send-verification-email`,
    VERIFY_EMAIL_CODE: `${API_CONFIG.BASE_URL}/auth/verify-email`,
    VERIFY_PHONE: `${API_CONFIG.BASE_URL}/auth/verify-phone`,
    VERIFY_PHONE_CODE: `${API_CONFIG.BASE_URL}/auth/verify-sms-code`,
  },
};
