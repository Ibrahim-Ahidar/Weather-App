// src/api/weatherService.js
import axios from "axios";

// No default city; app uses geolocation or user search
export const DEFAULT_CITY = null;

export async function searchCities(query) {
  if (!query || query.length < 2) return [];
  const { data } = await axios.get("/api/geocode", {
    params: { q: query, limit: 5 },
  });
  return data;
}

export async function getWeatherByCoords({ lat, lon, lang = "en" }) {
  const { data } = await axios.get("/api/weather", {
    params: { lat, lon, lang },
  });
  // هنا نرجّع payload مباشرة لأن السيرفرلس جهّزه
  return data;
}
