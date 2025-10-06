// src/context/weatherReducer.js
import {
  SET_INPUT,
  SET_OPTIONS,
  SET_SELECTED,
  SET_WEATHER,
  SET_LOADING,
  SET_ERROR,
  TICK_NOW,
} from "./weatherTypes";

export function weatherReducer(state, action) {
  switch (action.type) {
    case SET_INPUT:
      return { ...state, cityInput: action.payload };
    case SET_OPTIONS:
      return { ...state, cityOptions: action.payload };
    case SET_SELECTED:
      return { ...state, selected: action.payload };
    case SET_WEATHER:
      return { ...state, weather: action.payload };
    case SET_LOADING:
      return { ...state, loading: action.payload };
    case SET_ERROR:
      return { ...state, error: action.payload };
    case TICK_NOW:
      return { ...state, now: action.payload };
    default:
      return state;
  }
}
