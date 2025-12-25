# Weather App Pro

A responsive weather application built with Vite + React (JavaScript), Tailwind CSS, Axios, OpenWeatherMap API, and Recharts.

## Features
- Search by city name
- Current weather: temperature, feels like, condition & icon, humidity, wind
- 5-day forecast (daily trends)
- Hourly temperature chart
- Unit toggle (°C/°F)
- Recent search history
- Loading & error states
- Responsive UI, mobile-first
- Dark / light mode toggle
- Auto-detect user location (optional)
- Saves last searched city in localStorage
- Skeleton loaders
 - City autocomplete (Geocoding API)
 - Favorites: save/remove cities
 - Air Quality (AQI + pollutants)
 - Caching to reduce API calls

## Quickstart

1. Clone or open this folder in VS Code.
2. Create an `.env` file:

```
cp .env.example .env
# Edit .env and set VITE_OPENWEATHER_API_KEY
```

3. Install dependencies:

```bash
npm install
```

4. Run the dev server:

```bash
npm run dev
```

5. Build for production:

```bash
npm run build
npm run preview
```

## Deployment
- Vercel or Netlify: build command `npm run build`, output directory `dist`.
- Ensure `VITE_OPENWEATHER_API_KEY` is set in project environment variables.

## Tech Stack
- Vite + React (JS)
- Tailwind CSS
- Axios
- OpenWeatherMap API
- Recharts
 - OpenWeather Geocoding + Air Pollution APIs

## Environment Variables
- `VITE_OPENWEATHER_API_KEY`: Your OpenWeatherMap API key.

## Resume-Ready Description
Weather App Pro – Built a responsive weather application using Vite + React featuring real-time data, 5-day forecasts, interactive charts, dark mode, and performance-optimized UI.
Now includes geocoded autocomplete, favorites, air quality insights, and request caching for improved UX and performance.
