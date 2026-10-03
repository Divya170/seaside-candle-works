import { BadRequestException } from '@nestjs/common';

export type FieldErrors = Record<string, string>;

/** Thrown when one or more fields fail validation; the frontend maps `errors` onto its form. */
export class ValidationFailedException extends BadRequestException {
  constructor(errors: FieldErrors, message = 'Some fields need attention.') {
    super({ statusCode: 400, message, errors });
  }
}

export const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
export const ISO_DATE_RE = /^\d{4}-\d{2}-\d{2}$/;

/** Coerce any incoming value to a trimmed string (never undefined). */
export function str(value: unknown, max = 2000): string {
  if (value === null || value === undefined) return '';
  return String(value).trim().slice(0, max);
}

export function isValidEmail(value: string): boolean {
  return EMAIL_RE.test(value.trim());
}

export function isValidIsoDate(value: string): boolean {
  if (!ISO_DATE_RE.test(value)) return false;
  const d = new Date(value + 'T00:00:00Z');
  return !Number.isNaN(d.getTime()) && d.toISOString().slice(0, 10) === value;
}

/** Today's date in the studio's local time (server time) as YYYY-MM-DD. */
export function todayIso(): string {
  const now = new Date();
  const offset = now.getTimezoneOffset() * 60000;
  return new Date(now.getTime() - offset).toISOString().slice(0, 10);
}

export function throwIfErrors(errors: FieldErrors) {
  if (Object.keys(errors).length) throw new ValidationFailedException(errors);
}
