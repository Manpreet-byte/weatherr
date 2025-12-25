import React, { useEffect, Suspense, lazy } from 'react';
import SearchBar from '../components/SearchBar.jsx';
import WeatherCard from '../components/WeatherCard.jsx';
import ForecastList from '../components/ForecastList.jsx';
const TemperatureChart = lazy(() => import('../components/TemperatureChart.jsx'));
import HistoryList from '../components/HistoryList.jsx';
import { SkeletonCard, SkeletonGrid, SkeletonChart } from '../components/Skeleton.jsx';
import { useDebounce } from '../hooks/useDebounce.js';
import { useLocalStorage } from '../hooks/useLocalStorage.js';
import { useWeather } from '../hooks/useWeather.js';
import Favorites from '../components/Favorites.jsx';
import AirQualityCard from '../components/AirQualityCard.jsx';
import { useTheme } from '../hooks/useTheme.js';
import Layout from '../components/Layout.jsx';
import Header from '../components/Header.jsx';
import StatGrid from '../components/StatGrid.jsx';

export default function Home() {
  const [units, setUnits] = useLocalStorage('units', 'metric');
  const [history, setHistory] = useLocalStorage('history', []);
  const [favorites, setFavorites] = useLocalStorage('favorites', []);
  const [city, setCity] = useLocalStorage('city', '');
  const [coords, setCoords] = React.useState(null);
  const debouncedCity = useDebounce(city, 500);
  const { theme, setTheme } = useTheme();

  const { current, forecast, hourly, loading, error, air } = useWeather({ city: debouncedCity, coords, units });

  useEffect(() => {
    // Try to auto-detect location
    if (!city && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => setCoords({ lat: pos.coords.latitude, lon: pos.coords.longitude }),
        () => {},
        { maximumAge: 600000, timeout: 5000 }
      );
    }
  }, []);

  useEffect(() => {
    // Save city to history
    if (debouncedCity && !history.includes(debouncedCity)) {
      const next = [debouncedCity, ...history].slice(0, 5);
      setHistory(next);
    }
  }, [debouncedCity]);

  function handleSearch(newCity) {
    if (typeof newCity === 'string') {
      setCoords(null);
      setCity(newCity);
    } else if (newCity && newCity.lat && newCity.lon) {
      setCity(newCity.name);
      setCoords({ lat: newCity.lat, lon: newCity.lon });
    }
  }

  function handlePickHistory(h) {
    setCity(h);
    setCoords(null);
  }

  return (
    <Layout>
      <Header
        title="Weather App Pro"
        units={units}
        onUnitToggle={() => setUnits(units === 'metric' ? 'imperial' : 'metric')}
        theme={theme}
        onThemeChange={setTheme}
        right={(
          <div className="mt-4">
            <SearchBar onSearch={handleSearch} />
            <div className="mt-2 flex items-center justify-between">
              <HistoryList history={history} onPick={handlePickHistory} />
              {history.length > 0 && (
                <button className="text-sm text-red-600 hover:underline" onClick={() => setHistory([])} aria-label="Clear history">Clear history</button>
              )}
            </div>
          </div>
        )}
      />

      {error && (
        <div role="alert" className="p-3 rounded bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100 mb-4">
          {error.message || 'Something went wrong fetching weather.'}
        </div>
      )}

      <main className="grid gap-4 grid-cols-1">
        {loading ? <SkeletonCard /> : (
          <WeatherCard data={current} units={units} onFavorite={(f) => {
            const exists = favorites.find((x) => x.lat === f.lat && x.lon === f.lon);
            if (!exists) setFavorites([f, ...favorites].slice(0, 10));
          }} />
        )}

        {loading ? <SkeletonGrid /> : (!loading && current ? <StatGrid current={current} units={units} /> : null)}

        {!loading && forecast?.length ? (
          <ForecastList days={forecast} units={units} />
        ) : null}

        <Suspense fallback={<SkeletonChart />}>
          {!loading && hourly?.length ? (
            <TemperatureChart data={hourly} units={units} />
          ) : null}
        </Suspense>

        {!loading && air ? (
          <AirQualityCard air={air} />
        ) : null}

        <Favorites
          favorites={favorites}
          onPick={(f) => { setCity(f.name); setCoords({ lat: f.lat, lon: f.lon }); }}
          onRemove={(f) => setFavorites(favorites.filter((x) => !(x.lat === f.lat && x.lon === f.lon)))}
        />
      </main>

      <footer className="mt-8 text-center text-xs text-gray-500 dark:text-gray-400">
        Data by OpenWeatherMap
      </footer>
    </Layout>
  );
}
