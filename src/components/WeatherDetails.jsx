// src/components/WeatherDetails.jsx
import { memo } from "react";
import { useTranslation } from "react-i18next";
import useWeather from "../hooks/useWeather";

function WeatherDetailsBase() {
  const { t } = useTranslation();
  const { weather, isRTL } = useWeather();
  if (!weather) return null;

  return (
    <>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: 40,
          paddingBottom: 32,
          borderBottom: "1px solid #f0f0f0",
        }}
      >
        <div>
          <div
            style={{
              fontSize: 64,
              fontWeight: 300,
              color: "#1a1a1a",
              lineHeight: 1,
            }}
          >
            {weather.temperature}°
          </div>
          <div
            style={{
              fontSize: 18,
              color: "#525252",
              textTransform: "capitalize",
              marginTop: 12,
            }}
          >
            {weather.description}
          </div>
        </div>
        <img
          src={`https://openweathermap.org/img/wn/${weather.icon}@2x.png`}
          alt={weather.description}
          style={{ width: 100, height: 100, opacity: 0.9 }}
        />
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 24,
          fontSize: 15,
          color: "#525252",
        }}
      >
        <div style={{ display: "flex", gap: 20 }}>
          <span>{t("min")}</span>
          <span style={{ color: "#1a1a1a", fontWeight: 500 }}>
            {weather.minTemp}°
          </span>
        </div>
        <div style={{ display: "flex", gap: 20 }}>
          <span>{t("max")}</span>
          <span style={{ color: "#1a1a1a", fontWeight: 500 }}>
            {weather.maxTemp}°
          </span>
        </div>
        <div style={{ display: "flex", gap: 20 }}>
          <span>{t("humidity")}</span>
          <span style={{ color: "#1a1a1a", fontWeight: 500 }}>
            {weather.humidity}%
          </span>
        </div>
        <div style={{ display: "flex", gap: 20 }}>
          <span>{t("wind")}</span>
          <span style={{ color: "#1a1a1a", fontWeight: 500 }}>
            <div
              style={{
                display: "flex",
                gap: "2px",
                flexDirection: isRTL ? "row-reverse" : "row",
              }}
            >
              <div>{weather.windSpeed}</div>
              <div>km/h</div>
            </div>
          </span>
        </div>
      </div>
    </>
  );
}

export default memo(WeatherDetailsBase);
