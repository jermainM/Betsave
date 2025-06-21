export const fetchIP = async () => {
  try {
    const response = await fetch("https://ipapi.co/json/");
    const data = await response.json();
    console.log({ data });
    return data;
  } catch (error) {
    console.error("Error fetching IP address:", error);
    return null;
  }
};
