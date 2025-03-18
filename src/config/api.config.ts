const getBackendUrl = () => {
  // Check if we're in development (localhost)
  if (window.location.hostname === 'localhost') {
    return 'http://localhost:5000';
  }
  // For production (vercel)
  return 'https://betsave-backend.vercel.app';
};

export const API_CONFIG = {
  BASE_URL: `${getBackendUrl()}/api/v1`,
  BACKEND_URL: getBackendUrl(),
}; 