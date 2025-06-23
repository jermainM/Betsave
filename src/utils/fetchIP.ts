export const getGeoLocation = async (): Promise<any> => {
  const cacheKey = "geo_location_cache";
  const cache = localStorage.getItem(cacheKey);

  if (cache) {
    const { timestamp, data } = JSON.parse(cache);
    const oneDay = 24 * 60 * 60 * 1000;

    if (Date.now() - timestamp < oneDay) {
      // ✅ Return cached data if less than 24h old
      return data;
    }
  }

  // ⏳ Fetch from API
  try {
    const res = await fetch("https://ipwho.is/");
    const data = await res.json();

    if (data.success) {
      localStorage.setItem(
        cacheKey,
        JSON.stringify({ timestamp: Date.now(), data })
      );
      return data;
    } else {
      throw new Error("Geo lookup failed");
    }
  } catch (err) {
    console.error("Geo error:", err);
    return null;
  }
}