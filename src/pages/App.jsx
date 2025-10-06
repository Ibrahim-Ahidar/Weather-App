// src/pages/App.jsx
import LanguageSwitcher from "../components/LanguageSwitcher";
import CitySearch from "../components/CitySearch";
import WeatherHeader from "../components/WeatherHeader";
import WeatherDetails from "../components/WeatherDetails";
import Loader from "../components/Loader";
import ErrorMessage from "../components/ErrorMessage";
import useWeather from "../hooks/useWeather";

export default function App() {
  const { isRTL, loading, error } = useWeather();

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#fafafa",
        padding: "60px 20px",
        direction: isRTL ? "rtl" : "ltr",
        fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
      }}
    >
      <div style={{ maxWidth: 700, margin: "0 auto" }}>
        <LanguageSwitcher />

        <div
          style={{
            backgroundColor: "white",
            border: "1px solid #e5e5e5",
            padding: 48,
            transition: "box-shadow 0.3s ease",
          }}
          onMouseEnter={(e) =>
            (e.currentTarget.style.boxShadow = "0 2px 8px rgba(0,0,0,0.06)")
          }
          onMouseLeave={(e) => (e.currentTarget.style.boxShadow = "none")}
        >
          <WeatherHeader />
          <CitySearch />

          {loading ? (
            <Loader />
          ) : error ? (
            <ErrorMessage message={error} />
          ) : (
            <WeatherDetails />
          )}
        </div>
      </div>
    </div>
  );
}
