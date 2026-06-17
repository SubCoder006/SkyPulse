interface Window { count: number; resetAt: number; }

export interface RateLimitResult {
  allowed: boolean; remaining: number; resetAt: number; retryAfterMs: number;
}

class RateLimiter {
  private store = new Map<string, Window>();
  constructor(private readonly max: number, private readonly windowMs: number) {}

  check(ip: string): RateLimitResult {
    const now   = Date.now();
    const entry = this.store.get(ip);

    if (!entry || now > entry.resetAt) {
      const resetAt = now + this.windowMs;
      this.store.set(ip, { count: 1, resetAt });
      return { allowed: true, remaining: this.max - 1, resetAt, retryAfterMs: 0 };
    }

    if (entry.count >= this.max)
      return { allowed: false, remaining: 0, resetAt: entry.resetAt, retryAfterMs: entry.resetAt - now };

    entry.count++;
    return { allowed: true, remaining: this.max - entry.count, resetAt: entry.resetAt, retryAfterMs: 0 };
  }
}

const MAX    = Number(process.env.RATE_LIMIT_MAX)       || 100;
const WINDOW = Number(process.env.RATE_LIMIT_WINDOW_MS) || 15 * 60 * 1000;

declare global {
  // eslint-disable-next-line no-var
  var __apiLimiter: RateLimiter | undefined;
  // eslint-disable-next-line no-var
  var __searchLimiter: RateLimiter | undefined;
}

export const apiLimiter:    RateLimiter = globalThis.__apiLimiter    ??= new RateLimiter(MAX, WINDOW);
export const searchLimiter: RateLimiter = globalThis.__searchLimiter ??= new RateLimiter(30, 60_000);

globalThis.__apiLimiter    = apiLimiter;
globalThis.__searchLimiter = searchLimiter;

export function getIp(req: Request): string {
  const h = req.headers;
  return h.get('x-forwarded-for')?.split(',')[0].trim() ?? h.get('x-real-ip') ?? '127.0.0.1';
}