// ─── OpenWeatherMap — Current Weather ────────────────────────────────────────
export interface OWMWeather {
  id: number; main: string; description: string; icon: string;
}

export interface OWMCurrentWeather {
  coord:   { lon: number; lat: number };
  weather: OWMWeather[];
  base:    string;
  main: {
    temp: number; feels_like: number; temp_min: number; temp_max: number;
    pressure: number; humidity: number; sea_level?: number; grnd_level?: number;
  };
  visibility: number;
  wind:       { speed: number; deg: number; gust?: number };
  clouds:     { all: number };
  rain?:      { '1h'?: number; '3h'?: number };
  snow?:      { '1h'?: number; '3h'?: number };
  dt:         number;
  sys:        { country: string; sunrise: number; sunset: number };
  timezone:   number;
  id:         number;
  name:       string;
  cod:        number;
}

// ─── OpenWeatherMap — 5-day / 3-hour Forecast ────────────────────────────────
export interface OWMForecastItem {
  dt:         number;
  main:       { temp: number; feels_like: number; temp_min: number; temp_max: number; pressure: number; humidity: number };
  weather:    OWMWeather[];
  clouds:     { all: number };
  wind:       { speed: number; deg: number; gust?: number };
  visibility: number;
  pop:        number;
  rain?:      { '3h': number };
  snow?:      { '3h': number };
  sys:        { pod: 'd' | 'n' };
  dt_txt:     string;
}

export interface OWMForecast {
  cod:  string;
  cnt:  number;
  list: OWMForecastItem[];
  city: {
    id: number; name: string; coord: { lat: number; lon: number };
    country: string; population: number; timezone: number;
    sunrise: number; sunset: number;
  };
}

// ─── OpenWeatherMap — Geocoding ───────────────────────────────────────────────
export interface OWMGeoResult {
  name:        string;
  local_names?: Record<string, string>;
  lat:         number;
  lon:         number;
  country:     string;
  state?:      string;
}

// ─── Google Places Autocomplete ───────────────────────────────────────────────
export interface GooglePlacesPrediction {
  description: string;
  place_id:    string;
  structured_formatting: { main_text: string; secondary_text: string };
  terms: Array<{ offset: number; value: string }>;
  types: string[];
}

export interface GooglePlacesResponse {
  predictions:   GooglePlacesPrediction[];
  status:        string;
  error_message?: string;
}

// ─── Unified API response envelope ───────────────────────────────────────────
export interface ApiSuccess<T> { success: true; data: T; cached?: boolean; }
export interface ApiError      { success: false; error: string; code: number; }
export type ApiResponse<T> = ApiSuccess<T> | ApiError;

// ─── City suggestion item ─────────────────────────────────────────────────────
export interface CitySuggestion {
  name: string; fullName: string; country: string;
  state?: string; lat: number; lon: number; placeId?: string;
}