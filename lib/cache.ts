interface CacheEntry<T> { value: T; expiresAt: number; }

class TTLCache<T = unknown> {
  private store   = new Map<string, CacheEntry<T>>();
  private pruneAt = Date.now() + 5 * 60 * 1000;

  constructor(private readonly ttlMs: number) {}

  get(key: string): T | null {
    this.maybePrune();
    const entry = this.store.get(key);
    if (!entry) return null;
    if (Date.now() > entry.expiresAt) { this.store.delete(key); return null; }
    return entry.value;
  }

  set(key: string, value: T, ttlOverride?: number): void {
    this.store.set(key, { value, expiresAt: Date.now() + (ttlOverride ?? this.ttlMs) });
  }

  delete(key: string): void { this.store.delete(key); }
  has(key: string):    boolean { return this.get(key) !== null; }

  private maybePrune(): void {
    if (Date.now() < this.pruneAt) return;
    const now = Date.now();
    for (const [k, v] of this.store) if (now > v.expiresAt) this.store.delete(k);
    this.pruneAt = now + 5 * 60 * 1000;
  }
}

const WEATHER_TTL  = Number(process.env.CACHE_WEATHER_TTL)  || 10 * 60 * 1000;
const FORECAST_TTL = Number(process.env.CACHE_FORECAST_TTL) || 30 * 60 * 1000;
const CITIES_TTL   = Number(process.env.CACHE_CITIES_TTL)   || 60 * 60 * 1000;

declare global {
  // eslint-disable-next-line no-var
  var __weatherCache: TTLCache | undefined;
  // eslint-disable-next-line no-var
  var __forecastCache: TTLCache | undefined;
  // eslint-disable-next-line no-var
  var __citiesCache: TTLCache | undefined;
}

export const weatherCache:  TTLCache = globalThis.__weatherCache  ??= new TTLCache(WEATHER_TTL);
export const forecastCache: TTLCache = globalThis.__forecastCache ??= new TTLCache(FORECAST_TTL);
export const citiesCache:   TTLCache = globalThis.__citiesCache   ??= new TTLCache(CITIES_TTL);

globalThis.__weatherCache  = weatherCache;
globalThis.__forecastCache = forecastCache;
globalThis.__citiesCache   = citiesCache;