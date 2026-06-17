import { NextRequest, NextResponse } from 'next/server';

export function proxy(req: NextRequest) {
  if (req.method === 'OPTIONS') {
    return new NextResponse(null, {
      status: 204,
      headers: {
        'Access-Control-Allow-Origin':  '*',
        'Access-Control-Allow-Methods': 'GET, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        'Access-Control-Max-Age':       '86400',
      },
    });
  }

  const res = NextResponse.next();
  res.headers.set('Access-Control-Allow-Origin',  '*');
  res.headers.set('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.headers.set('X-Content-Type-Options',        'nosniff');
  res.headers.set('X-Frame-Options',               'DENY');
  res.headers.set('Referrer-Policy',               'strict-origin-when-cross-origin');
  return res;
}

export const config = { matcher: ['/api/:path*'] };