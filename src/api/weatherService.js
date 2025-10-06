// src/api/weatherService.js
import axios from "axios";

export const DEFAULT_CITY = { name: "Madrid", lat: 40.4168, lon: -3.7038 };

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
