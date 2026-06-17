import type { CitySuggestion } from '@/types/api';
import { getCitySuggestions as localSuggestions } from '@/data/cities';

// ─── Which provider to use ────────────────────────────────────────────────────
// Priority: GeoNames → Photon → Nominatim → Local fallback
// Set GEONAMES_USERNAME in .env.local for best results (free signup)
// Photon and Nominatim need NO key at all

// ─── 1. GeoNames ─────────────────────────────────────────────────────────────

async function fetchGeoNames(
  query: string,
  country: string,
): Promise<CitySuggestion[] | null> {
  const username = process.env.GEONAMES_USERNAME;
  if (!username) return null;

  // ISO country code map (same as weather route)
  const cc = COUNTRY_CODES[country.toLowerCase()] ?? '';

  const params = new URLSearchParams({
    name_startsWith: query,
    featureClass:    'P',          // populated places only
    maxRows:         '8',
    orderby:         'population', // biggest cities first
    username,
    ...(cc && { country: cc }),
  });

  try {
    const res  = await fetch(
      `http://api.geonames.org/searchJSON?${params}`,
      { next: { revalidate: 3600 } },
    );
    if (!res.ok) return null;
    const json = await res.json() as {
      geonames?: Array<{
        name: string; adminName1?: string;
        countryName: string; lat: string; lng: string;
      }>;
    };

    return (json.geonames ?? []).map((g) => ({
      name:     g.name,
      fullName: [g.name, g.adminName1, g.countryName].filter(Boolean).join(', '),
      country:  g.countryName,
      state:    g.adminName1,
      lat:      parseFloat(g.lat),
      lon:      parseFloat(g.lng),
    }));
  } catch {
    return null;
  }
}

// ─── 2. Photon (Komoot) — no key needed ──────────────────────────────────────

async function fetchPhoton(
  query: string,
  country: string,
): Promise<CitySuggestion[] | null> {
  const cc = COUNTRY_CODES[country.toLowerCase()] ?? '';

  const params = new URLSearchParams({
    q:    query,
    limit:'8',
    layer:'city',
    ...(cc && { 'countrycode': cc.toLowerCase() }),
  });

  try {
    const res = await fetch(
      `https://photon.komoot.io/api/?${params}`,
      { next: { revalidate: 3600 } },
    );
    if (!res.ok) return null;

    const json = await res.json() as {
      features?: Array<{
        properties: {
          name?: string; state?: string;
          country?: string; type?: string;
        };
        geometry: { coordinates: [number, number] };
      }>;
    };

    return (json.features ?? [])
      .filter((f) => f.properties.name)
      .map((f) => {
        const p = f.properties;
        return {
          name:     p.name!,
          fullName: [p.name, p.state, p.country].filter(Boolean).join(', '),
          country:  p.country  ?? country,
          state:    p.state,
          lat:      f.geometry.coordinates[1],
          lon:      f.geometry.coordinates[0],
        };
      });
  } catch {
    return null;
  }
}

// ─── 3. Nominatim (OpenStreetMap) — no key needed ────────────────────────────

async function fetchNominatim(
  query: string,
  country: string,
): Promise<CitySuggestion[] | null> {
  const params = new URLSearchParams({
    q:              `${query}, ${country}`,
    format:         'json',
    addressdetails: '1',
    limit:          '8',
    featuretype:    'city',
    // Required by Nominatim usage policy
    'accept-language': 'en',
  });

  try {
    const res = await fetch(
      `https://nominatim.openstreetmap.org/search?${params}`,
      {
        headers: { 'User-Agent': 'SkyPulse-Weather-App/1.0' },
        next:    { revalidate: 3600 },
      },
    );
    if (!res.ok) return null;

    const json = await res.json() as Array<{
      display_name: string;
      lat: string; lon: string;
      address: {
        city?: string; town?: string; village?: string;
        state?: string; country?: string;
      };
    }>;

    return json.map((r) => {
      const city = r.address.city ?? r.address.town ?? r.address.village ?? query;
      return {
        name:     city,
        fullName: r.display_name,
        country:  r.address.country  ?? country,
        state:    r.address.state,
        lat:      parseFloat(r.lat),
        lon:      parseFloat(r.lon),
      };
    });
  } catch {
    return null;
  }
}

// ─── 4. Local bundled list (always works, no internet) ───────────────────────

function fetchLocal(
  query: string,
  state: string,
  country: string,
): CitySuggestion[] {
  return localSuggestions(query, state).map((name) => ({
    name,
    fullName: [name, state, country].filter(Boolean).join(', '),
    country,
    state:   state || undefined,
    lat:     0,
    lon:     0,
  }));
}

// ─── Main export — tries providers in order ───────────────────────────────────

export async function getCitySuggestions(
  query:   string,
  state:   string,
  country: string,
): Promise<CitySuggestion[]> {
  // 1. GeoNames (best quality, needs free username in .env.local)
  const geonames = await fetchGeoNames(query, country);
  if (geonames && geonames.length > 0) return geonames;

  // 2. Photon — no key, great quality
  const photon = await fetchPhoton(query, country);
  if (photon && photon.length > 0) return photon;

  // 3. Nominatim — no key, good fallback
  const nominatim = await fetchNominatim(query, country);
  if (nominatim && nominatim.length > 0) return nominatim;

  // 4. Local bundled city list — always available offline
  return fetchLocal(query, state, country);
}

// ─── Country code lookup ──────────────────────────────────────────────────────
const COUNTRY_CODES: Record<string, string> = {
  'india': 'IN', 'china': 'CN', 'japan': 'JP', 'south korea': 'KR',
  'bangladesh': 'BD', 'pakistan': 'PK', 'sri lanka': 'LK', 'nepal': 'NP',
  'myanmar': 'MM', 'thailand': 'TH', 'vietnam': 'VN', 'malaysia': 'MY',
  'singapore': 'SG', 'indonesia': 'ID', 'philippines': 'PH',
  'united kingdom': 'GB', 'france': 'FR', 'germany': 'DE', 'italy': 'IT',
  'spain': 'ES', 'portugal': 'PT', 'netherlands': 'NL', 'sweden': 'SE',
  'norway': 'NO', 'denmark': 'DK', 'finland': 'FI', 'poland': 'PL',
  'russia': 'RU', 'ukraine': 'UA', 'greece': 'GR', 'turkey': 'TR',
  'united states': 'US', 'canada': 'CA', 'mexico': 'MX', 'brazil': 'BR',
  'argentina': 'AR', 'chile': 'CL', 'colombia': 'CO', 'peru': 'PE',
  'australia': 'AU', 'new zealand': 'NZ', 'south africa': 'ZA',
  'nigeria': 'NG', 'egypt': 'EG', 'kenya': 'KE', 'ethiopia': 'ET',
  'saudi arabia': 'SA', 'iran': 'IR', 'iraq': 'IQ',
  'united arab emirates': 'AE', 'israel': 'IL', 'jordan': 'JO',
  'qatar': 'QA', 'kuwait': 'KW', 'bahrain': 'BH',
};