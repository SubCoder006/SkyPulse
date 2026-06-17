export interface ValidationResult { valid: boolean; error?: string; }

export function validateName(value: string | null, field: string, max = 100): ValidationResult {
  if (!value || value.trim().length === 0) return { valid: false, error: `"${field}" is required.` };
  if (value.length > max) return { valid: false, error: `"${field}" must be ${max} characters or fewer.` };
  if (!/^[\p{L}\p{N} \-'.,()]+$/u.test(value)) return { valid: false, error: `"${field}" contains invalid characters.` };
  return { valid: true };
}

export function validateLat(value: string | null): ValidationResult {
  const n = Number(value);
  if (value === null || isNaN(n) || n < -90 || n > 90)
    return { valid: false, error: '"lat" must be between -90 and 90.' };
  return { valid: true };
}

export function validateLon(value: string | null): ValidationResult {
  const n = Number(value);
  if (value === null || isNaN(n) || n < -180 || n > 180)
    return { valid: false, error: '"lon" must be between -180 and 180.' };
  return { valid: true };
}

export function validateQuery(value: string | null): ValidationResult {
  if (!value || value.trim().length < 2) return { valid: false, error: '"q" must be at least 2 characters.' };
  if (value.length > 100) return { valid: false, error: '"q" must be 100 characters or fewer.' };
  return { valid: true };
}

export function sanitize(value: string): string {
  return value.replace(/[<>"'`\\]/g, '').trim();
}