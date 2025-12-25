import React from 'react';
import { FiDroplet, FiWind, FiEye, FiTrendingDown } from 'react-icons/fi';

function Stat({ icon: Icon, label, value, unit }) {
  return (
    <div className="card">
      <div className="flex items-center gap-3">
        <div className="p-2 rounded-lg bg-blue-50 dark:bg-blue-900/30">
          <Icon className="text-brand-600" />
        </div>
        <div>
          <div className="text-xs text-gray-500 dark:text-gray-400">{label}</div>
          <div className="text-lg font-semibold">{value}{unit}</div>
        </div>
      </div>
    </div>
  );
}

export default function StatGrid({ current, units }) {
  if (!current) return null;
  const { main, wind, visibility } = current;
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
      <Stat icon={FiDroplet} label="Humidity" value={main.humidity} unit="%" />
      <Stat icon={FiTrendingDown} label="Pressure" value={main.pressure} unit=" hPa" />
      <Stat icon={FiEye} label="Visibility" value={Math.round((visibility || 0) / 1000)} unit=" km" />
      <Stat icon={FiWind} label="Wind" value={Math.round(wind.speed)} unit={units === 'imperial' ? ' mph' : ' m/s'} />
    </div>
  );
}
