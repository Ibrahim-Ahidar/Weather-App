// src/context/WeatherContext.jsx
import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  useCallback,
} from "react";
import moment from "moment/min/moment-with-locales";
import { useTranslation } from "react-i18next";
import {
  DEFAULT_CITY,
  getWeatherByCoords,
  searchCities,
} from "../api/weatherService";
import { weatherReducer } from "./weatherReducer";
import {
  SET_ERROR,
  SET_INPUT,
  SET_LOADING,
  SET_OPTIONS,
  SET_SELECTED,
  SET_WEATHER,
  TICK_NOW,
} from "./weatherTypes";

const WeatherContext = createContext(null);

const initialState = {
  cityInput: "",
  cityOptions: [],
  selected: DEFAULT_CITY,
  weather: null,
  now: moment(),
  loading: false,
  error: null,
};

export function WeatherProvider({ children }) {
  const { i18n } = useTranslation();

  const [state, dispatch] = useReducer(weatherReducer, initialState);

  // مشتقات (مُذكّرة بـ useMemo)
  const isRTL = useMemo(() => i18n.language === "ar", [i18n.language]);

  const langForAPI = useMemo(() => {
    return i18n.language === "ar" ? "ar" : i18n.language === "es" ? "es" : "en";
  }, [i18n.language]);

  const formatDateTime = useCallback(() => {
    return state.now
      .locale(
        i18n.language === "ar" ? "ar" : i18n.language === "es" ? "es" : "en"
      )
      .format("dddd HH:mm");
  }, [state.now, i18n.language]);

  // أفعال
  const setInput = (v) => {
    dispatch({ type: SET_INPUT, payload: v });
  };

  const loadCityOptions = async (q) => {
    try {
      const opts = await searchCities(q);
      dispatch({ type: SET_OPTIONS, payload: opts });
    } catch (e) {
      dispatch({ type: SET_ERROR, payload: "Failed to search cities" });
    }
  };

  const selectCity = (city) => {
    dispatch({
      type: SET_SELECTED,
      payload: { name: city.name, lat: city.lat, lon: city.lon },
    });
    dispatch({ type: SET_INPUT, payload: "" });
    dispatch({ type: SET_OPTIONS, payload: [] });
    fetchWeather(city);
  };

  const fetchWeather = async (cityObj) => {
    dispatch({ type: SET_LOADING, payload: true });
    dispatch({ type: SET_ERROR, payload: null });
    try {
      const w = await getWeatherByCoords({
        lat: cityObj.lat,
        lon: cityObj.lon,
        lang: langForAPI,
      });
      dispatch({
        type: SET_WEATHER,
        payload: {
          cityName: cityObj.name,
          lat: cityObj.lat,
          lon: cityObj.lon,
          ...w,
        },
      });
    } catch (e) {
      dispatch({ type: SET_ERROR, payload: "Failed to fetch weather data" });
    } finally {
      dispatch({ type: SET_LOADING, payload: false });
    }
  };

  const changeLanguage = (code) => {
    i18n.changeLanguage(code);
  };

  // مؤقت للوقت الحالي
  useEffect(() => {
    moment.locale(
      i18n.language === "ar" ? "ar" : i18n.language === "es" ? "es" : "en"
    );
    const timer = setInterval(() => {
      dispatch({ type: TICK_NOW, payload: moment() });
    }, 60_000);
    return () => clearInterval(timer);
  }, [i18n.language]);

  // جلب أولي
  useEffect(() => {
    fetchWeather(state.selected);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // إعادة الجلب عند تغيير اللغة
  useEffect(() => {
    if (state.selected) fetchWeather(state.selected);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [langForAPI]);

  // قيمة السياق — مُذكّرة لتقليل الـ re-renders
  const value = useMemo(
    () => ({
      ...state,
      isRTL,
      langForAPI,
      formatDateTime,
      setInput,
      loadCityOptions,
      selectCity,
      changeLanguage,
    }),
    [state, isRTL, langForAPI, formatDateTime]
  );

  return (
    <WeatherContext.Provider value={value}>{children}</WeatherContext.Provider>
  );
}

export const useWeatherContext = () => useContext(WeatherContext);
