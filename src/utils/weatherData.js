export function groupDailyFromForecast(list) {
  const byDate = {};
  list.forEach((item) => {
    const date = item.dt_txt.split(' ')[0];
    if (!byDate[date]) byDate[date] = [];
    byDate[date].push(item);
  });
  const days = Object.keys(byDate).map((date) => {
    const items = byDate[date];
    let min = Infinity, max = -Infinity;
    let icon = items[Math.floor(items.length / 2)].weather[0].icon;
    items.forEach((i) => {
      min = Math.min(min, i.main.temp_min);
      max = Math.max(max, i.main.temp_max);
    });
    return { date, min: Math.round(min), max: Math.round(max), icon };
  });
  return days.slice(0, 5);
}

export function next24Hours(list) {
  return list.slice(0, 8).map((i) => ({
    time: i.dt_txt.split(' ')[1].slice(0,5),
    temp: Math.round(i.main.temp),
  }));
}
