import React from 'react';

export default function HistoryList({ history, onPick }) {
  if (!history?.length) return null;
  return (
    <div className="flex flex-wrap gap-2">
      {history.map((h) => (
        <button
          key={h}
          onClick={() => onPick(h)}
          className="px-3 py-1 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700"
          aria-label={`Search ${h}`}
        >
          {h}
        </button>
      ))}
    </div>
  );
}
