export default async function handler(req, res) {
  try {
    const { q = "", limit = "5" } = (req.query || {});
    if (!q || q.length < 2) return res.status(200).json([]);

    const url = new URL("https://api.openweathermap.org/geo/1.0/direct");
    url.searchParams.set("q", q);
    url.searchParams.set("limit", limit);
    url.searchParams.set("appid", process.env.OPENWEATHER_API_KEY);

    const r = await fetch(url);
    if (!r.ok) throw new Error(`Upstream error: ${r.status}`);
    const data = await r.json();

    const mapped = (data || []).map((c) => ({
      label: `${c.name}, ${c.country}`,
      name: c.name,
      lat: c.lat,
      lon: c.lon,
      country: c.country,
    }));

    res.status(200).json(mapped);
  } catch (e) {
    res.status(500).json({ error: "Failed to search cities" });
  }
}

