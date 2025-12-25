import React, { memo } from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

function TemperatureChart({ data, units }) {
  if (!data?.length) return null;
  return (
    <div className="card">
      <div className="mb-2 font-semibold">Hourly temperature</div>
      <ResponsiveContainer width="100%" height={260}>
        <LineChart data={data}>
          <XAxis dataKey="time" tick={{ fill: '#6b7280' }} axisLine={{ stroke: '#e5e7eb' }} tickLine={{ stroke: '#e5e7eb' }} />
          <YAxis tickFormatter={(v) => `${v}${units === 'imperial' ? '°F' : '°C'}`} tick={{ fill: '#6b7280' }} axisLine={{ stroke: '#e5e7eb' }} tickLine={{ stroke: '#e5e7eb' }} />
          <Tooltip contentStyle={{ backgroundColor: 'rgba(17,24,39,0.9)', border: 'none', borderRadius: 8, color: '#fff' }} formatter={(v) => `${v}${units === 'imperial' ? '°F' : '°C'}`} />
          <Line type="monotone" dataKey="temp" stroke="#2563eb" strokeWidth={3} dot={false} activeDot={{ r: 6 }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default memo(TemperatureChart);
