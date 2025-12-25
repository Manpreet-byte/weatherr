import axios from 'axios';

const apiKey = import.meta.env.VITE_OPENWEATHER_API_KEY;
const baseURL = 'https://api.openweathermap.org/data/2.5';

const client = axios.create({
  baseURL,
  timeout: 10000,
});

export async function getCurrentByCity(city, units = 'metric', signal) {
  if (!apiKey) throw new Error('Missing OpenWeather API key');
  const { data } = await client.get('/weather', {
    params: { q: city, units, appid: apiKey },
    signal,
  });
  return data;
}

export async function getForecastByCity(city, units = 'metric', signal) {
  if (!apiKey) throw new Error('Missing OpenWeather API key');
  const { data } = await client.get('/forecast', {
    params: { q: city, units, appid: apiKey },
    signal,
  });
  return data;
}

export async function getCurrentByCoords(lat, lon, units = 'metric', signal) {
  if (!apiKey) throw new Error('Missing OpenWeather API key');
  const { data } = await client.get('/weather', {
    params: { lat, lon, units, appid: apiKey },
    signal,
  });
  return data;
}

export async function getForecastByCoords(lat, lon, units = 'metric', signal) {
  if (!apiKey) throw new Error('Missing OpenWeather API key');
  const { data } = await client.get('/forecast', {
    params: { lat, lon, units, appid: apiKey },
    signal,
  });
  return data;
}

export async function getAirQuality(lat, lon, signal) {
  if (!apiKey) throw new Error('Missing OpenWeather API key');
  const url = `https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${apiKey}`;
  const res = await fetch(url, { signal });
  if (!res.ok) throw new Error('Failed to fetch air quality');
  const data = await res.json();
  const a = data.list?.[0];
  if (!a) return null;
  return { aqi: a.main.aqi, components: a.components };
}
