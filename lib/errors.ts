import { NextResponse } from 'next/server';
import type { ApiSuccess, ApiError } from '@/types/api';

export function ok<T>(data: T, cached = false, status = 200): NextResponse {
  const body: ApiSuccess<T> = { success: true, data, cached };
  return NextResponse.json(body, { status });
}

export function err(message: string, status = 400): NextResponse {
  const body: ApiError = { success: false, error: message, code: status };
  return NextResponse.json(body, { status });
}

export function rateLimited(retryAfterMs: number): NextResponse {
  const body: ApiError = { success: false, error: 'Too many requests. Please try again later.', code: 429 };
  return NextResponse.json(body, {
    status: 429,
    headers: { 'Retry-After': String(Math.ceil(retryAfterMs / 1000)) },
  });
}

export function handleFetchError(error: unknown): string {
  if (error instanceof Error) {
    if (error.message.includes('fetch')) return 'Could not reach the weather service.';
    return error.message;
  }
  return 'An unexpected error occurred.';
}

export const corsHeaders = {
  'Access-Control-Allow-Origin':  '*',
  'Access-Control-Allow-Methods': 'GET, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};