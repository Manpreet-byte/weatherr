import React from 'react';
import { formatDate } from '../utils/format.js';

export default function ForecastList({ days, units }) {
  if (!days?.length) return null;
  return (
    <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
      {days.map((d) => (
        <div key={d.date} className="glass rounded-xl p-4 text-center">
          <div className="text-xs text-gray-500 dark:text-gray-400">{formatDate(d.date)}</div>
          <img src={`https://openweathermap.org/img/wn/${d.icon}.png`} alt="weather icon" className="mx-auto my-2" />
          <div className="text-lg font-semibold">
            <span className="text-gray-900 dark:text-gray-100">{d.max}</span>
            <span className="mx-1 text-gray-500">/</span>
            <span className="text-gray-600 dark:text-gray-300">{d.min}</span>
            {units === 'imperial' ? '°F' : '°C'}
          </div>
        </div>
      ))}
    </div>
  );
}
