import React, { memo } from 'react';
import { unitSymbol } from '../utils/units.js';

function WeatherCard({ data, units, onFavorite }) {
  if (!data) return null;
  const { name, sys, weather, main, wind } = data;
  const icon = weather[0].icon;
  return (
    <div className="p-4 rounded-lg bg-white dark:bg-gray-800 shadow flex items-center gap-4">
      <img src={`https://openweathermap.org/img/wn/${icon}@2x.png`} alt={weather[0].description} className="w-20 h-20" />
      <div>
        <div className="text-xl font-semibold">{name}, {sys.country}</div>
        <div className="text-3xl font-bold">{Math.round(main.temp)}{unitSymbol(units)}</div>
        <div className="text-sm">Feels like {Math.round(main.feels_like)}{unitSymbol(units)} • {weather[0].main}</div>
        <div className="text-sm">Humidity {main.humidity}% • Wind {Math.round(wind.speed)} {units === 'imperial' ? 'mph' : 'm/s'}</div>
        <div className="text-xs mt-1">Pressure {main.pressure} hPa • Visibility {Math.round((data.visibility || 0) / 1000)} km • Clouds {data.clouds?.all ?? 0}%</div>
        <div className="text-xs mt-1">Sunrise {new Date(sys.sunrise * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} • Sunset {new Date(sys.sunset * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</div>
        {onFavorite && (
          <button onClick={() => onFavorite({ name: `${name}, ${sys.country}`, lat: data.coord.lat, lon: data.coord.lon })} className="mt-3 px-3 py-1 rounded bg-yellow-400 text-black hover:bg-yellow-500" aria-label="Add to favorites">★ Add to favorites</button>
        )}
      </div>
    </div>
  );
}

export default memo(WeatherCard);
