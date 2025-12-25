import React from 'react';

export default function UnitToggle({ units, onToggle }) {
  return (
    <button
      onClick={onToggle}
      className="px-3 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700"
      aria-label="Toggle temperature unit"
    >
      {units === 'metric' ? '°C' : '°F'}
    </button>
  );
}
