import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

// Translation resources
const resources = {
  en: {
    translation: {
      searchPlaceholder: "Search city...",
      humidity: "Humidity:",
      wind: "Wind:",
      min: "min:",
      max: "max:",
      loading: "Loading...",
      error: "Error loading weather",
      language: "Language",
      english: "English",
      spanish: "Español",
      arabic: "العربية",
    },
  },
  es: {
    translation: {
      searchPlaceholder: "Buscar ciudad...",
      humidity: "Humedad:",
      wind: "Viento:",
      min: "mín:",
      max: "máx:",
      loading: "Cargando...",
      error: "Error al cargar el clima",
      language: "Idioma",
      english: "English",
      spanish: "Español",
      arabic: "العربية",
    },
  },
  ar: {
    translation: {
      searchPlaceholder: "البحث عن مدينة...",
      humidity: "الرطوبة:",
      wind: "الرياح:",
      min: "الحد الأدنى:",
      max: "الحد الأقصى:",
      loading: "جاري التحميل...",
      error: "خطأ في تحميل الطقس",
      language: "اللغة",
      english: "English",
      spanish: "Español",
      arabic: "العربية",
    },
  },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    lng: "en", // default language
    fallbackLng: "en",

    detection: {
      order: ["localStorage", "navigator", "htmlTag"],
      caches: ["localStorage"],
    },

    interpolation: {
      escapeValue: false, // react already does escaping
    },
  });

export default i18n;
