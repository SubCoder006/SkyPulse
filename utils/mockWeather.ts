import type {
  WeatherData,
  WeatherCondition,
  HourlyItem,
  DailyItem,
} from "@/types/weather";
import { getConditionLabel } from "@/utils/weatherHelpers";

function hash(str: string): number {
  let h = 5381;
  for (let i = 0; i < str.length; i++) h = (h * 33) ^ str.charCodeAt(i);
  return Math.abs(h) % 100;
}

const regionBaseTemp: Record<string, [number, number]> = {
  asia: [0, 40],
  europe: [-5, 30],
  americas: [-10, 40],
  africa: [10, 45],
  oceania: [5, 35],
  "middle-east": [15, 50],
  others: [-20, 25],
};

const conditions: WeatherCondition[] = [
  "sunny",
  "partly-cloudy",
  "cloudy",
  "drizzle",
  "rainy",
  "thunderstorm",
  "snowy",
  "foggy",
  "windy",
  "hazy",
];

const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

function pad(n: number) {
  return String(n).padStart(2, "0");
}

function clockStr(h: number, m: number) {
  const ampm = h >= 12 ? "PM" : "AM";
  const hh = h % 12 === 0 ? 12 : h % 12;
  return `${hh}:${pad(m)} ${ampm}`;
}

function calcIsNight(hour: number, sunriseHour = 6, sunsetHour = 19): boolean {
  return hour < sunriseHour || hour >= sunsetHour;
}

export function getMockWeather(
  city: string,
  state: string,
  country: string,
  region: string,
): WeatherData {
  const seed = hash(`${city}${state}${country}`);
  const [lo, hi] = regionBaseTemp[region] ?? [15, 30];
  const spread = hi - lo;

  const temp = Math.round(lo + (seed / 100) * spread);
  const feelsLike = temp + (seed % 5) - 2;
  const minTemp = temp - 3 - (seed % 4);
  const maxTemp = temp + 3 + (seed % 5);
  const condition = conditions[seed % conditions.length];

  const humidity = 40 + (seed % 50);
  const windSpeed = 5 + (seed % 40);
  const visibility = 5 + (seed % 15);
  const pressure = 1000 + (seed % 30);
  const uvIndex = 1 + (seed % 10);
  const dewPoint = Math.round(feelsLike - 5 - (seed % 8));
  const precipitation =
    condition === "rainy" || condition === "thunderstorm"
      ? parseFloat((seed * 0.2).toFixed(1))
      : condition === "drizzle"
        ? parseFloat((seed * 0.05).toFixed(1))
        : 0;

  const windDirs = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"];
  const now = new Date();
  const currentHour = now.getHours();
  const sunriseH = 5 + (seed % 2);
  const sunsetH = 18 + (seed % 2);
  const isNight = calcIsNight(currentHour, sunriseH, sunsetH);

  const hourly: HourlyItem[] = Array.from({ length: 12 }, (_, i) => {
    const h = (currentHour + i) % 24;
    const hSeed = hash(`${city}${i}`);
    return {
      time: clockStr(h, 0),
      temp: temp + Math.round((hSeed % 7) - 3),
      condition: conditions[(seed + Math.floor(i / 3)) % conditions.length],
      isNight: calcIsNight(h, sunriseH, sunsetH),
    };
  });

  const daily: DailyItem[] = Array.from({ length: 7 }, (_, i) => {
    const d = new Date(now);
    d.setDate(d.getDate() + i);
    const ds = hash(`${city}${i}daily`);
    const dc = conditions[(seed + i) % conditions.length];
    return {
      day: i === 0 ? "Today" : days[d.getDay()],
      date: `${months[d.getMonth()]} ${d.getDate()}`,
      minTemp: minTemp + Math.round((ds % 5) - 2),
      maxTemp: maxTemp + Math.round((ds % 5) - 2),
      condition: dc,
      label: getConditionLabel(dc),
    };
  });

  return {
    city,
    state,
    country,
    region,
    temperature: temp,
    feelsLike,
    minTemp,
    maxTemp,
    unit: "°C",
    condition,
    conditionLabel: getConditionLabel(condition),
    isNight,
    humidity,
    windSpeed,
    windDirection: windDirs[seed % windDirs.length],
    visibility,
    pressure,
    uvIndex,
    dewPoint,
    precipitation,
    sunrise: clockStr(sunriseH, (seed * 7) % 60),
    sunset: clockStr(sunsetH, (seed * 3) % 60),
    hourly,
    daily,
    lastUpdated: now.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    }),
  };
}
