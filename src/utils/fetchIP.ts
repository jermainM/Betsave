export const fetchIP = async () => {
  try {
    const response = await fetch("https://api.ipify.org/?format=json");
    const data = await response.json();
    const ip = data.ip;
    return ip;
  } catch (error) {
    console.error("Error fetching IP address:", error);
    return null;
  }
};
