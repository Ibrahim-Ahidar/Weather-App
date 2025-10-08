export default async function handler(req, res) {
  try {
    const { lat, lon, limit = "1" } = req.query || {};
    if (!lat || !lon) return res.status(400).json({ error: "lat/lon required" });

    const url = new URL("https://api.openweathermap.org/geo/1.0/reverse");
    url.searchParams.set("lat", lat);
    url.searchParams.set("lon", lon);
    url.searchParams.set("limit", limit);
    url.searchParams.set("appid", process.env.OPENWEATHER_API_KEY);

    const r = await fetch(url);
    if (!r.ok) throw new Error(`Upstream error: ${r.status}`);
    const data = await r.json();

    const first = Array.isArray(data) && data[0] ? data[0] : null;
    const city = first
      ? {
          label: `${first.name}${first.country ? ", " + first.country : ""}`,
          name: first.name,
          lat: first.lat,
          lon: first.lon,
          country: first.country,
        }
      : null;

    res.status(200).json({ city });
  } catch (e) {
    res.status(500).json({ error: "Failed to reverse geocode" });
  }
}

