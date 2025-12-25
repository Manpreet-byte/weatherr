import React from 'react';

export default function Favorites({ favorites, onPick, onRemove }) {
  if (!favorites?.length) return null;
  return (
    <div className="p-4 rounded-lg bg-white dark:bg-gray-800 shadow">
      <div className="font-semibold mb-2">Favorites</div>
      <div className="flex flex-wrap gap-2">
        {favorites.map((f) => (
          <div key={`${f.name}-${f.lat}-${f.lon}`} className="flex items-center gap-2 px-3 py-1 rounded-full bg-gray-100 dark:bg-gray-700">
            <button onClick={() => onPick(f)} className="text-sm hover:underline" aria-label={`Select ${f.name}`}>{f.name}</button>
            <button onClick={() => onRemove(f)} className="text-red-500 hover:text-red-600" aria-label={`Remove ${f.name}`}>×</button>
          </div>
        ))}
      </div>
    </div>
  );
}
