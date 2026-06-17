import { NextRequest } from 'next/server';
import { fetchForecast }     from '@/lib/weatherApi';
import { buildForecastOnly } from '@/lib/mappers';
import { forecastCache }     from '@/lib/cache';
import { apiLimiter, getIp } from '@/lib/rateLimiter';
import { validateName, sanitize } from '@/lib/validators';
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

  const v = validateName(city, 'city');
  if (!v.valid) return err(v.error!, 400);

  const key    = `forecast:${city.toLowerCase()}:${country.toLowerCase()}`;
  const cached = forecastCache.get(key);
  if (cached) return ok(cached, true);

  try {
    const raw  = await fetchForecast(city, country || undefined);
    const data = buildForecastOnly(raw);
    forecastCache.set(key, data);
    return ok(data);
  } catch (error) {
    return err(handleFetchError(error), 502);
  }
}