import type { WeatherCondition } from '@/types/weather';

export function getWeatherBg(condition: WeatherCondition | undefined): string {
  switch (condition) {
    case 'sunny':         return 'bg-weather-sunny';
    case 'partly-cloudy': return 'bg-weather-cloudy';
    case 'cloudy':        return 'bg-weather-cloudy';
    case 'drizzle':       return 'bg-weather-rainy';
    case 'rainy':         return 'bg-weather-rainy';
    case 'thunderstorm':  return 'bg-weather-thunder';
    case 'snowy':         return 'bg-weather-snowy';
    case 'foggy':         return 'bg-weather-foggy';
    case 'windy':         return 'bg-weather-windy';
    case 'hazy':          return 'bg-weather-hazy';
    default:              return 'bg-weather-default';
  }
}

export function getConditionLabel(condition: WeatherCondition): string {
  const map: Record<WeatherCondition, string> = {
    'sunny':         'Sunny & Clear',
    'partly-cloudy': 'Partly Cloudy',
    'cloudy':        'Overcast',
    'drizzle':       'Light Drizzle',
    'rainy':         'Rainy',
    'thunderstorm':  'Thunderstorm',
    'snowy':         'Snow',
    'foggy':         'Foggy',
    'windy':         'Windy',
    'hazy':          'Hazy',
  };
  return map[condition] ?? 'Unknown';
}

export function getConditionColor(condition: WeatherCondition): string {
  switch (condition) {
    case 'sunny':         return '#facc15';
    case 'partly-cloudy': return '#94a3b8';
    case 'cloudy':        return '#64748b';
    case 'drizzle':       return '#60a5fa';
    case 'rainy':         return '#3b82f6';
    case 'thunderstorm':  return '#a855f7';
    case 'snowy':         return '#bae6fd';
    case 'foggy':         return '#94a3b8';
    case 'windy':         return '#38bdf8';
    case 'hazy':          return '#d97706';
    default:              return '#38bdf8';
  }
}

export const toFahrenheit = (c: number) => Math.round(c * 9 / 5 + 32);
export const toCelsius    = (f: number) => Math.round((f - 32) * 5 / 9);

export function uvLabel(index: number): string {
  if (index <= 2)  return 'Low';
  if (index <= 5)  return 'Moderate';
  if (index <= 7)  return 'High';
  if (index <= 10) return 'Very High';
  return 'Extreme';
}

export function windLabel(kmh: number): string {
  if (kmh < 6)  return 'Calm';
  if (kmh < 20) return 'Light Breeze';
  if (kmh < 40) return 'Moderate';
  if (kmh < 60) return 'Fresh Wind';
  if (kmh < 90) return 'Strong Wind';
  return 'Storm';
}