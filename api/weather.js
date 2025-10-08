export default async function handler(req, res) {
  try {
    const { lat, lon, lang = "en" } = (req.query || {});
    if (!lat || !lon) {
      return res.status(400).json({ error: "lat/lon required" });
    }

    const url = new URL("https://api.openweathermap.org/data/2.5/weather");
    url.searchParams.set("lat", lat);
    url.searchParams.set("lon", lon);
    url.searchParams.set("units", "metric");
    url.searchParams.set("lang", lang);
    url.searchParams.set("appid", process.env.OPENWEATHER_API_KEY);

    const r = await fetch(url);
    if (!r.ok) throw new Error(`Upstream error: ${r.status}`);
    const data = await r.json();

    const payload = {
      temperature: Math.round(data.main.temp),
      description: data.weather?.[0]?.description ?? "",
      minTemp: Math.round(data.main.temp_min),
      maxTemp: Math.round(data.main.temp_max),
      humidity: data.main.humidity,
      windSpeed: Math.round((data.wind?.speed || 0) * 3.6),
      icon: data.weather?.[0]?.icon ?? "01d",
    };

    res.status(200).json(payload);
  } catch (e) {
    res.status(500).json({ error: "Failed to fetch weather data" });
  }
}

