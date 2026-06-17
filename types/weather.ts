// ─── Weather Condition ────────────────────────────────────
export type WeatherCondition =
  | 'sunny'
  | 'partly-cloudy'
  | 'cloudy'
  | 'rainy'
  | 'drizzle'
  | 'thunderstorm'
  | 'snowy'
  | 'foggy'
  | 'windy'
  | 'hazy';

// ─── Individual forecast items ────────────────────────────
export interface HourlyItem {
  time:      string;
  temp:      number;
  condition: WeatherCondition;
  isNight:   boolean;
}

export interface DailyItem {
  day:       string;
  date:      string;
  minTemp:   number;
  maxTemp:   number;
  condition: WeatherCondition;
  label:     string;
}

// ─── Main weather payload ─────────────────────────────────
export interface WeatherData {
  city:    string;
  state:   string;
  country: string;
  region:  string;

  temperature: number;
  feelsLike:   number;
  minTemp:     number;
  maxTemp:     number;
  unit:        '°C' | '°F';

  condition:      WeatherCondition;
  conditionLabel: string;
  isNight:        boolean;   // ← true when current time is between sunset & sunrise

  humidity:      number;
  windSpeed:     number;
  windDirection: string;
  visibility:    number;
  pressure:      number;
  uvIndex:       number;
  dewPoint:      number;
  precipitation: number;

  sunrise:     string;
  sunset:      string;

  hourly:      HourlyItem[];
  daily:       DailyItem[];
  lastUpdated: string;
}

// ─── Search state ─────────────────────────────────────────
export interface SearchState {
  region:  string;
  country: string;
  state:   string;
  city:    string;
}