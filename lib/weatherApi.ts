import type { OWMCurrentWeather, OWMForecast, OWMGeoResult } from '@/types/api';

const BASE     = 'https://api.openweathermap.org';
const GEO_BASE = 'http://api.openweathermap.org/geo/1.0';

function getKey(): string {
  const key = process.env.OPENWEATHER_API_KEY;
  if (!key) throw new Error('OPENWEATHER_API_KEY is not set in environment variables.');
  return key;
}

async function owmFetch<T>(url: string): Promise<T> {
  const controller = new AbortController();
  const timeout    = setTimeout(() => controller.abort(), 8000);
  let res: Response;
  try {
    res = await fetch(url, { signal: controller.signal, next: { revalidate: 0 } });
  } catch (err) {
    clearTimeout(timeout);
    if ((err as Error).name === 'AbortError') throw new Error('Request timed out.');
    throw err;
  } finally {
    clearTimeout(timeout);
  }
  const json = await res.json();
  if (!res.ok) {
    const msg = (json as { message?: string }).message ?? res.statusText;
    throw new Error(`OpenWeatherMap: ${msg} (HTTP ${res.status})`);
  }
  return json as T;
}

export async function fetchCurrentWeather(city: string, country?: string): Promise<OWMCurrentWeather> {
  const q = country ? `${city},${country}` : city;
  return owmFetch<OWMCurrentWeather>(`${BASE}/data/2.5/weather?q=${encodeURIComponent(q)}&units=metric&appid=${getKey()}`);
}

export async function fetchCurrentWeatherByCoords(lat: number, lon: number): Promise<OWMCurrentWeather> {
  return owmFetch<OWMCurrentWeather>(`${BASE}/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${getKey()}`);
}

export async function fetchForecast(city: string, country?: string): Promise<OWMForecast> {
  const q = country ? `${city},${country}` : city;
  return owmFetch<OWMForecast>(`${BASE}/data/2.5/forecast?q=${encodeURIComponent(q)}&units=metric&cnt=40&appid=${getKey()}`);
}

export async function fetchForecastByCoords(lat: number, lon: number): Promise<OWMForecast> {
  return owmFetch<OWMForecast>(`${BASE}/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&cnt=40&appid=${getKey()}`);
}

export async function geocodeCity(city: string, country?: string, limit = 5): Promise<OWMGeoResult[]> {
  const q = country ? `${city},${country}` : city;
  return owmFetch<OWMGeoResult[]>(`${GEO_BASE}/direct?q=${encodeURIComponent(q)}&limit=${limit}&appid=${getKey()}`);
}

export async function reverseGeocode(lat: number, lon: number, limit = 1): Promise<OWMGeoResult[]> {
  return owmFetch<OWMGeoResult[]>(`${GEO_BASE}/reverse?lat=${lat}&lon=${lon}&limit=${limit}&appid=${getKey()}`);
}