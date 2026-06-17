import { NextRequest } from 'next/server';
import { fetchCurrentWeather, fetchForecast } from '@/lib/weatherApi';
import { mapCurrentWeather }                  from '@/lib/mappers';
import { weatherCache }                       from '@/lib/cache';
import { apiLimiter, getIp }                  from '@/lib/rateLimiter';
import { validateName, sanitize }             from '@/lib/validators';
import { ok, err, rateLimited, handleFetchError, corsHeaders } from '@/lib/errors';

export const runtime = 'nodejs';

export function OPTIONS() {
  return new Response(null, { status: 204, headers: corsHeaders });
}

export async function GET(req: NextRequest) {
  const rl = apiLimiter.check(getIp(req));
  if (!rl.allowed) return rateLimited(rl.retryAfterMs);

  const { searchParams } = req.nextUrl;
  const city    = sanitize(searchParams.get('city')    ?? '');
  const country = sanitize(searchParams.get('country') ?? '');
  const state   = sanitize(searchParams.get('state')   ?? '');
  const region  = sanitize(searchParams.get('region')  ?? '');

  const cityV = validateName(city, 'city');
  if (!cityV.valid) return err(cityV.error!, 400);

  const countryCode = COUNTRY_CODES[country.toLowerCase()] ?? country;
  const cacheKey    = `weather:${city.toLowerCase()}:${countryCode.toLowerCase()}`;
  const cached      = weatherCache.get(cacheKey);
  if (cached) return ok(cached, true);

  try {
    const [currentRaw, forecastRaw] = await Promise.all([
      fetchCurrentWeather(city, countryCode || undefined),
      fetchForecast(city, countryCode || undefined).catch(() => undefined),
    ]);
    const data = mapCurrentWeather(currentRaw, state, region, forecastRaw);
    weatherCache.set(cacheKey, data);
    return ok(data);
  } catch (error) {
    const message = handleFetchError(error);
    if (message.toLowerCase().includes('not found') || message.includes('404'))
      return err(`City "${city}" not found. Please check the spelling.`, 404);
    if (!process.env.OPENWEATHER_API_KEY)
      return err('OPENWEATHER_API_KEY is not configured in .env.local.', 503);
    return err(message, 502);
  }
}

const COUNTRY_CODES: Record<string, string> = {
  'india':'IN','china':'CN','japan':'JP','south korea':'KR','bangladesh':'BD',
  'pakistan':'PK','sri lanka':'LK','nepal':'NP','myanmar':'MM','thailand':'TH',
  'vietnam':'VN','malaysia':'MY','singapore':'SG','indonesia':'ID','philippines':'PH',
  'united kingdom':'GB','france':'FR','germany':'DE','italy':'IT','spain':'ES',
  'netherlands':'NL','sweden':'SE','norway':'NO','denmark':'DK','finland':'FI',
  'poland':'PL','russia':'RU','ukraine':'UA','greece':'GR','turkey':'TR',
  'united states':'US','canada':'CA','mexico':'MX','brazil':'BR','argentina':'AR',
  'chile':'CL','colombia':'CO','peru':'PE','australia':'AU','new zealand':'NZ',
  'south africa':'ZA','nigeria':'NG','egypt':'EG','kenya':'KE',
  'saudi arabia':'SA','iran':'IR','iraq':'IQ','united arab emirates':'AE',
  'israel':'IL','jordan':'JO','qatar':'QA','kuwait':'KW','bahrain':'BH',
};