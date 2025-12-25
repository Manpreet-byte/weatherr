import React from 'react';

export default function ThemeToggle({ theme, onChange }) {
  const next = theme === 'dark' ? 'light' : theme === 'light' ? 'system' : 'dark';
  const label = `Theme: ${theme}`;
  return (
    <button
      onClick={() => onChange(next)}
      className="px-3 py-2 rounded-md bg-gray-200 dark:bg-gray-700"
      aria-label={label}
      title={label}
    >
      {label}
    </button>
  );
}
