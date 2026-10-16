import { describe, expect, it } from 'vitest';

import { contentSecurityPolicy, securityHeaders } from '../next.config';

describe('security headers', () => {
  it('lets in only the app, the lecture player and its thumbnails, and forbids framing', () => {
    const policy = contentSecurityPolicy(false);
    expect(policy).toContain("default-src 'self'");
    expect(policy).toContain('frame-src https://www.youtube-nocookie.com');
    expect(policy).toContain("img-src 'self' data: blob: https://i.ytimg.com");
    expect(policy).toContain("frame-ancestors 'none'");
    expect(policy).toContain("object-src 'none'");
    expect(policy).not.toContain("'unsafe-eval'");
  });

  it('allows eval and the reload socket only in development', () => {
    expect(contentSecurityPolicy(true)).toContain("'unsafe-eval'");
    expect(contentSecurityPolicy(true)).toContain("connect-src 'self' ws:");
    expect(contentSecurityPolicy(true)).not.toContain('upgrade-insecure-requests');
  });

  it('sends HTTPS-only in production', () => {
    const keys = (dev: boolean) => securityHeaders(dev).map(({ key }) => key);
    expect(keys(false)).toContain('Strict-Transport-Security');
    expect(keys(true)).not.toContain('Strict-Transport-Security');
    expect(keys(false)).toEqual(
      expect.arrayContaining(['X-Content-Type-Options', 'Referrer-Policy', 'Permissions-Policy']),
    );
  });
});
