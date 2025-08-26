const getBackendUrl = () => {
  // Check if we're in development (localhost)
  if (window.location.hostname === "localhost") {
    return "http://localhost:5000";
  }
  // For production (vercel)
  return "https://betsave-backend.vercel.app";
};

const getAIBackendUrl = () => {
  // Check if we're in development (localhost)
  if (window.location.hostname === "localhost") {
    return "http://localhost:7000";
  }
  // For production (vercel)
  return "https://betsave-ai-bot.vercel.app";
};

export const API_CONFIG = {
  BASE_URL: `${getBackendUrl()}`,
  BACKEND_URL: getBackendUrl(),
  AI_BACKEND_URL: getAIBackendUrl(),
}; 