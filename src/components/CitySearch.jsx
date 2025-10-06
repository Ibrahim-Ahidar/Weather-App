// src/components/CitySearch.jsx
import { memo } from "react";
import { useTranslation } from "react-i18next";
import useWeather from "../hooks/useWeather";

function CitySearchBase() {
  const { t } = useTranslation();
  const {
    cityInput,
    cityOptions,
    isRTL,
    setInput,
    loadCityOptions,
    selectCity,
  } = useWeather();

  const onChange = (v) => {
    setInput(v);
    loadCityOptions(v);
  };

  return (
    <div style={{ marginBottom: 40, position: "relative" }}>
      <input
        type="text"
        value={cityInput}
        onChange={(e) => onChange(e.target.value)}
        placeholder={t("searchPlaceholder")}
        style={{
          width: "100%",
          padding: "12px 16px",
          border: "1px solid #d4d4d4",
          fontSize: 15,
          outline: "none",
          textAlign: isRTL ? "right" : "left",
          boxSizing: "border-box",
          transition: "border-color 0.2s ease",
        }}
        onFocus={(e) => (e.target.style.borderColor = "#737373")}
        onBlur={(e) => (e.target.style.borderColor = "#d4d4d4")}
      />

      {cityOptions.length > 0 && (
        <div
          style={{
            position: "absolute",
            top: "100%",
            left: 0,
            right: 0,
            marginTop: 4,
            backgroundColor: "white",
            border: "1px solid #d4d4d4",
            zIndex: 10,
            maxHeight: 240,
            overflowY: "auto",
          }}
        >
          {cityOptions.map((option, index) => (
            <div
              key={`${option.name}-${option.lat}-${index}`}
              onClick={() => selectCity(option)}
              style={{
                padding: "12px 16px",
                color: "#1a1a1a",
                cursor: "pointer",
                borderBottom:
                  index < cityOptions.length - 1 ? "1px solid #f5f5f5" : "none",
                textAlign: isRTL ? "right" : "left",
                fontSize: 15,
                transition: "background-color 0.15s ease",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.backgroundColor = "#fafafa")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.backgroundColor = "white")
              }
            >
              {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default memo(CitySearchBase);
