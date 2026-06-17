import type { OWMCurrentWeather, OWMForecast, OWMForecastItem } from '@/types/api';
import type { WeatherData, WeatherCondition, HourlyItem, DailyItem } from '@/types/weather';
import { getConditionLabel } from '@/utils/weatherHelpers';

export function mapCondition(id: number): WeatherCondition {
  if (id >= 200 && id < 300) return 'thunderstorm';
  if (id >= 300 && id < 400) return 'drizzle';
  if (id >= 500 && id < 510) return 'rainy';
  if (id === 511)             return 'snowy';
  if (id >= 520 && id < 600) return 'rainy';
  if (id >= 600 && id < 700) return 'snowy';
  if (id === 701 || id === 741) return 'foggy';
  if (id === 711 || id === 721 || id === 731 ||
      id === 751 || id === 761 || id === 762) return 'hazy';
  if (id === 771 || id === 781) return 'windy';
  if (id === 800)               return 'sunny';
  if (id === 801 || id === 802) return 'partly-cloudy';
  if (id >= 803)                return 'cloudy';
  return 'sunny';
}

export function mapWindDir(deg: number): string {
  const dirs = ['N','NNE','NE','ENE','E','ESE','SE','SSE',
                 'S','SSW','SW','WSW','W','WNW','NW','NNW'];
  return dirs[Math.round(deg / 22.5) % 16];
}

function fmtTime(unix: number, offset: number): string {
  const d    = new Date((unix + offset) * 1000);
  const h    = d.getUTCHours();
  const m    = d.getUTCMinutes();
  const ampm = h >= 12 ? 'PM' : 'AM';
  return `${h % 12 === 0 ? 12 : h % 12}:${String(m).padStart(2, '0')} ${ampm}`;
}

function fmtHourLabel(unix: number, offset: number): string {
  const d = new Date((unix + offset) * 1000);
  const h = d.getUTCHours();
  return `${h % 12 === 0 ? 12 : h % 12} ${h >= 12 ? 'PM' : 'AM'}`;
}

const DAYS   = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
const MONTHS = ['Jan','Feb','Mar','Apr','May','Jun',
                 'Jul','Aug','Sep','Oct','Nov','Dec'];

function fmtDay(unix: number, offset: number): string {
  const d = new Date((unix + offset) * 1000);
  return DAYS[d.getUTCDay()];
}

function fmtDate(unix: number, offset: number): string {
  const d = new Date((unix + offset) * 1000);
  return `${MONTHS[d.getUTCMonth()]} ${d.getUTCDate()}`;
}

function calcDewPoint(tempC: number, humidity: number): number {
  const a = 17.27, b = 237.7;
  const alpha = (a * tempC) / (b + tempC) + Math.log(humidity / 100);
  return Math.round((b * alpha) / (a - alpha));
}

export interface ForecastOnly { hourly: HourlyItem[]; daily: DailyItem[]; }

export function buildForecastOnly(raw: OWMForecast): ForecastOnly {
  const offset = raw.city.timezone;
  return {
    hourly: raw.list.slice(0, 12).map((item) => ({
      time:      fmtHourLabel(item.dt, offset),
      temp:      Math.round(item.main.temp),
      condition: mapCondition(item.weather[0]?.id ?? 800),
      isNight:   item.sys.pod === 'n',
    })),
    daily: buildDailyForecast(raw.list, offset),
  };
}

function buildDailyForecast(list: OWMForecastItem[], offset: number): DailyItem[] {
  const groups = new Map<string, OWMForecastItem[]>();
  for (const item of list) {
    const d   = new Date((item.dt + offset) * 1000);
    const key = `${d.getUTCFullYear()}-${d.getUTCMonth()}-${d.getUTCDate()}`;
    if (!groups.has(key)) groups.set(key, []);
    groups.get(key)!.push(item);
  }
  return Array.from(groups.entries()).slice(0, 7).map(([, items], idx) => {
    const mid       = items[Math.floor(items.length / 2)];
    const condition = mapCondition(mid.weather[0]?.id ?? 800);
    return {
      day:      idx === 0 ? 'Today' : fmtDay(mid.dt, offset),
      date:     fmtDate(mid.dt, offset),
      minTemp:  Math.round(Math.min(...items.map((i) => i.main.temp_min))),
      maxTemp:  Math.round(Math.max(...items.map((i) => i.main.temp_max))),
      condition,
      label:    getConditionLabel(condition),
    };
  });
}

export function mapCurrentWeather(
  raw:      OWMCurrentWeather,
  state:    string,
  region:   string,
  forecast?: OWMForecast,
): WeatherData {
  const offset    = raw.timezone;
  const condition = mapCondition(raw.weather[0]?.id ?? 800);

  // true when current timestamp is outside sunrise..sunset window
  const isNight   = raw.dt < raw.sys.sunrise || raw.dt > raw.sys.sunset;

  const precipitation =
    (raw.rain?.['1h'] ?? raw.rain?.['3h'] ?? 0) +
    (raw.snow?.['1h'] ?? raw.snow?.['3h'] ?? 0);

  const hourly: HourlyItem[] = forecast
    ? forecast.list.slice(0, 12).map((item) => ({
        time:      fmtHourLabel(item.dt, offset),
        temp:      Math.round(item.main.temp),
        condition: mapCondition(item.weather[0]?.id ?? 800),
        isNight:   item.sys.pod === 'n',   // 'n' = night, 'd' = day
      }))
    : [];

  const daily: DailyItem[] = forecast
    ? buildDailyForecast(forecast.list, offset)
    : [];

  return {
    city:           raw.name,
    state,
    country:        raw.sys.country,
    region,
    temperature:    Math.round(raw.main.temp),
    feelsLike:      Math.round(raw.main.feels_like),
    minTemp:        Math.round(raw.main.temp_min),
    maxTemp:        Math.round(raw.main.temp_max),
    unit:           '°C',
    condition,
    conditionLabel: getConditionLabel(condition),
    isNight,
    humidity:       raw.main.humidity,
    windSpeed:      Math.round(raw.wind.speed * 3.6),
    windDirection:  mapWindDir(raw.wind.deg),
    visibility:     Math.round((raw.visibility ?? 10000) / 1000),
    pressure:       raw.main.pressure,
    uvIndex:        0,
    dewPoint:       calcDewPoint(raw.main.temp, raw.main.humidity),
    precipitation:  parseFloat(precipitation.toFixed(1)),
    sunrise:        fmtTime(raw.sys.sunrise, offset),
    sunset:         fmtTime(raw.sys.sunset,  offset),
    hourly,
    daily,
    lastUpdated:    new Date().toLocaleTimeString('en-US', {
      hour: '2-digit', minute: '2-digit',
    }),
  };
}