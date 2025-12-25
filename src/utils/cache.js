const KEY = 'weather_cache_v1';

function now() { return Date.now(); }

function readAll() {
  try {
    return JSON.parse(localStorage.getItem(KEY)) || {};
  } catch {
    return {};
  }
}

function writeAll(data) {
  try {
    localStorage.setItem(KEY, JSON.stringify(data));
  } catch {}
}

export function cacheGet(key) {
  const all = readAll();
  const entry = all[key];
  if (!entry) return null;
  if (entry.expire && entry.expire < now()) return null;
  return entry.value;
}

export function cacheSet(key, value, ttlMs = 5 * 60 * 1000) {
  const all = readAll();
  all[key] = { value, expire: now() + ttlMs };
  writeAll(all);
}
