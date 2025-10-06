// src/components/WeatherHeader.jsx
import { memo } from "react";
import useWeather from "../hooks/useWeather";

function WeatherHeaderBase() {
  const { weather, selected, isRTL, formatDateTime } = useWeather();

  return (
    <>
      <h1
        style={{
          fontSize: 32,
          fontWeight: 600,
          marginBottom: 6,
          color: "#1a1a1a",
          textAlign: isRTL ? "right" : "left",
        }}
      >
        {weather ? weather.cityName : selected.name}
      </h1>

      <div
        style={{
          fontSize: 14,
          color: "#737373",
          marginBottom: 32,
          textAlign: isRTL ? "right" : "left",
        }}
      >
        {formatDateTime()}
      </div>
    </>
  );
}

export default memo(WeatherHeaderBase);
