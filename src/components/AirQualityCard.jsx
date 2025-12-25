import React from 'react';

function aqiLabel(aqi) {
  switch (aqi) {
    case 1: return 'Good';
    case 2: return 'Fair';
    case 3: return 'Moderate';
    case 4: return 'Poor';
    case 5: return 'Very Poor';
    default: return 'Unknown';
  }
}

export default function AirQualityCard({ air }) {
  if (!air) return null;
  const { aqi, components } = air;
  return (
    <div className="p-4 rounded-lg bg-white dark:bg-gray-800 shadow">
      <div className="font-semibold mb-2">Air Quality</div>
      <div className="flex items-center gap-2 mb-3">
        <span className="text-lg font-bold">AQI {aqi}</span>
        <span className="text-sm">{aqiLabel(aqi)}</span>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-sm">
        <div className="p-2 rounded bg-gray-50 dark:bg-gray-700">PM2.5: {components.pm2_5} μg/m³</div>
        <div className="p-2 rounded bg-gray-50 dark:bg-gray-700">PM10: {components.pm10} μg/m³</div>
        <div className="p-2 rounded bg-gray-50 dark:bg-gray-700">O₃: {components.o3} μg/m³</div>
        <div className="p-2 rounded bg-gray-50 dark:bg-gray-700">NO₂: {components.no2} μg/m³</div>
        <div className="p-2 rounded bg-gray-50 dark:bg-gray-700">SO₂: {components.so2} μg/m³</div>
        <div className="p-2 rounded bg-gray-50 dark:bg-gray-700">CO: {components.co} μg/m³</div>
      </div>
    </div>
  );
}
