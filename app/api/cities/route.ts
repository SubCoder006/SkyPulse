import { NextRequest } from 'next/server';
import { getCitySuggestions }   from '@/lib/placesApi';
import { citiesCache }          from '@/lib/cache';
import { searchLimiter, getIp } from '@/lib/rateLimiter';
import { validateQuery, sanitize } from '@/lib/validators';
import { ok, err, rateLimited, corsHeaders } from '@/lib/errors';

export const runtime = 'nodejs';

export function OPTIONS() {
  return new Response(null, { status: 204, headers: corsHeaders });
}

export async function GET(req: NextRequest) {
  const rl = searchLimiter.check(getIp(req));
  if (!rl.allowed) return rateLimited(rl.retryAfterMs);

  const { searchParams } = req.nextUrl;
  const q       = sanitize(searchParams.get('q')       ?? '');
  const state   = sanitize(searchParams.get('state')   ?? '');
  const country = sanitize(searchParams.get('country') ?? '');

  const qv = validateQuery(q);
  if (!qv.valid) return err(qv.error!, 400);

  const key    = `cities:${q.toLowerCase()}:${state.toLowerCase()}:${country.toLowerCase()}`;
  const cached = citiesCache.get(key);
  if (cached) return ok(cached, true);

  try {
    const suggestions = await getCitySuggestions(q, state, country);
    citiesCache.set(key, suggestions);
    return ok(suggestions);
  } catch {
    return err('Could not fetch city suggestions.', 502);
  }
}