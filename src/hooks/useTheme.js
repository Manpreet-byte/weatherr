import { useEffect, useState } from 'react';
import { useLocalStorage } from './useLocalStorage.js';

export function useTheme() {
  const [storedTheme, setStoredTheme] = useLocalStorage('theme', 'system');
  const [theme, setTheme] = useState(storedTheme);

  useEffect(() => {
    const root = document.documentElement;
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    const effectiveTheme = theme === 'system' ? (prefersDark ? 'dark' : 'light') : theme;
    if (effectiveTheme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    setStoredTheme(theme);
  }, [theme]);

  return { theme, setTheme };
}
