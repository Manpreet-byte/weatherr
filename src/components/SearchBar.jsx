import React, { useState, useEffect } from 'react';
import { useDebounce } from '../hooks/useDebounce.js';
import { getCitySuggestions } from '../services/geocoding.js';

export default function SearchBar({ onSearch }) {
  const [value, setValue] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [open, setOpen] = useState(false);
  const debounced = useDebounce(value, 400);

  useEffect(() => {
    const controller = new AbortController();
    async function load() {
      if (debounced.trim().length < 2) {
        setSuggestions([]);
        setOpen(false);
        return;
      }
      try {
        const list = await getCitySuggestions(debounced, 5, controller.signal);
        setSuggestions(list);
        setOpen(true);
      } catch {
        setSuggestions([]);
        setOpen(false);
      }
    }
    load();
    return () => controller.abort();
  }, [debounced]);

  return (
    <div className="w-full relative">
      <label htmlFor="city" className="sr-only">Search city</label>
      <input
        id="city"
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Search city..."
        className="w-full px-4 py-3 rounded-md bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        aria-label="Search city"
      />
      {open && suggestions.length > 0 && (
        <ul className="absolute z-10 mt-1 w-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md shadow max-h-64 overflow-auto">
          {suggestions.map((s) => (
            <li key={`${s.name}-${s.lat}-${s.lon}`} className="px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer" onClick={() => { onSearch(s); setOpen(false); }}>
              {s.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
