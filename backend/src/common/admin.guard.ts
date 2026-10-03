import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { timingSafeEqual } from 'crypto';

/**
 * Protects /api/admin/* routes. When ADMIN_TOKEN is set the request must carry a
 * matching `x-admin-token` header; when it is empty the admin is open (local dev).
 */
@Injectable()
export class AdminGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const expected = process.env.ADMIN_TOKEN || '';
    if (!expected) return true;
    const req = context.switchToHttp().getRequest();
    const given = String(req.headers['x-admin-token'] || '');
    if (AdminGuard.matches(given, expected)) return true;
    throw new UnauthorizedException({ statusCode: 401, message: 'Enter the staff passcode to open the admin.' });
  }

  static matches(given: string, expected: string): boolean {
    const a = Buffer.from(given);
    const b = Buffer.from(expected);
    return a.length === b.length && timingSafeEqual(a, b);
  }
}
