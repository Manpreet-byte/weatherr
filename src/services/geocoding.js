const apiKey = import.meta.env.VITE_OPENWEATHER_API_KEY;
const baseURL = 'https://api.openweathermap.org/geo/1.0';

export async function getCitySuggestions(query, limit = 5, signal) {
  if (!apiKey) throw new Error('Missing OpenWeather API key');
  const url = `${baseURL}/direct?q=${encodeURIComponent(query)}&limit=${limit}&appid=${apiKey}`;
  const res = await fetch(url, { signal });
  if (!res.ok) throw new Error('Failed to fetch suggestions');
  const data = await res.json();
  return data.map((c) => ({
    name: `${c.name}${c.state ? ', ' + c.state : ''}, ${c.country}`,
    lat: c.lat,
    lon: c.lon,
  }));
}
