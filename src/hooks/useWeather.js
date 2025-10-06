// src/hooks/useWeather.js
import { useWeatherContext } from "../context/WeatherContext";

export default function useWeather() {
  return useWeatherContext();
}
