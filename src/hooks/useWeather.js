import { useEffect, useMemo, useState } from 'react';
import { getCurrentByCity, getForecastByCity, getCurrentByCoords, getForecastByCoords, getAirQuality } from '../services/api.js';
import { groupDailyFromForecast, next24Hours } from '../utils/weatherData.js';
import { cacheGet, cacheSet } from '../utils/cache.js';

export function useWeather({ city, coords, units }) {
  const [current, setCurrent] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [hourly, setHourly] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [air, setAir] = useState(null);

  useEffect(() => {
    const controller = new AbortController();
    async function fetchData() {
      try {
        setLoading(true);
        setError(null);
        let currentData, forecastData;
        if (coords && coords.lat && coords.lon) {
          const k1 = `current:${coords.lat}:${coords.lon}:${units}`;
          const k2 = `forecast:${coords.lat}:${coords.lon}:${units}`;
          currentData = cacheGet(k1) || await getCurrentByCoords(coords.lat, coords.lon, units, controller.signal);
          forecastData = cacheGet(k2) || await getForecastByCoords(coords.lat, coords.lon, units, controller.signal);
          cacheSet(k1, currentData);
          cacheSet(k2, forecastData);
        } else if (city && city.trim()) {
          const k1 = `current:${city}:${units}`;
          const k2 = `forecast:${city}:${units}`;
          currentData = cacheGet(k1) || await getCurrentByCity(city, units, controller.signal);
          forecastData = cacheGet(k2) || await getForecastByCity(city, units, controller.signal);
          cacheSet(k1, currentData);
          cacheSet(k2, forecastData);
        } else {
          setLoading(false);
          return;
        }
        setCurrent(currentData);
        const daily = groupDailyFromForecast(forecastData.list);
        setForecast(daily);
        setHourly(next24Hours(forecastData.list));

        const loc = coords && coords.lat && coords.lon ? coords : currentData?.coord;
        if (loc?.lat && loc?.lon) {
          const k3 = `air:${loc.lat}:${loc.lon}`;
          const airData = cacheGet(k3) || await getAirQuality(loc.lat, loc.lon, controller.signal);
          if (airData) {
            setAir(airData);
            cacheSet(k3, airData);
          }
        }
      } catch (err) {
        if (err.name !== 'CanceledError') {
          setError(err);
        }
      } finally {
        setLoading(false);
      }
    }
    fetchData();
    return () => controller.abort();
  }, [city, coords?.lat, coords?.lon, units]);

  const memo = useMemo(() => ({ current, forecast, hourly, air }), [current, forecast, hourly, air]);

  return { ...memo, loading, error };
}
