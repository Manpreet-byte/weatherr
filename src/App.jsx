import React from 'react';
import Home from './pages/Home.jsx';
import { useTheme } from './hooks/useTheme.js';

export default function App() {
  // Initialize theme on app load to set dark/light class.
  useTheme();
  return <Home />;
}
