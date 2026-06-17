import { NextRequest } from 'next/server';
import { reverseGeocode }     from '@/lib/weatherApi';
import { apiLimiter, getIp }  from '@/lib/rateLimiter';
import { validateLat, validateLon } from '@/lib/validators';
import { ok, err, rateLimited, handleFetchError, corsHeaders } from '@/lib/errors';

export const runtime = 'nodejs';

export function OPTIONS() {
  return new Response(null, { status: 204, headers: corsHeaders });
}

export async function GET(req: NextRequest) {
  const rl = apiLimiter.check(getIp(req));
  if (!rl.allowed) return rateLimited(rl.retryAfterMs);

  const { searchParams } = req.nextUrl;
  const latStr = searchParams.get('lat');
  const lonStr = searchParams.get('lon');

  const latV = validateLat(latStr); if (!latV.valid) return err(latV.error!, 400);
  const lonV = validateLon(lonStr); if (!lonV.valid) return err(lonV.error!, 400);

  try {
    const results = await reverseGeocode(Number(latStr), Number(lonStr), 1);
    if (!results.length) return err('No location found for these coordinates.', 404);
    const r = results[0];
    return ok({ name: r.name, state: r.state ?? '', country: r.country, lat: r.lat, lon: r.lon });
  } catch (error) {
    return err(handleFetchError(error), 502);
  }
}