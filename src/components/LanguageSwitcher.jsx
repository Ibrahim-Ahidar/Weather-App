// src/components/LanguageSwitcher.jsx
import { memo } from "react";
import { useTranslation } from "react-i18next";
import useWeather from "../hooks/useWeather";

function LanguageSwitcherBase() {
  const { i18n } = useTranslation();
  const { changeLanguage } = useWeather();

  const langs = [
    { code: "ar", label: "العربية" },
    { code: "es", label: "Español" },
    { code: "en", label: "English" },
  ];

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "flex-end",
        gap: 16,
        marginBottom: 32,
        fontSize: 14,
      }}
      dir="rtl"
    >
      {langs.map((lang) => (
        <button
          key={lang.code}
          onClick={() => changeLanguage(lang.code)}
          style={{
            background: "none",
            border: "none",
            color: i18n.language === lang.code ? "#000" : "#999",
            cursor: "pointer",
            fontSize: 14,
            padding: "4px 8px",
            transition: "color 0.2s ease",
            fontWeight: i18n.language === lang.code ? 600 : 400,
          }}
          onMouseEnter={(e) => (e.currentTarget.style.color = "#000")}
          onMouseLeave={(e) => {
            if (i18n.language !== lang.code)
              e.currentTarget.style.color = "#999";
          }}
        >
          {lang.label}
        </button>
      ))}
    </div>
  );
}

export default memo(LanguageSwitcherBase);
