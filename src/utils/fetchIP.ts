export const fetchIP = async () => {
  try {
    const response = await fetch(`https://api.bigdatacloud.net/data/ip-geolocation?key=bdc_b7488846cb8a46ac890f03f6b789434b`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching IP address:", error);
    return null;
  }
};


