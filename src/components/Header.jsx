import React from 'react';
import UnitToggle from './UnitToggle.jsx';
import ThemeToggle from './ThemeToggle.jsx';

export default function Header({ title, units, onUnitToggle, theme, onThemeChange, right }) {
  return (
    <header className="glass rounded-2xl p-4 mb-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">
          <span className="bg-gradient-to-r from-brand-600 to-brand-500 bg-clip-text text-transparent">{title}</span>
        </h1>
        <div className="flex items-center gap-2">
          <UnitToggle units={units} onToggle={onUnitToggle} />
          <ThemeToggle theme={theme} onChange={onThemeChange} />
        </div>
      </div>
      {right}
    </header>
  );
}
